import { useState } from "react";
import { motion } from "framer-motion";
import { IUser } from "@/types/user/user";
import UserRoleModal from "./UserRoleModal";
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
    return <p className="text-center py-10">Loading users...</p>;
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500">
            <th>User</th>
            <th>Email</th>
            <th>Role</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u, index) => (
            <motion.tr
              key={u.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className="border-t"
            >
              <td>{u.name}</td>
              <td>{u.email}</td>

              <td>
                <button
                  onClick={() => setSelectedUser(u)}
                  className={`px-3 py-1 rounded capitalize ${
                    u.role === "admin"
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100"
                  }`}
                >
                  {u.role}
                </button>
              </td>

              <td>{u.phone || "-"}</td>

              <td className="space-x-2">
                <button
                  onClick={() => deleteUser(u.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-end mt-4 gap-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded ${
              page === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
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
