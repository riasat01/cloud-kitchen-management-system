import { fetchAllFoods } from "@/app/lib/food/fetchAllFoods";
import { FoodInterface } from "@/app/_interfaces/food-interface/FoodInterface";
import FoodCard from "./food-components/FoodCard";


const FoodPage = async () => {
    const foods = await fetchAllFoods();
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 rounded-lg mx-8 md:mx-16 lg:mx-24 my-24">
            {
                foods?.map((food: FoodInterface) => <FoodCard key={food?.id} food={food} />)
            }
        </section>
    );
};

export default FoodPage;