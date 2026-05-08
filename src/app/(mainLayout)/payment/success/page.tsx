"use client";

import { useSearchParams } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { useGetPaymentByIdQuery } from "@/redux/api/baseApi";
import { useRef } from "react";
import jsPDF from "jspdf";
import { toPng } from "html-to-image";

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
    if (!receiptRef.current || !payment) return;

    const element = receiptRef.current.cloneNode(true) as HTMLElement;

    element.style.background = "#ffffff";
    element.style.color = "#000000";
    element.style.padding = "20px";

    document.body.appendChild(element);

    try {
      const dataUrl = await toPng(element, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
      });

      const pdf = new jsPDF("p", "mm", "a4");

      const img = new Image();

      img.src = dataUrl;

      await new Promise<void>((resolve) => {
        img.onload = () => {
          const imgWidth = 190;
          const imgHeight = (img.height * imgWidth) / img.width;

          pdf.addImage(img, "PNG", 10, 10, imgWidth, imgHeight);

          pdf.save(`receipt-${payment._id}.pdf`);

          resolve();
        };
      });
    } catch (error) {
      console.error("Download error:", error);
    } finally {
      document.body.removeChild(element);
    }
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
          className="text-gray-500 dark:text-gray-400"
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            zIndex: "-1",
            opacity: "0",
            pointerEvents: "none",
            background: "#fff",
            color: "#000",
            padding: "20px",
            width: "500px",
          }}
        >
          <h2>🧾 Payment Receipt</h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span style={{ color: "#555" }}>Payment ID:</span>
              <span>{payment._id}</span>
            </div>

            <div className="flex justify-between">
              <span style={{ color: "#555" }}>Status:</span>

              <span
                style={{
                  color: "green",
                  fontWeight: "600",
                  textTransform: "capitalize",
                }}
              >
                {payment.paymentStatus}
              </span>
            </div>

            <div className="flex justify-between">
              <span style={{ color: "#555" }}>Date:</span>

              <span>
                {payment?.createdAt
                  ? new Date(payment.createdAt).toLocaleString()
                  : "N/A"}
              </span>
            </div>
          </div>

          <div
            style={{
              borderTop: "1px solid #ddd",
              paddingTop: "16px",
              marginTop: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              <span>Total Amount</span>

              <span style={{ color: "green" }}>${payment.amount}</span>
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
