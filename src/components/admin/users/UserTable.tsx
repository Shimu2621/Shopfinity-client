"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Trash2, ShieldCheck, User } from "lucide-react";
import { IUser } from "@/types/user/user";
import UserRoleModal from "../users/UserRoleModal";
import { useDeleteUserMutation } from "@/redux/api/user/userApi";

interface Props {
  users: IUser[];
  total: number;
  page: number;
  setPage: (page: number) => void;
  limit: number;
  isLoading: boolean;
}

const UserTable = ({
  users,
  total,
  page,
  setPage,
  limit,
  isLoading,
}: Props) => {
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [deleteUser] = useDeleteUserMutation();

  const totalPages = Math.ceil(total / limit);

  if (isLoading) {
    return (
      <p className="text-center py-10 text-gray-500 dark:text-gray-400">
        Loading users...
      </p>
    );
  }

  return (
    <div
      className="
        p-4 sm:p-5 rounded-2xl shadow-md
        bg-white dark:bg-black
        border border-gray-200 dark:border-zinc-900
      "
    >
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[600px]">
          <thead>
            <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-zinc-900">
              <th className="py-3">User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Phone</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u, index) => (
              <motion.tr
                key={u.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="
                  border-b border-gray-100 dark:border-zinc-900
                  hover:bg-gray-50 dark:hover:bg-black
                  transition
                "
              >
                {/* User */}
                <td className="py-3 font-medium text-gray-700 dark:text-white whitespace-nowrap">
                  {u.name}
                </td>

                {/* Email */}
                <td className="text-gray-500 dark:text-gray-400 break-all">
                  {u.email}
                </td>

                {/* Role */}
                <td>
                  <button
                    onClick={() => setSelectedUser(u)}
                    className={`
  flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium capitalize transition
  ${
    u.role === "admin"
      ? "border border-black text-black dark:border-white dark:text-white"
      : "border border-gray-400 text-gray-600 dark:border-gray-600 dark:text-gray-400"
  }
`}
                  >
                    {u.role === "admin" ? (
                      <ShieldCheck size={14} />
                    ) : (
                      <User size={14} />
                    )}
                    {u.role}
                  </button>
                </td>

                {/* Phone */}
                <td className="text-gray-500 dark:text-gray-400">
                  {u.phone || "-"}
                </td>

                {/* Action */}
                <td className="text-right">
                  <button
                    onClick={() => deleteUser(u.id)}
                    className="
                      inline-flex items-center gap-1 px-3 py-1.5 rounded-lg
                      border border-red-500 text-red-500
                      hover:bg-red-500 hover:text-white
                      transition
                    "
                  >
                    <Trash2 size={14} />
                    <span className="hidden sm:inline">Delete</span>
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center sm:justify-end mt-6 gap-2 flex-wrap">
        {[...Array(totalPages)].map((_, i) => {
          const isActive = page === i + 1;

          return (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`
                px-3 py-1.5 rounded-lg text-sm transition
                ${
                  isActive
                    ? "bg-white text-black"
                    : "border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-black"
                }
              `}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      {/* Modal */}
      {selectedUser && (
        <UserRoleModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};

export default UserTable;
