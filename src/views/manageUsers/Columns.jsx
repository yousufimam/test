import { Edit2, Trash } from "react-feather";

import { helper as $h } from "@/utils";
import { Button } from "reactstrap";

export const Columns = (columnFun, callbackDeleteModalPreview) => {
  return [
    {
      name: "ID",
      sortable: true,
      minWidth: "100px",
      cell: (row) => {
        return <span className="text-bold-500">{row.userId}</span>;
      }
    },
    {
      name: "NAME",
      sortable: true,
      minWidth: "100px",
      row: "row",
      cell: (row) => {
        return (
          <span className="text-bold-500">
            {row.name ? $h.capitalizeFirstLetter(row.name) : ""}
          </span>
        );
      }
    },
    {
      name: "EMAIL",
      sortable: true,
      minWidth: "200px",
      cell: (row) => {
        return <span className="text-bold-500">{row.email}</span>;
      }
    },
    {
      name: "PHONE",
      sortable: true,
      minWidth: "100px",
      cell: (row) => {
        return <span className="text-bold-500">{row.phoneNumber}</span>;
      }
    },
    {
      name: "ACTIONS",
      center: true,
      minWidth: "350px",
      cell: (row) => {
        return (
          <div
            className="
          d-flex
          justify-content-center
          align-items-center"
          >
            <Button
              size="sm"
              color="primary"
              outline
              className="btn btn-icon mr-6"
              onClick={() => {
                columnFun({
                  show: true,
                  type: "Edit",
                  data: row
                });
              }}
            >
              <Edit2 className="font-medium-2 mr-2" size={15} />
              <span className="align-middle ms-50">Edit</span>
            </Button>

            <Button
              size="sm"
              color="primary"
              outline
              className="btn btn-icon"
              onClick={() => {
                callbackDeleteModalPreview({
                  show: true,
                  data: row
                });
              }}
            >
              <Trash className="font-medium-2 mr-2" size={15} />
              <span className="align-middle ms-50">Delete</span>
            </Button>
          </div>
        );
      }
    }
  ];
};
