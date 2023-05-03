const keyValue = {
  optionsPerPage: [
    { value: 10, label: "10" },
    { value: 25, label: "25" },
    { value: 35, label: "35" },
    { value: 50, label: "50" },
  ],

  optionsOrderStatus: [
    { value: "approved", label: "Approved" },
    { value: "approval", label: "Approval" },
    { value: "processing", label: "Processing" },
    { value: "packing", label: "Packing" },
    { value: "shipping", label: "Shipping" },
    { value: "delivered", label: "Delivered" },
  ],
  orderStatus: [
    { value: "paid", label: "Paid" },
    { value: "refund", label: "Refund" },
    { value: "unpaid", label: "Unpaid" },
  ],
};

export { keyValue as keyValue };
