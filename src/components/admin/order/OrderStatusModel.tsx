import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useUpdateOrderStatusMutation } from "@/redux/api/order/orderApi";
import { IOrder } from "@/types/order/order";

const statuses: IOrder["status"][] = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

const OrderStatusModal = ({
  order,
  onClose,
}: {
  order: IOrder;
  onClose: () => void;
}) => {
  const [updateOrder] = useUpdateOrderStatusMutation();

  const handleUpdate = async (status: IOrder["status"]) => {
    await updateOrder({ id: order._id, status });
    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Order Status</DialogTitle>
        </DialogHeader>

        <div className="grid gap-3">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => handleUpdate(status)}
              className="p-2 rounded bg-gray-100 hover:bg-blue-500 hover:text-white capitalize"
            >
              {status}
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderStatusModal;
