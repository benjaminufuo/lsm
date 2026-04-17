import { api } from "../../../lib/api";
import { store } from "../../../global/store";
import type { StudentUser, AdminUser, UserCreatePayload, UserProfile } from "../types/admin";

type AdminUserApi = {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  avatar?: string;
  createdAt?: string;
};

const getUsersFromData = (data: unknown): AdminUserApi[] => {
  if (Array.isArray(data)) return data as AdminUserApi[];
  if (data && typeof data === "object") {
    const record = data as Record<string, unknown>;
    if (Array.isArray(record.users)) return record.users as AdminUserApi[];
  }
  return [];
};

const toStudentUser = (user: AdminUserApi): StudentUser => ({
  id: user._id,
  name: user.fullName,
  role: user.role,
  enrolledCourse: "-",
  progress: 0,
  joined: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-",
  avatar: user.avatar || "",
});

const toAdminUser = (user: AdminUserApi): AdminUser => ({
  id: user._id,
  name: user.fullName,
  role: user.role,
  email: user.email,
  joined: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-",
  avatar: user.avatar || "",
});

const getAuthConfig = () => {
  const token = store.getState().learnFlow.userToken;
  if (!token) return {};
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const userApi = {
  // Get authenticated user profile
  getProfile: async (): Promise<UserProfile> => {
    const response = await api.get<{ success: boolean; data: UserProfile }>("/users/profile", getAuthConfig());
    return response.data.data;
  },

  // Get all student users
  getAllStudents: async (): Promise<StudentUser[]> => {
    const response = await api.get<{ success?: boolean; data?: unknown; users?: unknown[] }>("/admin/users", {
      ...getAuthConfig(),
      params: { role: "student", _t: Date.now() },
    });
    const payload = response.data.data ?? response.data;
    return getUsersFromData(payload).map(toStudentUser);
  },

  // Get all admin users
  getAllAdmins: async (): Promise<AdminUser[]> => {
    const response = await api.get<{ success?: boolean; data?: unknown; users?: unknown[] }>("/admin/users", {
      ...getAuthConfig(),
      params: { role: "admin", _t: Date.now() },
    });
    const payload = response.data.data ?? response.data;
    return getUsersFromData(payload).map(toAdminUser);
  },

  // Create new user (not provided by current backend admin routes)
  create: async (payload: UserCreatePayload): Promise<StudentUser | AdminUser> => {
    void payload;
    return Promise.reject(new Error("Create user endpoint is not available in current admin API."));
  },

  // Get user by ID (using admin list endpoint with filters is preferred)
  getById: async (userId: string): Promise<StudentUser | AdminUser> => {
    const response = await api.get<{ success: boolean; data: AdminUserApi }>(`/admin/users/${userId}`, getAuthConfig());
    const user = response.data.data;
    if ((user.role || "").toLowerCase() === "admin") {
      return toAdminUser(user);
    }
    return toStudentUser(user);
  },

  // Update user (Admin only)
  update: async (userId: string, payload: { role?: "student" | "admin"; status?: "active" | "inactive" }): Promise<StudentUser | AdminUser> => {
    const response = await api.patch<{ success: boolean; data: AdminUserApi }>(`/admin/users/${userId}`, payload, getAuthConfig());
    const user = response.data.data;
    if ((user.role || "").toLowerCase() === "admin") {
      return toAdminUser(user);
    }
    return toStudentUser(user);
  },

  // Delete user (Admin only)
  delete: async (userId: string): Promise<void> => {
    await api.delete(`/admin/users/${userId}`, getAuthConfig());
  },
};
