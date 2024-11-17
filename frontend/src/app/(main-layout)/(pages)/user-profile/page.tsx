"use client"

import { UserInterface } from "@/app/_interfaces/user-interface/UserInterface";
import { getToken } from "@/app/_util/token";
import { getUser } from "@/app/lib/user/user";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UserProfile = () => {
    const router = useRouter();
    const [user, setUser] = useState<UserInterface>();
    useEffect(() => {
        const token: string = getToken() as string;
        if(!token){
            router.push('/');
        }
        getUser(token)
            .then(res => {
                console.log(res?.detail);
                if(res?.is_active == false){
                    router.push('/verify');
                }else if(res?.detail == "Could not validate credentials"){
                    router.push('/');
                }
                setUser(res);
            })
    }, [router])
    return (
        <div className="flex flex-col md:flex-row justify-between items-center px-8 md:px-12 lg:px-24">
            <Image className="w-full md:w-1/2 rounded-full" src={user?.photo_url as string} alt={`image of ${user?.full_name}`} height={500} width={500} />
            <section>
                <h2>Name: {user?.full_name}</h2>
                <p>Email: {user?.email}</p>
                <p>Division: {user?.division}</p>
                <p>District: {user?.district}</p>
                <p>Address: {user?.address}</p>
                <p>Phone: {user?.phone}</p>
            </section>
        </div>
    );
};

export default UserProfile;