import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import type { TimelineItem, UserPlan, UserPlanInput } from "@/types/plan";

function normalizeTimelineItems(value: unknown): TimelineItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item): item is Record<string, unknown> => {
      return typeof item === "object" && item !== null;
    })
    .map((item, index): TimelineItem => {
      let status: TimelineItem["status"] = "Upcoming";

      if (
        item.status === "Completed" ||
        item.status === "In Progress" ||
        item.status === "Upcoming" ||
        item.status === "Blocked"
      ) {
        status = item.status;
      }

      const phase = (item.phase as TimelineItem["phase"]) || "planning";
      const priority = (item.priority as TimelineItem["priority"]) || "medium";
      const dependencies = Array.isArray(item.dependencies)
        ? item.dependencies.filter((d): d is string => typeof d === "string")
        : [];
      const isLocked =
        typeof item.isLocked === "boolean" ? item.isLocked : false;
      const lockReason =
        typeof item.lockReason === "string" ? item.lockReason : undefined;
      const estimatedDuration =
        typeof item.estimatedDuration === "string"
          ? item.estimatedDuration
          : undefined;

      return {
        id:
          typeof item.id === "string" && item.id.length > 0
            ? item.id
            : `timeline-${index + 1}`,
        title: typeof item.title === "string" ? item.title : "",
        category:
          typeof item.category === "string" ? item.category : "Planning",
        status,
        description:
          typeof item.description === "string" ? item.description : "",
        phase,
        priority,
        dependencies,
        isLocked,
        lockReason,
        estimatedDuration,
      };
    })
    .filter((item) => item.title.length > 0);
}

function normalizeUserPlan(row: UserPlan): UserPlan {
  return {
    ...row,
    priorities: Array.isArray(row.priorities) ? row.priorities : [],
    constraints: Array.isArray(row.constraints) ? row.constraints : [],
    shortlisted_countries: Array.isArray(row.shortlisted_countries)
      ? row.shortlisted_countries
      : [],
    
    timeline_items: normalizeTimelineItems(row.timeline_items),
    advisory_status:
      typeof row.advisory_status === "string" ? row.advisory_status : null,
    advisory_pathway:
      typeof row.advisory_pathway === "string" ? row.advisory_pathway : null,
    advisory_notes:
      typeof row.advisory_notes === "string" ? row.advisory_notes : null,
    advisory_next_step:
      typeof row.advisory_next_step === "string"
        ? row.advisory_next_step
        : null,
    advisory_stage:
      row.advisory_stage === "intake" ||
      row.advisory_stage === "strategy" ||
      row.advisory_stage === "decision" ||
      row.advisory_stage === "execution"
        ? row.advisory_stage
        : null,
  };
}

function isMissingSessionError(error: unknown): boolean {
  return (
    error instanceof Error &&
    (error.name === "AuthSessionMissingError" ||
      error.message.toLowerCase().includes("auth session missing"))
  );
}

async function getAuthenticatedUser() {
  const supabase = getSupabaseBrowserClient();

  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      if (isMissingSessionError(error)) {
        return { supabase, user: null };
      }

      throw error;
    }

    return { supabase, user: session?.user ?? null };
  } catch (error) {
    if (isMissingSessionError(error)) {
      return { supabase, user: null };
    }

    throw error;
  }
}

export async function getCurrentUserPlan(): Promise<UserPlan | null> {
  const { supabase, user } = await getAuthenticatedUser();

  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from("user_plans")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data ? normalizeUserPlan(data as UserPlan) : null;
}

export async function upsertCurrentUserPlan(
  input: UserPlanInput,
): Promise<UserPlan> {
  const { supabase, user } = await getAuthenticatedUser();

  if (!user) {
    throw new Error("User is not authenticated.");
  }

  const payload = {
    user_id: user.id,
    pathway_type: input.pathway_type,
    family_structure: input.family_structure,
    treatment_goal: input.treatment_goal,
    donor_needed: input.donor_needed,
    surrogate_needed: input.surrogate_needed,
    priorities: input.priorities,
    constraints: input.constraints,
    shortlisted_countries: input.shortlisted_countries,
    
    timeline_items: input.timeline_items,
    advisory_status: input.advisory_status,
    advisory_pathway: input.advisory_pathway,
    advisory_notes: input.advisory_notes,
    advisory_next_step: input.advisory_next_step,
    advisory_stage: input.advisory_stage,
    target_timeline: input.target_timeline,
    budget_range: input.budget_range,
    notes: input.notes,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("user_plans")
    .upsert(payload, { onConflict: "user_id" })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return normalizeUserPlan(data as UserPlan);
}