"use client";

import { useSearchParams } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { useGetPaymentByIdQuery } from "@/redux/api/baseApi";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function PaymentSuccessPage() {
  const params = useSearchParams();
  const receiptRef = useRef<HTMLDivElement>(null);

  const paymentId = params.get("paymentId");

  const { data, isLoading, error } = useGetPaymentByIdQuery(paymentId!, {
    skip: !paymentId,
  });

  const payment = data?.data;

  const handlePrint = () => {
    if (!receiptRef.current) return;

    const printWindow = window.open("", "_blank");

    if (!printWindow) return;

    printWindow.document.write(`
    <html>
      <head>
        <title>Receipt</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
          }
        </style>
      </head>
      <body>
        ${receiptRef.current.innerHTML}
      </body>
    </html>
  `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const handleDownload = async () => {
    if (!receiptRef.current) return;

    const canvas = await html2canvas(receiptRef.current);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgWidth = 190;
    // const pageHeight = 290;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    pdf.save("receipt.pdf");
  };

  if (isLoading) {
    return (
      <div className="text-center mt-20 text-gray-700 dark:text-gray-300">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-20">API Error</div>;
  }

  if (!payment) {
    return (
      <div className="text-red-500 text-center mt-20">Payment not found</div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10
      bg-gradient-to-br from-gray-100 via-white to-gray-200
      dark:from-gray-900 dark:via-gray-800 dark:to-black
      text-gray-900 dark:text-white"
    >
      <div
        className="max-w-xl w-full rounded-2xl p-6 space-y-6 shadow-xl
        bg-white border border-gray-200
        dark:bg-gray-900/80 dark:border-gray-700 backdrop-blur-lg"
      >
        {/* Header */}
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-green-600 dark:text-green-400">
            Payment Successful
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
            Your transaction has been completed successfully
          </p>
        </div>

        {/* Receipt */}
        <div
          ref={receiptRef}
          style={{
            background: "#ffffff",
            color: "#000000",
          }}
          className="rounded-xl p-5 space-y-4 border"
          // className="rounded-xl p-5 space-y-4 border
          //   bg-gray-50 border-gray-200
          //   dark:bg-gray-800 dark:border-gray-700"
        >
          <h2 className="text-lg font-semibold text-center">
            🧾 Payment Receipt
          </h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">
                Payment ID:
              </span>
              <span>{payment._id}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Status:</span>
              <span className="text-green-600 dark:text-green-400 font-semibold capitalize">
                {payment.paymentStatus}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Date:</span>
              <span>
                {payment?.createdAt
                  ? new Date(payment.createdAt).toLocaleString()
                  : "N/A"}
              </span>
            </div>
          </div>

          <div className="border-t pt-4 border-gray-200 dark:border-gray-700">
            <div className="flex justify-between text-xl font-bold">
              <span>Total Amount</span>
              <span className="text-green-600 dark:text-green-400">
                ${payment.amount}
              </span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleDownload}
            className="flex-1 py-2 rounded-lg text-white
      bg-gradient-to-r from-blue-600 to-indigo-600"
          >
            Download Receipt
          </button>

          <button
            onClick={handlePrint}
            className="flex-1 py-2 rounded-lg border
      border-gray-300 text-gray-700
      dark:border-gray-600 dark:text-gray-200"
          >
            Print Receipt
          </button>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Thank you for your purchase 💙
        </p>
      </div>
    </div>
  );
}
