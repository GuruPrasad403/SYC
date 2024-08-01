
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import React, { useRef } from 'react';
import { useRecoilState } from 'recoil';
import { ProfileUpdateAtmon } from '../atoms/atom';

export default function Profile() {
    const[userData,setUserData] = useRecoilState(ProfileUpdateAtmon)
    const firstName =  useRef();
    const lastName =  useRef();
    const email =  useRef();
    const rollNo =  useRef();
    const Class =  useRef();
    const section =  useRef();
    const courseStream =  useRef();
    
const upDateDataIntoFirebase = (e)=>{
    e.preventDefault();
    console.log(userData);
    setUserData((E)=>{
          return  [...E,{
                firstName:firstName.current.value,
                lastName:lastName.current.value,
                email:email.current.value,
                rollNo:rollNo.current.value,
                courseStream:courseStream.current.value,
                Class:Class.current.value,
                section:section.current.value
            }]
    })
    console.log(userData)
}

  return (
    <>
    <div className='flex bg-zinc-800 w-screen h-screen justify-center items-center sm:p-12  ' >
      
    <form className='bg-zinc-600 p-10 sm:rounded-2xl  ' onSubmit={upDateDataIntoFirebase}>
      <div className="space-y-12">

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-white">Personal Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-white">
                First name
              </label>
              <div className="mt-2">
                <input
                  id="first-name"
                  ref={firstName}
                  name="first-name"
                  type="text"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-white">
                Last name
              </label>
              <div className="mt-2">
                <input
                  id="last-name"
                  name="last-name"
                  ref={lastName}
                  type="text"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  ref={email}
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            
            <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-white">
                Roll No
              </label>
              <div className="mt-2">
                <input
                  id="street-address"
                  name="street-address"
                  ref={rollNo}
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-white">
                Class
              </label>
              <div className="mt-2">
                <input
                  id="Roll No"
                  name="Roll No"
                  ref={Class}
                  type="number"
                  className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="region" className="block text-sm font-medium leading-6 text-white">
                    Section
              </label>
              <div className="mt-2">
                <input
                  id="region"
                  name="region"
                  ref={section}
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-white">
                Course/Streem
              </label>
              <div className="mt-2">
                <input
                  id="postal-code"
                  name="postal-code"
                  ref={courseStream}
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-white">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-zinc-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-zinc-200 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>

    </div>
  </>
    )
}