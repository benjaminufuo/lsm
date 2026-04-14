import api from "../../../lib/api";
import type { Assignment } from "../types/admin";

export interface Submission {
  _id: string;
  student: {
    _id: string;
    fullName: string;
    email?: string;
  };
  assignment: string;
  content?: string;
  fileUrl?: string;
  status: string;
  grade?: number;
  feedback?: string;
  submittedAt?: string;
}

export const getAllAssignments = async () => {
  const response = await api.get<{ data: Assignment[] }>("admin/assignments");
  return response.data;
};

export const getAssignmentSubmissions = async (assignmentId: string) => {
  const response = await api.get<{ data: Submission[] }>(
    `submissions/assignments/${assignmentId}/submissions`,
  );
  return response.data;
};

export const gradeSubmission = async (
  submissionId: string,
  payload: { grade: number; feedback?: string },
) => {
  const response = await api.patch(
    `submissions/${submissionId}/grade`,
    payload,
  );
  return response.data;
};
