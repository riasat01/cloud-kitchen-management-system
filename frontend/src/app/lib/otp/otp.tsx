import { baseUrl } from "@/app/_util/BaseURL";
import { getToken } from "@/app/_util/token"

export const getOTP = async () => {
    const token = getToken();
    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    const res = await fetch(`${baseUrl}/otp/`, options);
    return res.json();
}

export const verifyOTP = async (otp: string) => {
    const token = getToken();
    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({otp: otp})
    }
    const res = await fetch(`${baseUrl}/otp/verify/`, options);
    return res.json();
}