"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { IUser } from "@/types/user/user";
import { useUpdateUserMutation } from "@/redux/api/user/userApi";

const roles: ("user" | "admin")[] = ["user", "admin"];

const UserRoleModal = ({
  user,
  onClose,
}: {
  user: IUser;
  onClose: () => void;
}) => {
  const [updateUser] = useUpdateUserMutation();

  const handleUpdate = async (role: "user" | "admin") => {
    await updateUser({
      id: user.id,
      data: { role },
    });

    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent
        className="
          rounded-2xl p-6
          bg-white dark:bg-black
          border border-gray-200 dark:border-zinc-900
        "
      >
        <DialogHeader>
          <DialogTitle className="text-gray-800 dark:text-white text-lg font-semibold">
            Update User Role
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-3 mt-2">
          {roles.map((role) => {
            const isActive = user.role === role;

            return (
              <button
                key={role}
                onClick={() => handleUpdate(role)}
                className={`
    w-full p-2.5 rounded-lg text-sm font-medium capitalize transition
    ${
      isActive
        ? "border border-black text-black dark:border-white dark:text-white"
        : "border border-gray-300 text-gray-600 dark:border-gray-700 dark:text-gray-400"
    }
    hover:bg-gray-100 dark:hover:bg-black
  `}
              >
                {role}
              </button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserRoleModal;
