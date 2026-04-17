import { api } from "../../../lib/api";
import { store } from "../../../global/store";
import type { AssignmentResponse, AssignmentCreatePayload, AssignmentUpdatePayload } from "../types/admin";

const getAssignmentsFromData = (data: unknown): AssignmentResponse[] => {
  if (Array.isArray(data)) return data as AssignmentResponse[];
  if (data && typeof data === "object") {
    const record = data as Record<string, unknown>;
    if (Array.isArray(record.assignments)) return record.assignments as AssignmentResponse[];
  }
  return [];
};

const getAuthConfig = () => {
  const token = store.getState().learnFlow.userToken;
  if (!token) return {};
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const assignmentApi = {
  // Create new assignment
  create: async (payload: AssignmentCreatePayload): Promise<AssignmentResponse> => {
    const formData = new FormData();
    formData.append("title", payload.title);
    formData.append("description", payload.description);
    formData.append("course", payload.course);
    formData.append("dueDate", payload.dueDate);
    if (typeof payload.totalMarks === "number") {
      formData.append("totalMarks", payload.totalMarks.toString());
    }
    if (payload.attachment) formData.append("attachment", payload.attachment);

    const token = store.getState().learnFlow.userToken;
    const response = await api.post<{ success: boolean; data: AssignmentResponse }>("/assignments", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    return response.data.data;
  },

  // Get all assignments
  getAll: async (): Promise<AssignmentResponse[]> => {
    const response = await api.get<{ success: boolean; data: unknown }>("/admin/assignments", getAuthConfig());
    return getAssignmentsFromData(response.data.data);
  },

  // Get assignment by ID
  getById: async (assignmentId: string): Promise<AssignmentResponse> => {
    const response = await api.get<{ success: boolean; data: AssignmentResponse }>(`/assignments/${assignmentId}`, getAuthConfig());
    return response.data.data;
  },

  // Update assignment
  update: async (assignmentId: string, payload: AssignmentUpdatePayload): Promise<AssignmentResponse> => {
    const formData = new FormData();
    if (payload.title) formData.append("title", payload.title);
    if (payload.description) formData.append("description", payload.description);
    if (payload.course) formData.append("course", payload.course);
    if (payload.dueDate) formData.append("dueDate", payload.dueDate);
    if (typeof payload.totalMarks === "number") {
      formData.append("totalMarks", payload.totalMarks.toString());
    }
    if (payload.attachment) formData.append("attachment", payload.attachment);

    const token = store.getState().learnFlow.userToken;
    const response = await api.put<{ success: boolean; data: AssignmentResponse }>(
      `/assignments/${assignmentId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    );
    return response.data.data;
  },

  // Delete assignment
  delete: async (assignmentId: string): Promise<void> => {
    await api.delete(`/assignments/${assignmentId}`, getAuthConfig());
  },
};
