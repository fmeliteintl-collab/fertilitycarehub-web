"use server";

import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { AdvisoryStage } from "@/types/advisory";

export async function getAdvisoryStage(): Promise<AdvisoryStage> {
  const supabase = await getSupabaseServerClient();
  
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) return null;
  
  const { data, error } = await supabase
    .from("user_plans")
    .select("advisory_stage")
    .eq("user_id", userData.user.id)
    .single();

  if (error || !data) return null;
  
  const stage = data.advisory_stage;
  if (stage === "intake" || stage === "strategy" || stage === "decision" || stage === "execution") {
    return stage;
  }
  return null;
}

export async function updateAdvisoryStage(stage: AdvisoryStage): Promise<void> {
  const supabase = await getSupabaseServerClient();
  
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) throw new Error("Not authenticated");
  
  const { error } = await supabase
    .from("user_plans")
    .update({ advisory_stage: stage })
    .eq("user_id", userData.user.id);

  if (error) throw error;
}