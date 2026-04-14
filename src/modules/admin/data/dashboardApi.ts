import api from "../../../lib/api";
import type { AdminDashboardResponse } from "../types/dashboard";

export async function getAdminDashboard() {
  const response = await api.get<AdminDashboardResponse>("dashboard/admin");
  return response.data;
}
