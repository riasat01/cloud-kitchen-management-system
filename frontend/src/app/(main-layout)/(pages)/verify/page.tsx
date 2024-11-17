"use client"

import { getOTP, verifyOTP } from "@/app/lib/otp/otp";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

const VerifyOTP = () => {
    const router = useRouter();
    const [error, setError] = useState<boolean>(false);
    const confirmOTP = async (e: FormEvent<HTMLFormElement>) => {
        e?.preventDefault();
        const form = e?.target as any;
        const otp = form?.otp?.value;
        console.log(otp);
        const user = await verifyOTP(otp)
        console.log(user);
        if(user?.is_active){
            setError(false);
            router.push('/user-profile');
        }else{
            setError(true);
        }
    }
    const handleOTP = () => {
        getOTP()
        .then(res => console.log(res))
    }
    useEffect(() => {
        handleOTP()
    }, [])
    return (
        <section className="px-8 md:px-0 w-full md:w-1/2 lg:w-1/4 text-center">
            <section className="text-red-500">
                {error && "Invalid OTP! Please try again"}
            </section>
            <form onSubmit={confirmOTP}>
                <input type="text" name="otp" id="Otp" placeholder="Enter the OTP" />
                <input type="submit" value="verify" />
            </form>
            <button onClick={handleOTP}>Resend OTP</button>
        </section>
    );
};

export default VerifyOTP;