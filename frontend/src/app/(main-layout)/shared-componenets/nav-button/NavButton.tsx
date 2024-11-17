"use client"

import { getToken, removeToken } from "@/app/_util/token";
import Link from "next/link";
import { useEffect, useState } from "react";


const NavButton = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const handleLogout = () => {
        removeToken();
        setIsLoggedIn(false);
    }
    useEffect(() => {
        const token = getToken();
        if(token){
            setIsLoggedIn(true);
        }else{
            setIsLoggedIn(false);
        }
    }, [isLoggedIn])
    return (
        <div>
            {
                isLoggedIn ?
                <button onClick={handleLogout} className="btn">Logout</button>
                :
                <Link href='/login' className="btn">Login</Link>
            }
        </div>
    );
};

export default NavButton;