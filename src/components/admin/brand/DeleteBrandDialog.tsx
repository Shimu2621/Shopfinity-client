"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDeleteBrandMutation } from "@/redux/api/brand/brandApi";
import { toast } from "sonner";

interface Props {
  open: boolean;
  setOpen: (val: boolean) => void;
  id: string;
}

export default function DeleteBrandDialog({ open, setOpen, id }: Props) {
  const [deleteBrand] = useDeleteBrandMutation();

  const handleDelete = async () => {
    await deleteBrand(id);
    toast.success("Brand deleted");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-white/20 backdrop-blur-2xl border border-white/30 shadow-2xl">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
        </DialogHeader>

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button className="bg-red-500" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
