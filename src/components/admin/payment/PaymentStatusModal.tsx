import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useUpdatePaymentMutation } from "@/redux/api/baseApi";
import { motion } from "framer-motion";
import { IPayment } from "@/types/payment/payment";

interface PaymentStatusModalProps {
  payment: IPayment;
  onClose: () => void;
}

const statuses = ["pending", "paid", "cancelled", "refund"];

const PaymentStatusModal = ({ payment, onClose }: PaymentStatusModalProps) => {
  const [updatePayment, { isLoading }] = useUpdatePaymentMutation();

  const handleUpdate = async (status: string) => {
    try {
      await updatePayment({
        id: payment._id,
        paymentStatus: status,
      }).unwrap();

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent
        className="
          border border-gray-200 dark:border-gray-800
          bg-white dark:bg-black
          text-black dark:text-white
          shadow-2xl
        "
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Update Payment Status
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 mt-4">
          {statuses.map((status) => (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              key={status}
              disabled={isLoading}
              onClick={() => handleUpdate(status)}
              className="
                rounded-xl
                border border-gray-200 dark:border-gray-700
                bg-gray-100 dark:bg-zinc-900
                px-4 py-3
                font-medium capitalize
                text-black dark:text-white
                transition-all duration-300
                hover:bg-blue-500
                hover:text-white
                dark:hover:bg-blue-600
              "
            >
              {status}
            </motion.button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentStatusModal;
