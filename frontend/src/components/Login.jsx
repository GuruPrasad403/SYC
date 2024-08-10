import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleSignIn } from '../../config/firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);
    const [failedAttempts, setFailedAttempts] = useState(0);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [blockTimer, setBlockTimer] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        // Clear block timer and failedAttempts on successful login
        const notification = localStorage.getItem('notification');
        if (notification) {
            toast.success(notification);
            localStorage.removeItem('notification');
        }
    }, []);

    useEffect(() => {
        let timer;
        let countdownNotification;

        if (blockTimer > 0) {
            if (Notification.permission === 'granted') {
                countdownNotification = new Notification('Account Blocked', {
                    body: `Your account is blocked. Please wait ${blockTimer} seconds.`,
                    icon: '/path/to/icon.png', // Replace with actual path to an icon
                    requireInteraction: true // Keeps the notification on screen until manually dismissed
                });

                // Update the notification every second
                timer = setInterval(() => {
                    setBlockTimer((prev) => {
                        const newTime = prev - 1;
                        if (newTime > 0 && countdownNotification) {
                            countdownNotification.body = `Your account is blocked. Please wait ${newTime} seconds.`;
                        } else {
                            countdownNotification.close();
                            clearInterval(timer);
                        }
                        return newTime;
                    });
                }, 1000);
            }
        }

        return () => {
            if (timer) {
                clearInterval(timer);
            }
            if (countdownNotification) {
                countdownNotification.close();
            }
        };
    }, [blockTimer]);

    useEffect(() => {
        if (blockTimer === 0 && failedAttempts >= 3) {
            setFailedAttempts(0);
        }
    }, [blockTimer]);

    const validatePassword = (password) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasDigit = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*]/.test(password);
        return password.length >= minLength && hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar;
    };

    const handleEmailChange = (e) => {
        const email = e.target.value;
        setEmail(email);
        setIsEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
    };

    const handlePasswordChange = (e) => {
        const password = e.target.value;
        setPassword(password);
        setIsPasswordValid(validatePassword(password));
    };

    const loginFun = async (e) => {
        e.preventDefault();
        if (failedAttempts >= 3) {
            toast.error(`Your account is blocked. Please wait ${blockTimer} seconds.`);
            return;
        }
        try {
            await signInWithEmailAndPassword(auth, email, password);
            localStorage.setItem('notification', 'Logged in successfully!');
            toast.success('Logged in successfully!');
            navigate("/mainpage");
        } catch (err) {
            setFailedAttempts((prev) => prev + 1);
            if (failedAttempts >= 2) {
                setBlockTimer(30); // Start 30-second block
                new Notification('Login Failed', {
                    body: 'Incorrect password. Your account is now blocked for 30 seconds.',
                    icon: '/path/to/icon.png', // Path to an icon image
                    requireInteraction: true
                });
            }
            toast.error('Invalid email or password.');
            console.error(err);
        }
    };

    const googleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithPopup(auth, googleSignIn);
            toast.success('Logged in with Google successfully!');
            navigate("/mainpage");
        } catch (err) {
            toast.error('Google sign-in failed.');
            console.error(err);
        }
    };

    const requestNotificationPermission = async () => {
        if (Notification.permission === 'default') {
            try {
                await Notification.requestPermission();
            } catch (err) {
                console.error('Notification permission request failed:', err);
            }
        }
    };

    useEffect(() => {
        requestNotificationPermission();
    }, []);

    const isFormValid = isEmailValid && isPasswordValid;
    const isButtonDisabled = !isFormValid || blockTimer > 0;

    return (
        <>
            <div className="flex justify-center items-center w-screen h-screen bg-zinc-800">
                <div className="flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#3e3d3d] rounded-2xl shadow-xl">
                    <div className="flex flex-row gap-3 pb-4">
                        <h1 className="text-3xl text-center font-bold text-[#d3d7dd] my-auto">ACE SYNC</h1>
                    </div>
                    <div className="text-2xl text-[#76797e] pb-8">LOGIN</div>
                    <form className="flex flex-col" onSubmit={loginFun}>
                        <div className="pb-2">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-[#ffffff]">Email</label>
                            <div className="relative text-gray-400">
                                <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail">
                                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                    </svg>
                                </span>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    onChange={handleEmailChange}
                                    className={`pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4 ${!isEmailValid && 'border-red-500'}`}
                                    placeholder="example@gmail.com"
                                    autoComplete="off"
                                />
                            </div>
                            {!isEmailValid && <div className="text-red-500 text-sm">Invalid email format</div>}
                        </div>
                        <div className="pb-6">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-[#ffffff]">Password</label>
                            <div className="relative text-gray-400">
                                <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye" onClick={() => setVisible(!visible)}>
                                        <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                                        <path d="m12 8v8"></path>
                                        <path d="m8.5 14 7-4"></path>
                                        <path d="m8.5 10 7 4"></path>
                                    </svg>
                                </span>
                                <input
                                    type={visible ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    onChange={handlePasswordChange}
                                    className={`pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4 ${!isPasswordValid && 'border-red-500'}`}
                                />
                            </div>
                            {!isPasswordValid && <div className="text-red-500 text-sm">Password must be at least 8 characters, contain an uppercase letter, a lowercase letter, a digit, and a special character.</div>}
                        </div>
                        <div className="flex justify-between">
                            <button
                                type="submit"
                                disabled={isButtonDisabled}
                                className={`w-full px-4 py-2 text-white font-bold rounded-lg ${isButtonDisabled ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                            >
                                Login
                            </button>
                        </div>
                        <div className="flex justify-between mt-4">
                            <button onClick={googleLogin} className="text-sm text-blue-500">Sign in with Google</button>
                            <a href="#" className="text-sm text-blue-500">Forgot Password?</a>
                        </div>
                    </form>
                    <Toaster />
                </div>
            </div>
        </>
    );
};

export default Login;
