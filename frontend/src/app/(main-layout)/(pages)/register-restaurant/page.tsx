

const RestaurantRegistrationPage = () => {
    return (
        <div className="my-24">
            <form className="md:mx-auto px-8 md:px-0 w-full md:w-2/3 lg:w-1/2 space-y-4">
                <h1 className="w-full text-4xl text-white font-bold text-center py-8 bg-gradient-to-tr from-blue-700 to-blue-900 rounded-xl">Register Restaurant</h1>
                <input className="w-full p-2 rounded-xl bg-transparent border-2" type="text" name="name" placeholder="Restaurant Name" id="" />
                <input className="w-full p-2 rounded-xl bg-transparent border-2" type="text" name="address" placeholder="Restaurant Address" id="" />
                <select className="w-full p-2 rounded-xl bg-transparent border-2" name="division" id="">
                    <option value="Dhaka">Dhaka</option>
                    <option value="Chatogram">Chatogram</option>
                    <option value="Rajshahi">Rajshahi</option>
                    <option value="Sylhet">Sylhet</option>
                    <option value="Khulna">Khulna</option>
                    <option value="Barisal">Barisal</option>
                    <option value="Mymensyngh">Mymensyngh</option>
                    <option value="Rangpur">Rangpur</option>
                </select>
                <input className="w-full p-2 rounded-xl bg-transparent border-2" type="text" name="photoURL" placeholder="Photo URL" id="" />
                <input className="w-full p-2 rounded-xl bg-transparent border-2" type="email" name="email" placeholder="Restaurant Email" id="" />
                <input className="w-full p-2 rounded-xl bg-transparent border-2" type="password" name="password" placeholder="Password" id="" />
                <input className="w-full hover:m-1 p-2 text-white font-medium rounded-xl bg-gradient-to-tr from-blue-700 to-blue-900 hover:from-blue-900 hover:to-blue-950" type="button" value="Register" />
            </form>
        </div>
    );
};

export default RestaurantRegistrationPage;