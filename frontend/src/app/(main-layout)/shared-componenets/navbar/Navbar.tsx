import Link from "next/link";
import NavButton from "../nav-button/NavButton";


const Navbar = () => {
    const navlinks = <>
        <li>
            <Link href='/'>Home</Link>
        </li>
        {/* <li className="md:hidden">
            <Link href='/category'>Food Category</Link>
            <ul className="p-2">
                <li><Link href='/category/1'>Food Category 1</Link></li>
                <li><Link href='/category/2'>Food Category 2</Link></li>
            </ul>
        </li> */}
        {/* <li>
        <details className="hidden md:block">
          <summary><Link href='/category'>Food Category</Link></summary>
          <ul className="p-2">
          <li><Link href='/category/1'>Food Category 1</Link></li>
                <li><Link href='/category/2'>Food Category 2</Link></li>
          </ul>
        </details>
        </li> */}
        <li>
            <Link href='/restaurants'>Restaurants</Link>
        </li>
        <li>
            <Link href='/food'>Food</Link>
        </li>
        <li>
            <Link href='/register-restaurant'>Resgister Restaurant</Link>
        </li>
        {/* <li>
            <Link href='/about'>About</Link>
        </li> */}
    </>
    return (
        <>
            <section className="navbar bg-base-100">
                <section className="navbar-start">
                    <section className="dropdown">
                        <section tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </section>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navlinks}
                        </ul>
                    </section>
                    <Link href='/' className="btn btn-ghost text-xl">Khabar Bilai</Link>
                </section>
                <section className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navlinks}
                    </ul>
                </section>
                <section className="navbar-end">
                    {/* <Link href='/login' className="btn">Login</Link> */}
                    <NavButton />
                </section>
            </section>
        </>
    );
};

export default Navbar;