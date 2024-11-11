import { FC, useEffect } from "react";
import useFechData from "../../hooks/useFechData";
import { Table } from "../../components/Table/Table";
import { User } from "../../store/AuthStore";
import { createColumnHelper } from "@tanstack/react-table";
import API from "../../services/axiosInstance";
import { useAuthStore } from "../../store/AuthStore";
import { useAlert } from "../../hooks/useAlert";
import TableLoader from "../../components/loaders/TableLoader";
export const Customers: FC = () => {
  const {
    data: customers,
    isLoading,
    isError,
  } = useFechData<User[]>("users", "customers");
  const columnHelper = createColumnHelper<User>();
  const { updateRole: updateRoleStore, users, setUsers } = useAuthStore();
  const { showAlert } = useAlert();

  useEffect(() => {
    setUsers(customers ?? []);
  }, [customers]);

  const updateRole = async (id: string, role: string) => {
    try {
      await API.put(`/api/users/${id}`, {
        role: role === "admin" ? "user" : "admin",
      });
      updateRoleStore(id, role === "admin" ? "user" : "admin");
      showAlert("Role updated successfully", "success");
    } catch (error) {
      console.log(error);
      showAlert("Failed to update role", "error");
    }
  };

  const columns = [
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("email", {
      header: "Email",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("phone", {
      header: "Phone",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("address", {
      header: "Address",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("role", {
      header: "Role",
      cell: (info) => (
        <span
          onClick={() => updateRole(info.row.original._id, info.getValue())}
          className={`px-2 py-1 rounded-full cursor-pointer ${
            info.getValue() === "admin"
              ? "bg-red-100 text-red-800"
              : info.getValue() === "user"
              ? "bg-blue-100 text-blue-800"
              : ""
          }`}
        >
          {info.getValue()}
        </span>
      ),
    }),
  ];

  return (
    <div>
      <p className="text-2xl font-bold py-4 text-center bg-gray-100">
        Customers
      </p>
      {isLoading && <TableLoader />}
      {!isLoading && !isError && <Table data={users ?? []} columns={columns} />}
    </div>
  );
};
