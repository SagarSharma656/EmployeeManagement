import React from "react";
import { useMyContext } from "../context/MyContext";
import { dateFormate } from "../../utils/helperFunctions";

export default function EmployeeRow({ employee, onEdit, onDelete }) {

    const {user} = useMyContext();

    return (
        <tr className="hover:bg-gray-700">
            <td className="px-4 py-2 border-b border-gray-700">{employee.employeeId}</td>
            <td className="px-4 py-2 border-b border-gray-700">
                <img
                    src={employee.imageUrl}
                    alt={employee.name}
                    className="h-10 w-10"
                />
            </td>
            <td className="px-4 py-2 border-b border-gray-700">{employee.name}</td>
            <td className="px-4 py-2 border-b border-gray-700">{employee.email}</td>
            <td className="px-4 py-2 border-b border-gray-700">{employee.mobile}</td>
            <td className="px-4 py-2 border-b border-gray-700">
                {employee.designation}
            </td>
            <td className="px-4 py-2 border-b border-gray-700">{employee.gender}</td>
            <td className="px-4 py-2 border-b border-gray-700">{employee.course.join(", ")}</td>
            <td className="px-4 py-2 border-b border-gray-700">{dateFormate(employee.createdAt)}</td>
            <td className="px-4 py-2 border-b border-gray-700 space-x-2 flex flex-row ">
                <button
                    onClick={() => onEdit(employee)}
                    disabled={!(user.role === "admin" || user.designation === "HR")}
                    className="px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(employee._id)}
                    disabled={!(user.role === "admin" || user.designation === "HR")}
                    className="px-2 py-1 bg-red-600 hover:bg-red-700 rounded"
                >
                    Delete
                </button>
            </td>
        </tr>
    );
}
