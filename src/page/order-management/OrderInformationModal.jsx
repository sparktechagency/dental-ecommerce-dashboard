import React from "react";
import { MdEmail, MdPhone, MdLocationOn, MdDownload } from "react-icons/md";

export default function OrderInformationModal({ order }) {
  if (!order) return null;

  const subtotal =
    order.items?.reduce((sum, item) => sum + item.price * item.quantity, 0) ||
    0;
  const shippingFee = 5.0;
  const total = subtotal + shippingFee;

  return (
    <div className="bg-white p-5 w-full">
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
        </div>

        {/* Order Info */}
        <div className="flex items-center justify-between mb-5">
          <span className="text-gray-700 text-lg">
            {order.orderNumber || `#${order.key}`}
          </span>
          <span
            className={`${getStatusStyle(
              order.status
            )} px-3 py-1 rounded-md text-sm font-medium`}
          >
            {order.status}
          </span>
        </div>

        <div className="text-gray-600 mb-4">
          Placed on : {order.date || "N/A"}
        </div>

        {/* Customer Details */}
        <div className="space-y-3">
          <div className="text-gray-900 font-medium">
            {order.customerName || "N/A"}
          </div>

          {order.email && (
            <div className="flex items-center gap-2 text-gray-600">
              <MdEmail className="w-4 h-4" />
              <span>{order.email}</span>
            </div>
          )}

          {order.phone && (
            <div className="flex items-center gap-2 text-gray-600">
              <MdPhone className="w-4 h-4" />
              <span>{order.phone}</span>
            </div>
          )}

          {order.address && (
            <div className="flex items-start gap-2 text-gray-600">
              <MdLocationOn className="w-4 h-4 mt-1 flex-shrink-0" />
              <span>Address: {order.address}</span>
            </div>
          )}
        </div>

        {/* Payment Method */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
          <span className="text-green-600 font-medium">
            {order.paymentMethod || "Cash On Delivery"}
          </span>
          <span
            className={`${
              order.paymentStatus === "Paid"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            } px-3 py-1 rounded-md text-sm font-medium`}
          >
            {order.paymentStatus || "Unpaid"}
          </span>
        </div>
      </div>

      {/* Order Items */}
      <div className="mb-5">
        <div className="space-y-4">
          {order.items?.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-5 p-3 bg-gray-50 rounded-lg"
            >
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-gray-300 rounded"></div>
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900 font-medium">
                  {item.name || "Product Name"}
                </h3>
                <p className="text-blue-600 font-medium">
                  Price: ${item.price ? item.price.toFixed(2) : "0.00"}
                </p>
              </div>
              <div className="text-gray-700">
                <span className="font-medium">Qty: {item.quantity || "0"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="">
        <div className="space-y-4">
          <div className="flex justify-between items-center text-gray-700">
            <span>Subtotal</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between items-center text-gray-700">
            <span>Shipping fee</span>
            <span className="font-medium">${shippingFee.toFixed(2)}</span>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-900 font-medium text-lg">Total :</span>
              <span className="text-blue-600 font-bold text-xl">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Export Button */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            onClick={() => console.log("Export invoice for order:", order.key)}
          >
            <MdDownload className="w-5 h-5" />
            Export Invoice
          </button>
        </div>
      </div>
    </div>
  );
}

// Helper function to get status styles
function getStatusStyle(status) {
  const styles = {
    Pending: "bg-yellow-100 text-yellow-800",
    Processing: "bg-blue-100 text-blue-800",
    Shipped: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
  };
  return styles[status] || "bg-gray-100 text-gray-800";
}
