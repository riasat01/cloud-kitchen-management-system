import { fetchAllRestaurants } from "@/app/lib/restaurant/allRestaurant";
import RestaurantCard from "./restaurant-components/RestaurantCard";
import { RestaurantInterface } from "@/app/_interfaces/restaurant-interface/RestaurantInterface";



const RestaurantPage = async () => {
    const restaurants = await fetchAllRestaurants()
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg mx-8 md:mx-16 lg:mx-24 my-24">
            {
                restaurants?.map((restaurant: RestaurantInterface) => <RestaurantCard key={restaurant?.id} restaurant={restaurant} />)
            }
        </section>
    );
};

export default RestaurantPage;