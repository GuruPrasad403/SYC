// import { ref } from "react";
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
export default function Login(){
    const [value, setValue] = useState(false)
    const mailRef = useRef()
    const password = useRef();
    const type = useRef("password");
    const [visible, setVisible] =  useState(false)
    const navigator = useNavigate();
    const signIn = (e)=>{
        e.preventDefault();
        console.log(mailRef.current.value,password.current.value)

    }

    return(
        <>
        <div className="flex justify-center items-center w-screen h-screen bg-zinc-800">
            
            
        <div className="flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#3e3d3d] rounded-2xl shadow-xl">
    <div className="flex flex-row gap-3 pb-4">
        
        <h1 className="text-3xl text-center font-bold text-[#d3d7dd] my-auto">ACE SYNC</h1>
    </div>
    <div className="text-2xl  text-[#76797e] pb-8">LOGIN</div>
    <form className="flex flex-col">
        <div className="pb-2">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-[#ffffff]">Email</label>
            <div className="relative text-gray-400">
                <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail">
                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                </span>
                <input type="email" name="name" id="name" className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4" placeholder="example@gmail.com" autoComplete="off" />
            </div>
        </div>
        <div className="pb-6">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-[#ffffff]">Password</label>
            <div className="relative text-gray-400" ref={password}>
                <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-asterisk"
                    onClick={(e)=>{
                           if(visible){
                             password.current.style.color="Black"
                             type.current.setAttribute('type',"text")
                             setVisible(false)
                            }
                           else{
                             password.current.style.color="gray"
                            type.current.setAttribute('type',"password")
                            setVisible(true)
                           }

                    }}
                    >
                        <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                        <path d="M12 8v8"></path>
                        <path d="m8.5 14 7-4"></path>
                        <path d="m8.5 10 7 4"></path>
                    </svg>
                </span>
                <input type={type} ref={type} name="password" id="password" placeholder="••••••••••" className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4" autoComplete="new-password" aria-autocomplete="list" />
            </div>
        </div>
        <button type="submit" className="w-full hover:bg-zinc-600 hover:text-balck text-[#ffffff] bg-[#232327] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6">Login</button>
        <div className="flex flex-cols justify-evenly items-Center">
        <div className="text-sm font-light text-[#a6a8ac]">Don't have an account yet? <a 
         className="font-medium text-[#ffffff] hover:underline hover:cursor-pointer"
         onClick={()=>{
            navigator("/signup")
         }}
         >Sign Up</a></div>
         <div className="text-sm font-light text-[#a6a8ac]">Forget Password? <a 
         className="font-medium text-[#ffffff] hover:underline hover:cursor-pointer"
         onClick={()=>{
            navigator("/forgetpassword")
         }}
         >Click Here</a></div>
        </div>
    </form>
    <div className="relative flex py-8 items-center">
        <div className="flex-grow border-t border-[1px] border-gray-200"></div>
        <span className="flex-shrink mx-4 font-medium text-gray-500">OR</span>
        <div className="flex-grow border-t border-[1px] border-gray-200"></div>
    </div>
    <form>
        <div className="flex flex-row gap-2 justify-center">
            <button className="flex flex-row w-32 gap-2 hover:bg-white hove:text-black bg-gray-600 p-2 rounded-md text-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6" viewBox="0 0 488 512"><path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/></svg>
                <span className="font-medium ml-0 hover:text-black"> Google</span>
            </button>
        </div>
    </form>
</div>

 
 </div>     
   </>
    );
}