"use client";

import Modal from "./Modal";

import { useState } from "react";
import { useRouter } from "next/navigation";


import useSignupModal from "@/app/hooks/useSignupModal";
import CustomButton from "../forms/CustomButton";
import apiService from "@/app/services/apiService";
import { handleLogin } from "@/app/lib/actions";


const SignupModal = () =>{

    //
    // Variables
    const router = useRouter();
    const SignupModal = useSignupModal();
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [errors, setErrors] = useState<string[]>([]);

    //
    // Functions
    const submitSignup = async () => {
        const formData ={
            email: email,
            password1: password1,
            password2: password2
        }
        const response = await apiService.postWithoutToken('/api/auth/register/', JSON.stringify(formData));
        if (response.access) {
            handleLogin(response.user.pk, response.access, response.refresh);
            SignupModal.close();
            router.push('/');
        }else
        {
            const temErrors: string[] = Object.values(response).map((error: any) => {   
                return error;
            });
            setErrors(temErrors);
        }
    }
    const content = (
        <>
            <form 
            action={submitSignup}
            className="space-y-4">
                <input onChange={(e) => setEmail(e.target.value)} placeholder="Your email address" type="email" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"/>
                <input onChange={(e) => setPassword1(e.target.value)} placeholder="Your password" type="password" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"/>
                <input onChange={(e) => setPassword2(e.target.value)} placeholder="Repeat Your password" type="password" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"/>

                {errors.map((error, index) => {
                    return(
                        <div
                        key={`error-${index}`}
                        className="p-5 bg-airbnb text-white rounded-xl opacity-80">
                          {error}
                        </div>
                    )
                })}
                
                <CustomButton
                label="Submit"
                onClick={submitSignup}
                />
            </form>
        </>
    )
    return (
        <Modal
        isOpen={SignupModal.isOpen}
        close= {SignupModal.close}
        label="Signup"
        content={content}/>
    )
}
export default SignupModal;