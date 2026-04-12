import { apiFetch } from "../../../lib/api";
import type { AdminDashboardResponse } from "../types/dashboard";

export function getAdminDashboard() {
  return apiFetch<AdminDashboardResponse>("dashboard/admin");
}