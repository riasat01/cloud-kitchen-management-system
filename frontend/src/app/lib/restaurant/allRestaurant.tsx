import { baseUrl } from "@/app/_util/BaseURL";

export async function fetchAllRestaurants() {
    const res = await fetch(`${baseUrl}/restaurant/`);
    return res?.json();
}

export async function fetchRestaurantByDistrict(id: number) {
    const res = await fetch(`${baseUrl}/restaurant/${id}`);
    return res?.json();
}

// export async function fetchRestaurantById(if)