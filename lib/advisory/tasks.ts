"use server";

import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { AdvisoryTask, AdvisoryTaskStatus } from "@/types/advisory";

export async function getUserAdvisoryTasks(): Promise<AdvisoryTask[]> {
  const supabase = await getSupabaseServerClient();
  
  const { data, error } = await supabase
    .from("advisory_tasks")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function createAdvisoryTask(
  task: Omit<AdvisoryTask, "id" | "user_id" | "created_at" | "updated_at" | "completed_at">
): Promise<AdvisoryTask> {
  const supabase = await getSupabaseServerClient();
  
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) throw new Error("Not authenticated");
  
  const { data, error } = await supabase
    .from("advisory_tasks")
    .insert({ ...task, user_id: userData.user.id })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateAdvisoryTaskStatus(
  taskId: string,
  status: AdvisoryTaskStatus
): Promise<void> {
  const supabase = await getSupabaseServerClient();
  
  const updates = { 
    status,
    completed_at: status === "done" ? new Date().toISOString() : null
  };
  
  const { error } = await supabase
    .from("advisory_tasks")
    .update(updates)
    .eq("id", taskId);

  if (error) throw error;
}

export async function deleteAdvisoryTask(taskId: string): Promise<void> {
  const supabase = await getSupabaseServerClient();
  
  const { error } = await supabase
    .from("advisory_tasks")
    .delete()
    .eq("id", taskId);

  if (error) throw error;
}