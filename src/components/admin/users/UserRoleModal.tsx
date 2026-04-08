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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update User Role</DialogTitle>
        </DialogHeader>

        <div className="grid gap-3">
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => handleUpdate(role)}
              className="p-2 rounded bg-gray-100 hover:bg-blue-500 hover:text-white capitalize"
            >
              {role}
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserRoleModal;
