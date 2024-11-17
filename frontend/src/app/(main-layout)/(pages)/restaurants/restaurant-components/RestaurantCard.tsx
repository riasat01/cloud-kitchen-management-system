import { RestaurantInterface } from "@/app/_interfaces/restaurant-interface/RestaurantInterface";
import Image from "next/image";

const RestaurantCard = ({ restaurant }: { restaurant: RestaurantInterface }) => {
    const {id, restaurant_name, restaurant_address, cover_photo, district, ratings, number_of_raters} = restaurant;
    return (
        <section className="card lg:card-side bg-base-100 shadow-xl h-full w-full">
            <figure><Image src={cover_photo} className="h-64 lg:h-full w-full lg:w-64" alt="Album" width={500} height={500} /></figure>
            <section className="card-body">
                <h2 className="card-title">{restaurant_name}</h2>
                <p>{restaurant_address}</p>
                <p>ratings: {ratings}({number_of_raters})</p>
                <section className="card-actions justify-end">
                    <button className="btn btn-primary">Visit</button>
                </section>
            </section>
        </section>
    );
};

export default RestaurantCard;