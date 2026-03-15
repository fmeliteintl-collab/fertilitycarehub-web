import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import type { UserPlan, UserPlanInput } from "@/types/plan";

function normalizeUserPlan(row: UserPlan): UserPlan {
  return {
    ...row,
    priorities: Array.isArray(row.priorities) ? row.priorities : [],
    constraints: Array.isArray(row.constraints) ? row.constraints : [],
    shortlisted_countries: Array.isArray(row.shortlisted_countries)
      ? row.shortlisted_countries
      : [],
  };
}

export async function getCurrentUserPlan(): Promise<UserPlan | null> {
  const supabase = getSupabaseBrowserClient();

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

export async function upsertCurrentUserPlan(
  input: UserPlanInput
): Promise<UserPlan> {
  const supabase = getSupabaseBrowserClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

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