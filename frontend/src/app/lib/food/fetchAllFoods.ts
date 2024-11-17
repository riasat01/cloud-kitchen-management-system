import { baseUrl } from "@/app/_util/BaseURL";
import { headers } from "next/headers";

export async function fetchAllFoods (){
    const res = await fetch(`${baseUrl}/food/`);
    return res?.json();
}

export async function fetchRestaurantFood (restaurant_id: number, token: string){
    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    const res = await fetch(`${baseUrl}/food/${restaurant_id}`);
    return res.json();
}
