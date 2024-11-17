import banner from "../../../../../../public/banner1.png"

const Banner = () => {
    return (
        <section className="hero min-h-screen" style={{ backgroundImage: `url(/banner1.png)` }}>
            <section className="hero-overlay bg-opacity-60"></section>
            <section className="hero-content text-center text-neutral-content">
                <section className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Welcome to Khabar Bilai</h1>
                    <p className="mb-5">Indulge in Bangladesh&aposs culinary delights with our sectionerse restaurant selection, delivering mouthwatering dishes straight to your doorstep. From classic comfort foods to gourmet specialties, we offer something for every craving. Experience the convenience and quality of restaurant meals from the comfort of your home with just a few clicks.
                    </p>
                    <button className="btn btn-primary">Get Started</button>
                </section>
            </section>
        </section>
    );
};

export default Banner;