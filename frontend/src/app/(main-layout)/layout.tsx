import Children from '@/app/_interfaces/children-interface/Children';
import Navbar from '@/app/(main-layout)/shared-componenets/navbar/Navbar';
import footer from '@/app/(main-layout)/shared-componenets/footer/Footer';
import Footer from '@/app/(main-layout)/shared-componenets/footer/Footer';

const MainLayout = ({children}: Children) => {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
};

export default MainLayout;