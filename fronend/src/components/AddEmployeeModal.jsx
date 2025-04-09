import React, { useState } from "react";

export default function AddEmployeeModal({ isOpen, onClose, onSubmit, formData, setFormData }) {
    if (!isOpen) return null;

    const checkboxItem = ["B.Tech", "MCA", "BCA", "BSC"]

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;

        if (checked) {
            setFormData((prev) => ({ ...prev, course: [...formData.course, value] }));
        } else {
            setFormData((prev) => ({ ...prev, course: formData.course.filter((item) => item !== value) }))
        }
    };

    const handleMobileChange = (e) => {
        const { value } = e.target

        if (/^\d{1,10}$/.test(value) || value === "") {
            setFormData(prev => ({ ...prev, mobile: value }))
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-60 z-50 p-2 overflow-y-auto py-5">
            <div className="bg-gray-800 p-6 rounded-lg w-full max-w-[500px] relative">
                <h3 className="text-xl font-bold mb-4">Add Employee</h3>
                <form onSubmit={onSubmit} className="space-y-2 text-sm">
                    <div className="flex justify-center items-center">
                        <label htmlFor="profile" className="text-sm mb-1 cursor-pointer">
                            <img src={formData.image ? URL.createObjectURL(formData?.image) : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6rKwDbEN_M9FCcve-ozbDkUUn6VkEZ7xfVw&s'} alt="" className="w-18 h-18 rounded-full" />
                        </label>

                        <input
                            id="profile"
                            type="file"
                            className="w-full text-gray-900 hidden"
                            onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.files[0] }))}
                        />
                    </div>

                    <div className="flex flex-row items-center gap-2">
                        <div className="w-full">
                            <label className="block text-sm mb-1">Employee Id<sup className="text-red-500">*</sup></label>
                            <input
                                type="text"
                                className="w-full px-3 py-1 rounded bg-gray-700 border border-gray-600 focus:outline-none"
                                placeholder="Enter id"
                                value={formData.employeeId}
                                onChange={(e) => setFormData(prev => ({ ...prev, employeeId: e.target.value }))}
                                required
                            />
                        </div>
                        <div className="w-full">
                            <label className="block text-sm mb-1">Name<sup className="text-red-500">*</sup></label>
                            <input
                                type="text"
                                className="w-full px-3 py-1 rounded bg-gray-700 border border-gray-600 focus:outline-none"
                                placeholder="Enter name"
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex flex-row items-center gap-2">

                        <div className="w-full">
                            <label className="block text-sm mb-1">Email<sup className="text-red-500">*</sup></label>
                            <input
                                type="text"
                                className="w-full px-3 py-1 rounded bg-gray-700 border border-gray-600 focus:outline-none"
                                placeholder="Enter email"
                                value={formData.email}
                                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                required
                            />
                        </div>
                        <div className="w-full">
                            <label className="block text-sm mb-1">Mobile<sup className="text-red-500">*</sup></label>
                            <input
                                type="tel"
                                className="w-full px-3 py-1 rounded bg-gray-700 border border-gray-600 focus:outline-none"
                                placeholder="Enter mobile number"
                                value={formData.mobile}
                                onChange={handleMobileChange}
                                required
                            />
                        </div>
                    </div>


                    <div>
                        <label className="block text-sm mb-1">Designation<sup className="text-red-500">*</sup></label>
                        <select
                            className="w-full px-3 py-1 rounded bg-gray-700 border border-gray-600 focus:outline-none"
                            value={formData.designation}
                            onChange={(e) => setFormData(prev => ({ ...prev, designation: e.target.value }))}
                            required
                        >
                            <option value="">Select Designation</option>
                            <option value="HR">HR</option>
                            <option value="Manager">Manager</option>
                            <option value="Sales">Sales</option>
                        </select>
                    </div>

                    <div className="flex flex-row items-center gap-2 flex-wrap sm:gap-5">

                        <div>
                            <label className="block text-sm mb-1">Gender<sup className="text-red-500">*</sup></label>
                            <div className="flex space-x-4">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Male"
                                        onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))}
                                        required
                                    />
                                    <span>Male</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Female"
                                        required
                                        onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))}
                                    />
                                    <span>Female</span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <p className="mb-1">Course<sup className="text-red-500">*</sup></p>
                            <div className="flex flex-row gap-2 items-center">
                                {
                                    checkboxItem.map((item, index) => (
                                        <label key={index} className="flex flex-row gap-1">
                                            <input
                                                type="checkbox"
                                                value={item}
                                                checked={formData?.course?.includes(item)}
                                                onChange={handleCheckboxChange}
                                            />
                                            <span>{item}</span>
                                        </label>
                                    ))
                                }


                            </div>
                        </div>

                        <div className="w-full -mt-3">
                            <label className="block text-sm mb-1">Password<sup className="text-red-500">*</sup></label>
                            <input
                                type="password"
                                className="w-full px-3 py-1 rounded bg-gray-700 border border-gray-600 focus:outline-none"
                                placeholder="Enter password"
                                value={formData.password}
                                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                                required
                            />
                        </div>
                    </div>


                    <div className="flex justify-end space-x-4 pt-4">

                        <button
                            type="button"
                            onClick={() => {
                                onClose();
                                setEmployeeEdit();

                            }}
                            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
                        >
                                Submit
                        </button>
                    </div>
                </form>
                <button
                    onClick={onClose}
                    className="absolute top-2 right-3 text-gray-400 hover:text-white cursor-pointer"
                >
                    X
                </button>
            </div>
        </div>
    );
}
