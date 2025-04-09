import React, { useCallback, useState } from "react";
import EmployeeRow from "./EmployeeRow";
import { useMyContext } from "../context/MyContext";
import { debounce, set } from "lodash";

export default function EmployeeTable({ employees, onEdit, onDelete, onAddEmployee, setFormData, page, setPage, totalPage, setSearch, sortBy, setSortBy }) {

    const { user } = useMyContext();
    const [searchInput, setSearchInput] = useState('');

    const debouncedSearch = useCallback(
        debounce((searchTerm) => {
            setSearch(searchTerm)
        }, 500),
        []
    );

    const handleChange = (e) => {
        setPage(1)
        setSearchInput(e.target.value)
        debouncedSearch(e.target.value);
    };

    return (
        <div className="w-full ">

            <div className="flex justify-between mb-4">

                <div className="flex flex-row gap-2 flex-wrap items-center">
                    <input type="text"
                        value={searchInput}
                        onChange={handleChange}
                        placeholder="Search..."
                        className="bg-gray-700 outline-none rounded-lg px-2 py-1 text-sm border-2 border-gray-400"
                    />

                    <div>
                        <label>
                            <select name="" id="" value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                                className="bg-gray-700 outline-none rounded-lg px-2 py-1 text-sm border-2 border-gray-400"
                            >
                                <option value="">--Sort By--</option>
                                <option value="latest">Latest</option>
                                <option value="oldest">Oldest</option>
                            </select>
                        </label>
                    </div>
                </div>

                <button
                    onClick={onAddEmployee}
                    disabled={!(user.role === "admin" || user.designation === "HR")}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
                >
                    Add Employee
                </button>
            </div>
            <div className="w-full overflow-x-auto">
                <table className="min-w-full bg-gray-800 border border-gray-700">
                    <thead>
                        <tr className="text-left">
                            <th className="px-4 py-2 border-b border-gray-700">Id</th>
                            <th className="px-4 py-2 border-b border-gray-700">Image</th>
                            <th className="px-4 py-2 border-b border-gray-700">Name</th>
                            <th className="px-4 py-2 border-b border-gray-700">Email</th>
                            <th className="px-4 py-2 border-b border-gray-700 text-nowrap">Mobile No</th>
                            <th className="px-4 py-2 border-b border-gray-700">Designation</th>
                            <th className="px-4 py-2 border-b border-gray-700">Gender</th>
                            <th className="px-4 py-2 border-b border-gray-700">Course</th>
                            <th className="px-4 py-2 border-b border-gray-700 text-nowrap">Create Date</th>
                            <th className="px-4 py-2 border-b border-gray-700">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employees.length > 0 ?
                                employees.map((emp) => (
                                    <EmployeeRow
                                        key={emp._id}
                                        employee={emp}
                                        onEdit={onEdit}
                                        onDelete={onDelete}
                                    />
                                )) :
                                <tr className="my-5 py-5">
                                    <td colSpan={10} className="text-center my-5">No Data Found</td>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>

            <div className="flex flex-row justify-between mt-4">
                <p>Total Page {totalPage}</p>

                <div className="flex flex-row items-center gap-3" >
                    <button
                        disabled={page <= 1}
                        onClick={() => setPage(page - 1)}
                        className="bg-gray-600 py-1 px-2 rounded-lg text-sm"
                    >Previous</button>
                    <p>{page}</p>
                    <button
                        onClick={() => setPage(page + 1)}
                        disabled={page >= totalPage}
                        className="bg-gray-600 py-1 px-2 rounded-lg text-sm"
                    >Next</button>
                </div>
            </div>

        </div>
    );
}
