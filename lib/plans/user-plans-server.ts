import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { TimelineItem, UserPlan } from "@/types/plan";

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
        item.status === "Upcoming"
      ) {
        status = item.status;
      }

      return {
        id:
          typeof item.id === "string" && item.id.length > 0
            ? item.id
            : `timeline-${index + 1}`,
        title: typeof item.title === "string" ? item.title : "",
        category: typeof item.category === "string" ? item.category : "Planning",
        status,
        description:
          typeof item.description === "string" ? item.description : "",
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
  };
}

export async function getCurrentUserPlanServer(): Promise<UserPlan | null> {
  const supabase = await getSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

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