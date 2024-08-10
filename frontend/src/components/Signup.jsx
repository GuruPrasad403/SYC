import React, { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { auth, googleSignIn } from "../../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [validationErrors, setValidationErrors] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const navigate = useNavigate();

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!Object.values(validationErrors).some(error => error)) {
            try {
                await createUserWithEmailAndPassword(auth, email, password);
                await signInWithEmailAndPassword(auth, email, password); // Log in the user
                toast.success('Account created and logged in successfully!');
                setTimeout(() => {
                    navigate('/profile');
                }, 2000); // Delay redirection by 2 seconds
            } catch (error) {
                toast.error('Error creating account: ' + error.message);
            }
        } else {
            toast.error('Please fix the errors before submitting.');
        }
    };

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            toast.success('Signed in with Google successfully!');
            setTimeout(() => {
                navigate('/profile');
            }, 2000); // Delay redirection by 2 seconds
        } catch (error) {
            toast.error('Error signing in with Google: ' + error.message);
        }
    };

    const isButtonDisabled = () => {
        return !email || !password || !confirmPassword ||
               validationErrors.email || validationErrors.password || validationErrors.confirmPassword;
    };

    return (
        <div className="flex justify-center items-center w-screen h-screen bg-zinc-900">
            <div className="flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#2b2a2a] rounded-2xl shadow-xl">
                <div className="flex flex-col justify-center mx-auto items-center gap-3 pb-4">
                    <h1 className="text-3xl font-bold text-[#ffffff] sm:text-[#ffffff] my-auto">Sign Up</h1>
                </div>
                <form className="flex flex-col" onSubmit={handleSubmit}>
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

                    <div className="pb-2">
                        <label htmlFor="password" className="block mb-2 text-base font-medium text-[#ffffff]">Password</label>
                        <div className="relative text-black">
                            <div className="relative w-full">
                                <input type={passwordVisible ? "text" : "password"}
                                    onChange={(e) => validatePassword(e.target.value)}
                                    value={password}
                                    name="password" id="password"
                                    className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 py-3 px-4"
                                    placeholder="Password"
                                    autoComplete="off" />
                                <button
                                    type="button"
                                    onClick={() => setPasswordVisible(!passwordVisible)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                                >
                                    <svg
                                        className={`w-5 h-5 ${passwordVisible ? "text-gray-400" : "text-gray-500"}`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d={passwordVisible ? "M15 12h.01M19.071 4.929C17.44 3.298 15.298 2.5 13 2.5s-4.44.798-6.071 2.429S4.5 8.702 4.5 11c0 2.298.798 4.44 2.429 6.071C8.56 19.202 10.702 20 13 20s4.44-.798 6.071-2.429S19.5 13.298 19.5 11c0-2.298-.798-4.44-2.429-6.071zM12 15.5a4.5 4.5 0 110-9 4.5 4.5 0 010 9z" : "M12 4.5C8.13 4.5 4.47 6.92 2.15 10.95C1.4 11.82 1 12.86 1 14C1 15.14 1.4 16.18 2.15 17.05C4.47 21.08 8.13 23.5 12 23.5C15.87 23.5 19.53 21.08 21.85 17.05C22.6 16.18 23 15.14 23 14C23 12.86 22.6 11.82 21.85 10.95C19.53 6.92 15.87 4.5 12 4.5Z"}
                                        />
                                    </svg>
                                </button>
                            </div>
                            {password && validationErrors.password && <p className="text-[#ff5e5e]">{validationErrors.password}</p>}
                        </div>
                    </div>

                    <div className="pb-2">
                        <label htmlFor="confirmPassword" className="block mb-2 text-base font-medium text-[#ffffff]">Confirm Password</label>
                        <div className="relative text-black">
                            <div className="relative w-full">
                                <input type="password"
                                    onChange={(e) => validateConfirmPassword(e.target.value)}
                                    value={confirmPassword}
                                    name="confirmPassword" id="confirmPassword"
                                    className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 py-3 px-4"
                                    placeholder="Confirm Password"
                                    autoComplete="off" />
                            </div>
                            {confirmPassword && validationErrors.confirmPassword && <p className="text-[#ff5e5e]">{validationErrors.confirmPassword}</p>}
                        </div>
                    </div>

                    <button type="submit"
                        disabled={isButtonDisabled()}
                        className="py-3 px-6 text-center rounded-lg bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 text-white font-bold hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Sign Up
                    </button>
                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="py-3 px-6 mt-3 text-center rounded-lg bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 text-white font-bold hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Sign Up with Google
                    </button>
                </form>
            </div>
            <Toaster />
        </div>
    );
}
