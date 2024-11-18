import { createColumnHelper } from "@tanstack/react-table";
import { Table } from "../../../components/Table/Table";
import ViewIcon from "../../../assets/icons/ViewIcon";
import { Button } from "../../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import useFechData from "../../../hooks/useFechData";
import TableLoader from "../../../components/loaders/TableLoader";
import ErrorPage from "../../../components/error/ErrorPage";

// Define the type for our order data
export type Order = {
  _id: string;
  customerName: string;
  email: string;
  orderDate: string;
  status: string;
  total: number;
  createdAt: string;
  name: string;
  totalAmount: number;
};

export default function OrdersPage() {
  const navigate = useNavigate();

  const {
    data: orders,
    isLoading,
    isError,
    error
  } = useFechData<Order[]>("orders", "orders");
  console.log(orders);

  const columnHelper = createColumnHelper<Order>();

  const columns = [
    columnHelper.accessor("_id", {
      header: "Order ID",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("name", {
      header: "Customer",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("email", {
      header: "Email",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("createdAt", {
      header: "Date",
      cell: (info) => new Date(info.getValue()).toLocaleDateString(),
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("totalAmount", {
      header: "Total",
      cell: (info) => `GHS ${info.getValue().toFixed(2)}`,
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: (props) => {
        const order = props.row.original;

        return (
          <div className="flex gap-2">
            <Button
              onClick={() => handleView(order)}
              className="p-1 "
              title="View Order"
            >
              <ViewIcon />
            </Button>
          </div>
        );
      },
    }),
  ];

  //   // Action handlers
  const handleView = (order: Order) => {
    console.log("View order:", order);
    navigate(`/admin/order/${order._id}`);
    // Add your view logic here
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      {isError && <ErrorPage message={error?.message}/>}
      {isLoading && <TableLoader />}
      {!isLoading && !isError && (
        <Table
          data={orders ?? []}
          columns={columns}
          pageSize={5} // Optional: customize items per page
        />
      )}
    </div>
  );
}
