import { useState } from "react";
import { MdOutlineArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { adminUsers, studentUsers } from "../data/usersData";
import type { UserTab } from "../types/admin";

const PAGE_SIZE = 4;

export default function AdminUsersPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<UserTab>("students");
  const [pageByTab, setPageByTab] = useState<Record<UserTab, number>>({
    students: 1,
    admins: 1,
  });

  const currentPage = pageByTab[activeTab];
  const currentRows = activeTab === "students" ? studentUsers : adminUsers;
  const totalPages = Math.max(1, Math.ceil(currentRows.length / PAGE_SIZE));
  const activeButtonClass =
    "bg-white text-violet-500 shadow-sm ring-1 ring-violet-100";
  const inactiveButtonClass =
    "bg-[#f8f9ff] text-slate-500 hover:text-slate-700";

  const goToPage = (page: number) => {
    setPageByTab((previous) => ({
      ...previous,
      [activeTab]: Math.min(Math.max(page, 1), totalPages),
    }));
  };

  const renderUserCell = (user: { name: string; avatar: string }) => (
    <div className="flex items-center gap-3">
      <img
        src={user.avatar}
        alt={user.name}
        className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-white shadow-sm"
      />
      <div className="min-w-0 truncate font-medium text-slate-900">{user.name}</div>
    </div>
  );

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
          <p className="text-sm text-slate-500">
            Manage and view all users of the platform
          </p>
          <button
            type="button"
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
  

        {activeTab === "students" ? (
          <div className="overflow-hidden rounded-2xl">
            <div className="space-y-3 md:hidden">
              {studentUsers
                .slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
                .map((user) => (
                  <div
                    key={user.id}
                    className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <div className="mb-3">{renderUserCell(user)}</div>
                    <div className="space-y-2 text-sm text-slate-600">
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-slate-400">Role</span>
                        <span className="text-right font-medium text-slate-800">
                          {user.role}
                        </span>
                      </div>
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-slate-400">Enrolled Courses</span>
                        <span className="text-right font-medium text-slate-800">
                          {user.enrolledCourse}
                        </span>
                      </div>
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-slate-400">Progress</span>
                        <span className="font-medium text-violet-500">
                          {user.progress}%
                        </span>
                      </div>
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-slate-400">Joined</span>
                        <span className="text-right font-medium text-slate-800">
                          {user.joined}
                        </span>
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
                  </tr>
                </thead>
                <tbody>
                  {studentUsers
                    .slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
                    .map((user, rowIndex) => (
                      <tr
                        key={user.id}
                        className="bg-white text-sm text-slate-700"
                      >
                        <td
                          className={`border-l border-b border-slate-200 px-5 py-4 ${
                            rowIndex === 0 ? "border-t" : ""
                          }`}
                        >
                          {renderUserCell(user)}
                        </td>
                        <td
                          className={`border-b border-slate-200 px-5 py-4 align-middle ${
                            rowIndex === 0 ? "border-t" : ""
                          }`}
                        >
                          {user.role}
                        </td>
                        <td
                          className={`border-b border-slate-200 px-5 py-4 align-middle ${
                            rowIndex === 0 ? "border-t" : ""
                          }`}
                        >
                          {user.enrolledCourse}
                        </td>
                        <td
                          className={`border-b border-slate-200 px-5 py-4 align-middle ${
                            rowIndex === 0 ? "border-t" : ""
                          }`}
                        >
                          <span className="font-medium text-violet-500">
                            {user.progress}%
                          </span>
                        </td>
                        <td
                          className={`border-r border-b border-slate-200 px-5 py-4 align-middle ${
                            rowIndex === 0 ? "border-t" : ""
                          }`}
                        >
                          {user.joined}
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
                  <div
                    key={user.id}
                    className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <div className="mb-3">{renderUserCell(user)}</div>
                    <div className="space-y-2 text-sm text-slate-600">
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-slate-400">Role</span>
                        <span className="text-right font-medium text-slate-800">
                          {user.role}
                        </span>
                      </div>
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-slate-400">Email</span>
                        <span className="text-right font-medium text-slate-800 break-all">
                          {user.email}
                        </span>
                      </div>
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-slate-400">Joined</span>
                        <span className="text-right font-medium text-slate-800">
                          {user.joined}
                        </span>
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
                  </tr>
                </thead>
                <tbody>
                  {adminUsers
                    .slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
                    .map((user, rowIndex) => (
                      <tr
                        key={user.id}
                        className="bg-white text-sm text-slate-700"
                      >
                        <td
                          className={`border-l border-b border-slate-200 px-5 py-4 ${
                            rowIndex === 0 ? "border-t" : ""
                          }`}
                        >
                          {renderUserCell(user)}
                        </td>
                        <td
                          className={`border-b border-slate-200 px-5 py-4 align-middle ${
                            rowIndex === 0 ? "border-t" : ""
                          }`}
                        >
                          {user.role}
                        </td>
                        <td
                          className={`border-b border-slate-200 px-5 py-4 align-middle ${
                            rowIndex === 0 ? "border-t" : ""
                          }`}
                        >
                          {user.email}
                        </td>
                        <td
                          className={`border-r border-b border-slate-200 px-5 py-4 align-middle ${
                            rowIndex === 0 ? "border-t" : ""
                          }`}
                        >
                          {user.joined}
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
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
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
              ),
            )}
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
    </div>
  );
}