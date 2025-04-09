import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import HomeContent from "../components/HomeContent";
import EmployeeTable from "../components/EmployeeTable";
import AddEmployeeModal from "../components/AddEmployeeModal";
import axios from "axios";
import { useMyContext } from "../context/MyContext";
import toast from "react-hot-toast";
import UpdateEmployeeModal from "../components/UpdateEmployeeModal";
const { VITE_BASE_URL } = import.meta.env;

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("home");
    const [isModalOpen, setModalOpen] = useState(false);
    const [isModalUpdateOpen, setModalUpdateOpen] = useState(false);
    const { setLoading } = useMyContext();
    const [employeeEdit, setEmployeeEdit] = useState(false);
    const [updateFormData, setUpdateFormData] = useState({})
    const [formData, setFormData] = useState({
        employeeId: "",
        image: null,
        name: "",
        email: "",
        password: "",
        mobile: "",
        designation: "",
        gender: "",
        course: []
    });
    const [employees, setEmployees] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState("");



    const fetchAllEmployee = async () => {
        setLoading(true);
        try {
            const param = new URLSearchParams()
            param.append('pageNo', page)
            param.append('itemOnPage', 10)
            param.append('search', search)
            param.append("sortBy", sortBy)

            const res = await axios.get(`${VITE_BASE_URL}/employee/all?${param.toString()}`, {
                withCredentials: true
            })

            if (res.status == 200) {
                setEmployees(res?.data?.allEmployees)
                setTotalPage(res?.data?.totalPages)
            }

        } catch (error) {
            console.log(`Error in fetching all employees data : ${error}`)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAllEmployee();
    }, [page, search, sortBy])



    const handleAddEmployeeSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const { employeeId, image, name, email, password, mobile, designation, gender, course } = formData;
        if (!employeeId || !name || !email || !password || !mobile || !designation || !gender || !course.length) {
            toast.error("Fill all mandatory fields", { duration: 2000 })
            return;
        }
        if (!/^\d{1,10}$/.test(mobile)) {
            toast.error("Enter a valid 10 digit mobile number", { duration: 2000 })
            return;
        }
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
            toast.error("Password must be at least 8 characters and include uppercase, lowercase, number, and special character.", { duration: 2000 });
            return;
        }

        const form = new FormData();
        form.append('employeeId', employeeId)
        form.append('name', name)
        form.append('email', email)
        form.append('password', password)
        form.append('mobile', mobile)
        form.append('designation', designation)
        form.append('gender', gender)

        if (image) form.append('image', image)
        course.forEach((course) => {
            form.append("course", course)
        })

        try {
            const res = await axios.post(`${VITE_BASE_URL}/employee`, form, {
                withCredentials: true,
            })

            if (res.status == 200) {
                toast.success(res?.data?.message, { duration: 2000 })
                fetchAllEmployee();
                setModalOpen(false);
                setFormData({
                    employeeId: "",
                    image: null,
                    name: "",
                    email: "",
                    password: "",
                    mobile: "",
                    designation: "",
                    gender: "",
                    course: []
                });
            }
        } catch (error) {
            toast.error(error?.response?.data?.message, { duration: 2000 })
            console.log(`Error in employee create : ${error?.response?.data?.message}`)
        } finally {
            setLoading(false);
        }
    };

    const setEditEmployee = (employee) => {
        setUpdateFormData({ ...employee })
        setEmployeeEdit(true)
        setModalUpdateOpen(true)
    }

    const handleEditEmployee = async (e) => {
        e.preventDefault();
        setLoading(true);
        const { employeeId, image, name, email, mobile, designation, gender, course } = updateFormData;
        if (!employeeId || !name || !email || !mobile || !designation || !gender || !course) {
            toast.error("Fill all mandatory fields", { duration: 2000 })
            return;
        }
        if (!/^\d{1,10}$/.test(mobile)) {
            toast.error("Enter a valid 10 digit mobile number", { duration: 2000 })
            return;
        }

        const form = new FormData();
        form.append('employeeId', employeeId)
        form.append('name', name)
        form.append('email', email)
        form.append('mobile', mobile)
        form.append('designation', designation)
        form.append('gender', gender)

        if (image) form.append('image', image)
        course.forEach((course) => {
            form.append("course", course)
        })

        try {
            const res = await axios.put(`${VITE_BASE_URL}/employee/${updateFormData?._id}`, form, {
                withCredentials: true,
            })

            if (res.status == 200) {
                toast.success(res?.data?.message, { duration: 2000 })
                fetchAllEmployee();
                setModalUpdateOpen(false);
            }

        } catch (error) {
            toast.error(error?.response?.data?.message, { duration: 2000 })
            console.log(`Error in Employee update : ${error?.response?.data?.message}`)
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteEmployee = async (id) => {
        setLoading(true);
        try {
            const res = await axios.delete(`${VITE_BASE_URL}/employee/${id}`, {
                withCredentials: true,
            })

            if (res.status == 200) {
                toast.success(res?.data?.message, { duration: 2000 })
                fetchAllEmployee();
            }

        } catch (error) {
            toast.error(error?.response?.data?.message, { duration: 2000 })
            console.log(`Error in Employee delete : ${error?.response?.data?.message}`)
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Navbar />
            <div className="p-4">
                {/* Tab Navigation */}
                <div className="flex justify-between items-center mb-4">
                    <div className="flex space-x-4">
                        <button
                            onClick={() => setActiveTab("home")}
                            className={`px-4 py-2 border-b-2 cursor-pointer ${activeTab === "home" ? "border-purple-600 text-purple-600" : "border-transparent text-white"
                                }`}
                        >
                            Home
                        </button>
                        <button
                            onClick={() => setActiveTab("employees")}
                            className={`px-4 py-2 border-b-2 cursor-pointer ${activeTab === "employees" ? "border-purple-600 text-purple-600" : "border-transparent text-white"
                                }`}
                        >
                            Employee Table
                        </button>
                    </div>
                </div>

                {/* Tab Content */}
                {activeTab === "home" && <HomeContent />}
                {activeTab === "employees" && (
                    <EmployeeTable
                        employees={employees}
                        onEdit={setEditEmployee}
                        onDelete={handleDeleteEmployee}
                        onAddEmployee={() => setModalOpen(true)}
                        setFormData={setUpdateFormData}
                        page={page}
                        setPage={setPage}
                        totalPage={totalPage}
                        setSearch={setSearch}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                    />
                )}
            </div>

            <AddEmployeeModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleAddEmployeeSubmit}
                formData={formData}
                setFormData={setFormData}
            />

            <UpdateEmployeeModal
                isOpen={isModalUpdateOpen}
                onClose={() => setModalUpdateOpen(false)}
                onSubmit={handleEditEmployee}
                formData={updateFormData}
                setFormData={setUpdateFormData}
            />
        </div>
    );
}
