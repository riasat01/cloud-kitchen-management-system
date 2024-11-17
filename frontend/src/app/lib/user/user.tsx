import { UserInterface } from "@/app/_interfaces/user-interface/UserInterface";
import { baseUrl } from "@/app/_util/BaseURL";

export const registerUser = async (userInfo: UserInterface) => {
    const res = await fetch(`${baseUrl}/users/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
    })
    return res.json();
}

export const loginUser = async (username: string, password: string) => {
    const form_data = new FormData();
    form_data.append('username', username);
    form_data.append('password', password);

    const options = {
        method: 'POST',
        // headers: {
        //     'Content-Type': 'multipart/form-data'
        // },
        body: form_data
    }
    const res = await fetch(`${baseUrl}/token/`, options)
    return res.json()
}

export const getUser = async (token: string) => {
    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    const res = await fetch(`${baseUrl}/users/me/`, options);
    return res.json();
}