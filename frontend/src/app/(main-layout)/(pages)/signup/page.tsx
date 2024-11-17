"use client"
import { UserInterface } from "@/app/_interfaces/user-interface/UserInterface";
import { getImageURL } from "@/app/_util/getImageURL";
import { registerUser } from "@/app/lib/user/user";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";


const SignUpPage = () => {
    const router = useRouter();
    const [image, setImage] = useState<string>("");
    const handleUserRegistration = async (e: FormEvent<HTMLFormElement>) => {
        e?.preventDefault();
        // console.log('sign up clicked');
        const form = e?.target as any;
        const full_name = form?.name?.value;
        const email = form?.email?.value;
        const password = form?.password?.value;
        const division = form?.division?.value;
        const district = form?.district?.value;
        const address = form?.address?.value;
        const phone = form?.phone?.value;
        const photo = form?.photo?.files[0];
        // console.log(photo);
        const photoURL = await getImageURL(photo);
        console.log(photoURL.data.display_url);
        const userInfo: UserInterface = {
            full_name,
            email,
            password,
            division,
            district,
            address,
            photo_url: photoURL.data.display_url,
            phone
        }
        const res = await registerUser(userInfo);
        console.log(res);
        // const res_t = await loginUser(email, password);
        // console.log(res_t, res_t?.access_token);
        // setToken(res?.access_token);
        router.push('/login');
    }
    return (
        <section className="flex flex-col md:flex-row gap-6 my-24 md:mx-auto px-8 md:px-0 w-full md:w-2/3 lg:w-1/2">
            {
                image && <Image className="h-full w-1/2" src={image} width={900} height={900} alt="image" />
            }
            <div className="">
            <form onSubmit={handleUserRegistration} className="space-y-4">
                <h1 className="w-full text-4xl text-white font-bold text-center py-8 bg-gradient-to-tr from-blue-700 to-blue-900 rounded-xl">Sign Up</h1>
                <input className="w-full p-2 rounded-xl bg-transparent border-2" type="text" name="name" placeholder="Name" id="Name" />
                <input className="w-full p-2 rounded-xl bg-transparent border-2" type="file" name="photo" placeholder="Photo" id="Photo" onChange={(e) => setImage(e?.target?.files ? URL.createObjectURL(e.target.files[0]): "")} />
                <input className="w-full p-2 rounded-xl bg-transparent border-2" type="text" name="division" placeholder="Divisiion" id="Division" />
                <input className="w-full p-2 rounded-xl bg-transparent border-2" type="text" name="district" placeholder="District" id="District" />
                <input className="w-full p-2 rounded-xl bg-transparent border-2" type="text" name="address" placeholder="Address" id="Address" />
                <div className="w-full flex gap-2">
                    <div className="w-1/6 p-2 rounded-xl bg-transparent border-2">+880</div>
                    <input className="w-full p-2 rounded-xl bg-transparent border-2" type="text" name="phone" placeholder="Phone" id="Phone" />
                </div>
                <input className="w-full p-2 rounded-xl bg-transparent border-2" type="email" name="email" placeholder="Email" id="Email" />
                <input className="w-full p-2 rounded-xl bg-transparent border-2" type="password" name="password" placeholder="Password" id="Password" />
                <input className="w-full hover:m-1 p-2 text-white font-medium rounded-xl bg-gradient-to-tr from-blue-700 to-blue-900 hover:from-blue-900 hover:to-blue-950" type="submit" value="Sign Up" />
            </form>
            <p className="mt-4 md:mx-auto px-8 md:px-0 w-full md:w-2/3 lg:w-1/2">Already have an account? <Link href='/login' className="text-transparent bg-gradient-to-tr from-blue-700 to-blue-900 bg-clip-text font-semibold ">Please login</Link></p>
            {/* <input type="file" name="file" onChange={(e)=>{console.log(e?.target?.files[0]); setImage(URL.createObjectURL(e?.target?.files[0]))}} id="" /> */}
            {/* <img src={image} alt="" /> */}
        </div>
        </section>
    );
};

export default SignUpPage;