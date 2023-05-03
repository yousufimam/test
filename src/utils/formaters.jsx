import { helper as $h } from "@/utils";
import { Lucide } from "@/base-components";
import classnames from "classnames";
import moment from "moment";

export const pmidFormatter = function (cell, formatterParams) {
  return moment(cell.getValue()).utc().format("DD-MMM-YYYY");
};

export const CapitalizeFormatter = function (cell, formatterParams) {
  var status = $h.capitalizeFirstLetter(cell.getValue());

  return status == "Paid"
    ? `<div class ="text-success">
    ${status}</div>`
    : `<div class ="text-danger">
    ${status}</div>`;
};

export function SimpleButton(props) {
  const rowData = props.cell._cell.row.data;
  const columnHeader = props.cell._cell.column.field;

  return columnHeader == "credit" && rowData.invoiceStatus == "refund"
    ? $h.formatCurrency(rowData.totalAmount)
    : columnHeader == "debit" && rowData.invoiceStatus == "paid"
    ? $h.formatCurrency(rowData.totalAmount)
    : "";
}
export function OrderStatusFormatter(props) {
  const orderStatusCell = props.cell._cell.row.data.orderStatus;
  return (
    <div
      className={classnames({
        "whitespace-nowrap": true,

        "text-green-700": orderStatusCell == "approved",
        "text-success": orderStatusCell == "approval",
        "text-info": orderStatusCell == "processing",
        "text-danger": orderStatusCell == "cancelled",
        "text-warning": orderStatusCell == "packing",
        "text-primary": orderStatusCell == "shipping" || orderStatusCell == "delivered"
      })}
    >
      {$h.capitalizeFirstLetter(orderStatusCell)}
    </div>
  );
}

export function PaymentStatusFormatter(props) {
  const StatusCell = props.cell._cell.row.data.invoiceStatus;

  return (
    <div
      className={classnames({
        "flex items-center  whitespace-nowrap": true,
        "text-success": StatusCell == "paid",
        "text-info": StatusCell == "refund",
        "text-danger": StatusCell == "unpaid"
      })}
    >
      <Lucide icon="CheckSquare" className="w-4 h-4 mr-2" />
      {$h.capitalizeFirstLetter(StatusCell)}
    </div>
  );
}
