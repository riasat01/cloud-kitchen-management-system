import { RestaurantInterface } from '@/app/_interfaces/restaurant-interface/RestaurantInterface';
import { fetchRestaurantByDistrict } from '@/app/lib/restaurant/allRestaurant';
import React from 'react';
import RestaurantCard from '../restaurant-components/RestaurantCard';

type resD = {
    district: string
}


const RestaurantByDistrict = async ({ params }: { params: resD }) => {
    const restaurants = await fetchRestaurantByDistrict(params?.district)
    // console.log(props);
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg mx-8 md:mx-16 lg:mx-24 my-24">
            {
                restaurants?.map((restaurant: RestaurantInterface) => <RestaurantCard key={restaurant?.id} restaurant={restaurant} />)
            }
        </div>
    );
};

export default RestaurantByDistrict;