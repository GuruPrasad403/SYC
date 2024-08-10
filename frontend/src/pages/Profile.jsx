import React, { useState } from "react";
import { toast } from 'react-toastify';

export default function SignUp() {
    const [name, setName] = useState('');
    const [rollNo, setRollNo] = useState('');
    const [department, setDepartment] = useState('');
    const [semester, setSemester] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const [validationErrors, setValidationErrors] = useState({
        name: '',
        rollNo: '',
        department: '',
        semester: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const validateName = (value) => {
        if (value.length > 0 && (/[^a-zA-Z\s]/.test(value) || value.length < 2)) {
            setValidationErrors(prev => ({ ...prev, name: 'Minimum 2 chars and no special characters allowed' }));
        } else {
            setValidationErrors(prev => ({ ...prev, name: '' }));
        }
        setName(value);
    };

    const validateRollNo = (value) => {
        if (value.length > 0 && (/[^a-zA-Z0-9]/.test(value) || value.length < 8 || value.length > 15)) {
            setValidationErrors(prev => ({ ...prev, rollNo: 'Minimum 8 chars and no special characters allowed' }));
        } else {
            setValidationErrors(prev => ({ ...prev, rollNo: '' }));
        }
        setRollNo(value);
    };

    const validateDepartment = (value) => {
        if (value.length > 0 && (/[^a-zA-Z\s]/.test(value) || value.length < 2)) {
            setValidationErrors(prev => ({ ...prev, department: 'Minimum 2 chars and no special characters allowed' }));
        } else {
            setValidationErrors(prev => ({ ...prev, department: '' }));
        }
        setDepartment(value);
    };

    const validatePhoneNumber = (value) => {
        if (value.length > 0 && !/^[6-9]\d{9}$/.test(value)) {
            setValidationErrors(prev => ({ ...prev, phoneNumber: 'Please enter a valid Indian phone number' }));
        } else {
            setValidationErrors(prev => ({ ...prev, phoneNumber: '' }));
        }
        setPhoneNumber(value);
    };

    const validateEmail = (value) => {
        if (value.length > 0 && !/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value)) {
            setValidationErrors(prev => ({ ...prev, email: 'Please enter a valid Gmail address' }));
        } else {
            setValidationErrors(prev => ({ ...prev, email: '' }));
        }
        setEmail(value);
    };

    const validatePassword = (value) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(value)) {
            setValidationErrors(prev => ({ ...prev, password: 'Password must be at least 8 characters long and include uppercase, lowercase, digit, and special character' }));
        } else {
            setValidationErrors(prev => ({ ...prev, password: '' }));
        }
        setPassword(value);
    };

    const validateConfirmPassword = (value) => {
        if (value !== password) {
            setValidationErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
        } else {
            setValidationErrors(prev => ({ ...prev, confirmPassword: '' }));
        }
        setConfirmPassword(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!Object.values(validationErrors).some(error => error)) {
            // Submit form logic
            toast.success('Form submitted successfully!');
            console.log({
                name,
                rollNo,
                department,
                semester,
                phoneNumber,
                email,
                password
            });
        } else {
            toast.error('Please fix the errors before submitting.');
        }
    };

    const isButtonDisabled = () => {
        return !name || !rollNo || !department || !semester || !phoneNumber || !email ||
               validationErrors.name || validationErrors.rollNo || validationErrors.department || validationErrors.semester || validationErrors.phoneNumber || validationErrors.email ;
    };

    return (
        <div className="flex items-center justify-center w-screen h-screen bg-zinc-900">
        <div className="flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#2b2a2a] rounded-2xl shadow-xl">
            <div className="flex flex-col justify-center mx-auto items-center gap-3 pb-4">
                <h1 className="text-3xl font-bold text-[#ffffff] sm:text-[#ffffff] my-auto">Studet Profile</h1>
            </div>
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <div className="pb-2">
                    <label htmlFor="name" className="block mb-2 text-base font-medium text-[#ffffff]">Name</label>
                    <div className="relative text-gray-400">
                        <input type="text"
                            onChange={(e) => validateName(e.target.value)}
                            value={name}
                            name="name" id="name"
                            className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4"
                            placeholder="Your Name"
                            autoComplete="off" />
                        {name && validationErrors.name && <p className="text-[#ff5e5e]">{validationErrors.name}</p>}
                    </div>
                </div>

                <div className="pb-2">
                    <label htmlFor="rollNo" className="block mb-2 text-base font-medium text-[#ffffff]">USI/UUSMS</label>
                    <div className="relative text-black">
                        <input type="text"
                            onChange={(e) => validateRollNo(e.target.value)}
                            value={rollNo}
                            name="rollNo" id="rollNo"
                            className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4"
                            placeholder="USI/UUCSM"
                            autoComplete="off" />
                        {rollNo && validationErrors.rollNo && <p className="text-[#ff5e5e]">{validationErrors.rollNo}</p>}
                    </div>
                </div>

                <div className="pb-2">
                    <label htmlFor="department" className="block mb-2 text-base font-medium text-[#ffffff]">Department</label>
                    <div className="relative text-black">
                        <input type="text"
                            onChange={(e) => validateDepartment(e.target.value)}
                            value={department}
                            name="department" id="department"
                            className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4"
                            placeholder="Department"
                            autoComplete="off" />
                        {department && validationErrors.department && <p className="text-[#ff5e5e]">{validationErrors.department}</p>}
                    </div>
                </div>

                <div className="pb-2">
                    <label htmlFor="semester" className="block mb-2 text-base font-medium text-[#ffffff]">Semester</label>
                    <div className="relative text-black">
                        <select
                            id="semester"
                            value={semester}
                            onChange={(e) => setSemester(e.target.value)}
                            className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4"
                        >
                            <option value="">Select Semester</option>
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                <option key={num} value={num}>{num}</option>
                            ))}
                        </select>
                        {semester && validationErrors.semester && <p className="text-[#ff5e5e]">{validationErrors.semester}</p>}
                    </div>
                </div>

                <div className="pb-2">
                    <label htmlFor="phoneNumber" className="block mb-2 text-base font-medium text-[#ffffff]">Phone Number</label>
                    <div className="relative text-black">
                        <input type="text"
                            onChange={(e) => validatePhoneNumber(e.target.value)}
                            value={phoneNumber}
                            name="phoneNumber" id="phoneNumber"
                            className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4"
                            placeholder="Phone Number"
                            autoComplete="off" />
                        {phoneNumber && validationErrors.phoneNumber && <p className="text-[#ff5e5e]">{validationErrors.phoneNumber}</p>}
                    </div>
                </div>

                <div className="pb-2">
                    <label htmlFor="email" className="block mb-2 text-base font-medium text-[#ffffff]">Email</label>
                    <div className="relative text-black">
                        <input type="email"
                            onChange={(e) => validateEmail(e.target.value)}
                            value={email}
                            name="email" id="email"
                            className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4"
                            placeholder="Your Email"
                            autoComplete="off" />
                        {email && validationErrors.email && <p className="text-[#ff5e5e]">{validationErrors.email}</p>}
                    </div>
                </div>

                <button
    type="submit"
    disabled={isButtonDisabled()}
    className={`text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors duration-300 ease-in-out ${isButtonDisabled() ? 'opacity-50 cursor-not-allowed' : ''}`}
>
    Create Account
</button>

            </form>
        </div>
        </div>
    );
}
