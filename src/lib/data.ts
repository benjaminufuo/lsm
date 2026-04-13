import { api } from "./api";

export const getActiveEnrolledCourse = async (id: string) => {
  const token = id;
  const { data } = await api.get("/enrollments/my-courses?status=active", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
export const getEnrolledCourse = async (id: string) => {
  const token = id;
  const { data } = await api.get("/enrollments/my-courses", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
export const getAssignments = async (id: string) => {
  const token = id;
  const { data } = await api.get("/assignments?page=1&limit=20", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
