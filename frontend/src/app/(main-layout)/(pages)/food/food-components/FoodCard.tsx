import { FoodInterface } from "@/app/_interfaces/food-interface/FoodInterface";
import Image from "next/image";


const FoodCard = ({ food }: {food: FoodInterface}) => {
    const {food_name, food_image, price, ratings, number_of_raters, restaurant} = food;
    return (
        <section className="card card-compact bg-base-100 shadow-xl h-96">
            <figure className="h-1/2 w-full relative"><Image width={500} height={500} className="h-full w-full" src={food_image} alt={`Image of ${food_name}`} /></figure>
            <section className="card-body h-1/2">
                <h2 className="card-title">{food_name}</h2>
                <p>Ratings: {ratings}({number_of_raters})</p>
                <p>Price: {price}</p>
                <p>Restaurant: {restaurant}</p>
                <section className="card-actions justify-end">
                    <button className="btn btn-primary">Order Now</button>
                </section>
            </section>
        </section>
    );
};

export default FoodCard;