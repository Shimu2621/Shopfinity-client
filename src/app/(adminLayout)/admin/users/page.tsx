"use client";

import { useState } from "react";
import { useGetAllUsersQuery } from "@/redux/api/user/userApi";
import UserStats from "@/components/admin/users/UserStats";
import UserTable from "@/components/admin/users/UserTable";

const UserPage = () => {
  const { data, isLoading } = useGetAllUsersQuery();

  const users = data?.users || [];

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const limit = 5;

  // 🔍 Search filter
  const filteredUsers = users.filter(
    (u) =>
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.name.toLowerCase().includes(search.toLowerCase()),
  );

  const paginatedData = filteredUsers.slice((page - 1) * limit, page * limit);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-blue-600">User Management</h1>
        <p className="text-gray-500">
          Manage all users, roles, and access control
        </p>
      </div>

      <UserStats users={users} />

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded-md"
      />

      <UserTable
        users={paginatedData}
        total={filteredUsers.length}
        page={page}
        setPage={setPage}
        limit={limit}
        isLoading={isLoading}
      />
    </div>
  );
};

export default UserPage;
