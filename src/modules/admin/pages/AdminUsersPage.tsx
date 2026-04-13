import { useEffect, useState } from "react";
import { MdOutlineArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../../shared/Button/Index";
import Input from "../../../shared/Input/Index";
import { userApi } from "../api/userApi";
import type { AdminUser, StudentUser, UserCreatePayload, UserTab } from "../types/admin";

const PAGE_SIZE = 4;

export default function AdminUsersPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<UserTab>("students");
  const [pageByTab, setPageByTab] = useState<Record<UserTab, number>>({
    students: 1,
    admins: 1,
  });
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [creatingUser, setCreatingUser] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [studentUsers, setStudentUsers] = useState<StudentUser[]>([]);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [editUserForm, setEditUserForm] = useState<{
    id: string;
    name: string;
    role: "student" | "admin";
    status: "active" | "inactive";
  }>({
    id: "",
    name: "",
    role: "student",
    status: "active",
  });
  const [newUserForm, setNewUserForm] = useState<UserCreatePayload>({
    name: "",
    email: "",
    role: "student",
  });

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const [students, admins] = await Promise.all([
        userApi.getAllStudents(),
        userApi.getAllAdmins(),
      ]);
      setStudentUsers(students);
      setAdminUsers(admins);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const currentPage = pageByTab[activeTab];
  const currentRows = activeTab === "students" ? studentUsers : adminUsers;
  const totalPages = Math.max(1, Math.ceil(currentRows.length / PAGE_SIZE));

  const activeButtonClass = "bg-white text-violet-500 shadow-sm ring-1 ring-violet-100";
  const inactiveButtonClass = "bg-[#f8f9ff] text-slate-500 hover:text-slate-700";

  const goToPage = (page: number) => {
    setPageByTab((previous) => ({
      ...previous,
      [activeTab]: Math.min(Math.max(page, 1), totalPages),
    }));
  };

  const handleAddUser = async () => {
    if (!newUserForm.name.trim() || !newUserForm.email.trim()) {
      toast.error("Name and email are required");
      return;
    }

    setCreatingUser(true);
    try {
      await userApi.create(newUserForm);
      toast.success(`User \"${newUserForm.name}\" created successfully`);
      setShowAddUserModal(false);
      setNewUserForm({ name: "", email: "", role: "student" });

      await fetchUsers();
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("Failed to create user");
    } finally {
      setCreatingUser(false);
    }
  };

  const openEditModal = (user: { id: string; name: string; role: string }) => {
    setEditUserForm({
      id: user.id,
      name: user.name,
      role: user.role.toLowerCase() === "admin" ? "admin" : "student",
      status: "active",
    });
    setShowEditUserModal(true);
  };

  const handleUpdateUser = async () => {
    if (!editUserForm.id) return;
    setActionLoadingId(editUserForm.id);
    try {
      await userApi.update(editUserForm.id, {
        role: editUserForm.role,
        status: editUserForm.status,
      });
      toast.success("User updated successfully");
      setShowEditUserModal(false);
      await fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDeleteUser = async (user: { id: string; name: string }) => {
    const shouldDelete = window.confirm(`Delete ${user.name}? This action cannot be undone.`);
    if (!shouldDelete) return;

    setActionLoadingId(user.id);
    try {
      await userApi.delete(user.id);
      toast.success("User deleted successfully");
      await fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    } finally {
      setActionLoadingId(null);
    }
  };

  const renderUserCell = (user: { name: string; avatar: string }) => {
    const safeAvatar = user.avatar?.trim() ? user.avatar : null;
    const initials = user.name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("") || "U";

    return (
      <div className="flex items-center gap-3">
        {safeAvatar ? (
          <img
            src={safeAvatar}
            alt={user.name}
            className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-white shadow-sm"
            onError={(event) => {
              event.currentTarget.style.display = "none";
              const fallback = event.currentTarget.nextElementSibling as HTMLElement | null;
              if (fallback) fallback.style.display = "flex";
            }}
          />
        ) : null}
        <div
          style={{ display: safeAvatar ? "none" : "flex" }}
          className="h-11 w-11 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-semibold text-violet-700 ring-2 ring-white shadow-sm"
          aria-label={user.name}
        >
          {initials}
        </div>
        <div className="min-w-0 truncate font-medium text-slate-900">{user.name}</div>
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <button
          type="button"
          onClick={() => navigate("/learnflow/admin/dashboard")}
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-violet-500 transition-colors hover:text-violet-600"
        >
          <MdOutlineArrowBack className="h-4 w-4" />
          Back to Dashboard
        </button>
        <h1 className="text-2xl font-bold text-slate-900">Users</h1>
        <div className="mt-2 mb-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-500">Manage and view all users of the platform</p>
          <button
            type="button"
            onClick={() => setShowAddUserModal(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-violet-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-violet-600"
          >
            <span className="text-base leading-none">+</span>
            <span>Add User</span>
          </button>
        </div>
      </div>

      <div className="mb-0 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setActiveTab("students")}
          className={`inline-flex min-w-28 items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium transition-all ${
            activeTab === "students" ? activeButtonClass : inactiveButtonClass
          }`}
        >
          Students
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("admins")}
          className={`inline-flex min-w-28 items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium transition-all ${
            activeTab === "admins" ? activeButtonClass : inactiveButtonClass
          }`}
        >
          Admins
        </button>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm sm:p-8">
        {loadingUsers ? (
          <div className="flex items-center justify-center py-8">
            <p className="text-slate-500">Loading users...</p>
          </div>
        ) : activeTab === "students" ? (
          <div className="overflow-hidden rounded-2xl">
            <div className="space-y-3 md:hidden">
              {studentUsers
                .slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
                .map((user) => (
                  <div key={user.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="mb-3">{renderUserCell(user)}</div>
                    <div className="space-y-2 text-sm text-slate-600">
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-slate-400">Role</span>
                        <span className="text-right font-medium text-slate-800">{user.role}</span>
                      </div>
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-slate-400">Enrolled Courses</span>
                        <span className="text-right font-medium text-slate-800">{user.enrolledCourse}</span>
                      </div>
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-slate-400">Progress</span>
                        <span className="font-medium text-violet-500">{user.progress}%</span>
                      </div>
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-slate-400">Joined</span>
                        <span className="text-right font-medium text-slate-800">{user.joined}</span>
                      </div>
                      <div className="pt-1 flex items-center gap-2 justify-end">
                        <button
                          type="button"
                          onClick={() => openEditModal(user)}
                          className="rounded-md border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700 hover:border-violet-200 hover:text-violet-600"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteUser(user)}
                          disabled={actionLoadingId === user.id}
                          className="rounded-md border border-red-200 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
                        >
                          {actionLoadingId === user.id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="hidden md:block md:overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-0">
                <thead>
                  <tr className="text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    <th className="px-5 py-4">Name</th>
                    <th className="px-5 py-4">Role</th>
                    <th className="px-5 py-4">Enrolled Courses</th>
                    <th className="px-5 py-4">Progress</th>
                    <th className="px-5 py-4">Joined</th>
                    <th className="px-5 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {studentUsers
                    .slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
                    .map((user, rowIndex) => (
                      <tr key={user.id} className="bg-white text-sm text-slate-700">
                        <td className={`border-l border-b border-slate-200 px-5 py-4 ${rowIndex === 0 ? "border-t" : ""}`}>
                          {renderUserCell(user)}
                        </td>
                        <td className={`border-b border-slate-200 px-5 py-4 align-middle ${rowIndex === 0 ? "border-t" : ""}`}>
                          {user.role}
                        </td>
                        <td className={`border-b border-slate-200 px-5 py-4 align-middle ${rowIndex === 0 ? "border-t" : ""}`}>
                          {user.enrolledCourse}
                        </td>
                        <td className={`border-b border-slate-200 px-5 py-4 align-middle ${rowIndex === 0 ? "border-t" : ""}`}>
                          <span className="font-medium text-violet-500">{user.progress}%</span>
                        </td>
                        <td className={`border-r border-b border-slate-200 px-5 py-4 align-middle ${rowIndex === 0 ? "border-t" : ""}`}>
                          {user.joined}
                        </td>
                        <td className={`border-r border-b border-slate-200 px-5 py-4 align-middle ${rowIndex === 0 ? "border-t" : ""}`}>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => openEditModal(user)}
                              className="rounded-md border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700 hover:border-violet-200 hover:text-violet-600"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteUser(user)}
                              disabled={actionLoadingId === user.id}
                              className="rounded-md border border-red-200 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
                            >
                              {actionLoadingId === user.id ? "Deleting..." : "Delete"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl">
            <div className="space-y-3 md:hidden">
              {adminUsers
                .slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
                .map((user) => (
                  <div key={user.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="mb-3">{renderUserCell(user)}</div>
                    <div className="space-y-2 text-sm text-slate-600">
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-slate-400">Role</span>
                        <span className="text-right font-medium text-slate-800">{user.role}</span>
                      </div>
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-slate-400">Email</span>
                        <span className="text-right font-medium text-slate-800 break-all">{user.email}</span>
                      </div>
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-slate-400">Joined</span>
                        <span className="text-right font-medium text-slate-800">{user.joined}</span>
                      </div>
                      <div className="pt-1 flex items-center gap-2 justify-end">
                        <button
                          type="button"
                          onClick={() => openEditModal(user)}
                          className="rounded-md border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700 hover:border-violet-200 hover:text-violet-600"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteUser(user)}
                          disabled={actionLoadingId === user.id}
                          className="rounded-md border border-red-200 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
                        >
                          {actionLoadingId === user.id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="hidden md:block md:overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-0">
                <thead>
                  <tr className="text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    <th className="px-5 py-4">Name</th>
                    <th className="px-5 py-4">Role</th>
                    <th className="px-5 py-4">Email</th>
                    <th className="px-5 py-4">Joined</th>
                    <th className="px-5 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {adminUsers
                    .slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
                    .map((user, rowIndex) => (
                      <tr key={user.id} className="bg-white text-sm text-slate-700">
                        <td className={`border-l border-b border-slate-200 px-5 py-4 ${rowIndex === 0 ? "border-t" : ""}`}>
                          {renderUserCell(user)}
                        </td>
                        <td className={`border-b border-slate-200 px-5 py-4 align-middle ${rowIndex === 0 ? "border-t" : ""}`}>
                          {user.role}
                        </td>
                        <td className={`border-b border-slate-200 px-5 py-4 align-middle ${rowIndex === 0 ? "border-t" : ""}`}>
                          {user.email}
                        </td>
                        <td className={`border-r border-b border-slate-200 px-5 py-4 align-middle ${rowIndex === 0 ? "border-t" : ""}`}>
                          {user.joined}
                        </td>
                        <td className={`border-r border-b border-slate-200 px-5 py-4 align-middle ${rowIndex === 0 ? "border-t" : ""}`}>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => openEditModal(user)}
                              className="rounded-md border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700 hover:border-violet-200 hover:text-violet-600"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteUser(user)}
                              disabled={actionLoadingId === user.id}
                              className="rounded-md border border-red-200 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
                            >
                              {actionLoadingId === user.id ? "Deleting..." : "Delete"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-end gap-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="h-10 min-w-10 rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600 shadow-sm transition hover:border-violet-200 hover:text-violet-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {"<"}
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => goToPage(page)}
                className={`h-10 min-w-10 rounded-md border bg-white px-3 text-sm font-medium shadow-sm transition-all ${
                  currentPage === page
                    ? "border-violet-200 text-violet-500"
                    : "border-slate-200 text-slate-500 hover:border-violet-200 hover:text-slate-700"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="h-10 min-w-10 rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600 shadow-sm transition hover:border-violet-200 hover:text-violet-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {">"}
            </button>
          </div>
        </div>
      </div>

      {showAddUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
            <h2 className="text-xl font-bold text-slate-900">Add New User</h2>

            <div className="mt-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-800">Name *</label>
                <Input
                  value={newUserForm.name}
                  onChange={(e) => setNewUserForm((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter user name"
                  className="[&_input]:bg-white [&_input]:hover:bg-white [&_input]:focus:bg-white"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-800">Email *</label>
                <Input
                  type="email"
                  value={newUserForm.email}
                  onChange={(e) => setNewUserForm((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter user email"
                  className="[&_input]:bg-white [&_input]:hover:bg-white [&_input]:focus:bg-white"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-800">Role *</label>
                <select
                  value={newUserForm.role}
                  onChange={(e) =>
                    setNewUserForm((prev) => ({
                      ...prev,
                      role: e.target.value as "student" | "admin",
                    }))
                  }
                  className="w-full rounded-[15px] border border-[#98a2b3] bg-white px-[17px] py-[14px] text-sm text-[#011a2a] transition-all duration-200 ease-in-out hover:border-[#667085] hover:bg-white focus:outline-none focus:border-[#7300ff] focus:bg-white focus:ring-2 focus:ring-[#7300ff]/10"
                >
                  <option value="student">Student</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <Button
                variant="outline"
                label="Cancel"
                onClick={() => setShowAddUserModal(false)}
                className="flex-1 rounded-lg text-gray-500"
              />
              <Button
                label={creatingUser ? "Creating..." : "Add User"}
                onClick={handleAddUser}
                disabled={creatingUser}
                className="flex-1 rounded-lg bg-violet-500 text-white hover:bg-violet-600 disabled:opacity-50"
              />
            </div>
          </div>
        </div>
      )}

      {showEditUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
            <h2 className="text-xl font-bold text-slate-900">Update User</h2>

            <div className="mt-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-800">User</label>
                <p className="mt-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                  {editUserForm.name}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-800">Role</label>
                <select
                  value={editUserForm.role}
                  onChange={(e) =>
                    setEditUserForm((prev) => ({
                      ...prev,
                      role: e.target.value as "student" | "admin",
                    }))
                  }
                  className="w-full rounded-[15px] border border-[#98a2b3] bg-white px-[17px] py-[14px] text-sm text-[#011a2a] transition-all duration-200 ease-in-out hover:border-[#667085] hover:bg-white focus:outline-none focus:border-[#7300ff] focus:bg-white focus:ring-2 focus:ring-[#7300ff]/10"
                >
                  <option value="student">Student</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-800">Status</label>
                <select
                  value={editUserForm.status}
                  onChange={(e) =>
                    setEditUserForm((prev) => ({
                      ...prev,
                      status: e.target.value as "active" | "inactive",
                    }))
                  }
                  className="w-full rounded-[15px] border border-[#98a2b3] bg-white px-[17px] py-[14px] text-sm text-[#011a2a] transition-all duration-200 ease-in-out hover:border-[#667085] hover:bg-white focus:outline-none focus:border-[#7300ff] focus:bg-white focus:ring-2 focus:ring-[#7300ff]/10"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <Button
                variant="outline"
                label="Cancel"
                onClick={() => setShowEditUserModal(false)}
                className="flex-1 rounded-lg text-gray-500"
              />
              <Button
                label={actionLoadingId === editUserForm.id ? "Updating..." : "Update User"}
                onClick={handleUpdateUser}
                disabled={actionLoadingId === editUserForm.id}
                className="flex-1 rounded-lg bg-violet-500 text-white hover:bg-violet-600 disabled:opacity-50"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
