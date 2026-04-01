import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useUpdatePaymentMutation } from "@/redux/api/payment/paymentApi";

const statuses = ["pending", "paid", "cancelled", "refund"];

const PaymentStatusModal = ({ payment, onClose }: any) => {
  const [updatePayment] = useUpdatePaymentMutation();

  const handleUpdate = async (status: string) => {
    await updatePayment({
      id: payment._id,
      paymentStatus: status,
    });

    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Payment Status</DialogTitle>
        </DialogHeader>

        <div className="grid gap-3">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => handleUpdate(status)}
              className="p-2 rounded bg-gray-100 hover:bg-blue-500 hover:text-white"
            >
              {status}
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentStatusModal;
