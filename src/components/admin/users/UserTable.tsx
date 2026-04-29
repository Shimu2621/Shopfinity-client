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
      className="p-5 rounded-2xl shadow-md 
                 bg-white dark:bg-gray-900 
                 border border-gray-200 dark:border-zinc-800"
    >
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-zinc-800">
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
                className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-zinc-900 transition"
              >
                {/* User */}
                <td className="py-3 font-medium text-gray-700 dark:text-gray-200">
                  {u.name}
                </td>

                {/* Email */}
                <td className="text-gray-500 dark:text-gray-400">{u.email}</td>

                {/* Role */}
                <td>
                  <button
                    onClick={() => setSelectedUser(u)}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium capitalize transition
                      ${
                        u.role === "admin"
                          ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                          : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                      }`}
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
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg 
                               bg-red-500/10 text-red-600 
                               hover:bg-red-500 hover:text-white 
                               transition"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-6 gap-2 flex-wrap">
        {[...Array(totalPages)].map((_, i) => {
          const isActive = page === i + 1;

          return (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1.5 rounded-lg text-sm transition
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow"
                    : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
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
