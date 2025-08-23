import { FaUser } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import { asynccurrentuser } from "../../Store/Actions/UserAction";
import { useEffect } from "react";
import axios from "../../api/Axioscon";
import { loadUser } from "../../Store/Reducers/UserSlice";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
const Profile = () => {
    const { register, handleSubmit, reset } = useForm();
    const dispatch = useDispatch();
    const user = useSelector(state => state.userReducer?.data);

    const onSaveHandler = async (formData) => {
    const isHosted = window.location.hostname !== "localhost";

    if (isHosted) {
        // Hosted → only localStorage + Redux
        const updatedUser = { ...user, ...formData };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        dispatch(loadUser(updatedUser));
        reset(updatedUser);
        toast.success('Profile updated locally!');
    } else {
        // Localhost → normal API call
        try {
            const response = await axios.patch(`/users/${user.id}`, formData);
            const updatedUser = { ...user, ...formData };
            localStorage.setItem("user", JSON.stringify(updatedUser));
            dispatch(loadUser(updatedUser));
            reset(updatedUser);
            toast.success('Profile updated successfully!');
        } catch (err) {
            console.error("❌ Error:", err);
        }
    }
};


    useEffect(() => {
        dispatch(asynccurrentuser());
    }, [dispatch]);


    useEffect(() => {
        if (user) {
            reset(user);
        }
    }, [user, reset]);

    return (
        <motion.div className="mx-auto max-w-[576px]  mb-[20%] bg-gray-50 sm:mt-[3%] sm:mx-auto shadow-[0_3px_6px_0_rgba(0,0,0,0.3),0_0_0_1px_rgba(0,0,0,0.02)] rounded-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <p className="text-black flex gap-2 pl-5 text-2xl mt-2 pt-6 items-center font-bold"><FaUser />My Profile</p>
            <form
                className="flex flex-col gap-5 mt-9 px-2"
                onSubmit={handleSubmit(onSaveHandler, (errors) => {
                })}
            >
                <div className="space-y-1 px-3">
                    <label className="block text-[clamp(0.85rem,1.30vw,1.05rem)] font-bold ml-0.5 text-gray-600">Name</label>
                    <input
                        {...register("username")}
                        className="border-solid text-black text-[clamp(0.75rem,0.6rem+1vw,1.125rem)] focus:outline-none focus:border-gray-300 focus:shadow-[0_0_15px_rgba(0,0,0,0.2)] transition-all duration-200 border-gray-300 rounded-lg px-3 py-[4px] text-md  bg-gray-100 font-semibold text-lg w-full"
                        type="text"
                        defaultValue={user?.username ?? ""}
                    />
                </div>
                <div className="space-y-1 px-3">
                    <label className="block text-[clamp(0.85rem,1.30vw,1.05rem)] font-bold ml-0.5 text-gray-600">Email</label>
                    <input
                        {...register("email")}
                        className="border-solid text-black text-[clamp(0.75rem,0.6rem+1vw,1.125rem)] focus:outline-none focus:border-gray-300 focus:shadow-[0_0_15px_rgba(0,0,0,0.2)] transition-all duration-200 border-gray-300 rounded-lg px-3 py-[4px] text-md  bg-gray-100 font-semibold text-lg w-full"
                        type="email"
                        defaultValue={user?.email ?? ""}
                    />
                </div>
                <div className="space-y-1 px-3">
                    <label className="block text-[clamp(0.85rem,1.30vw,1.05rem)] font-bold ml-0.5 text-gray-600">Phone Number</label>
                    <input
                        {...register("phone")}
                        className="border-solid text-black text-[clamp(0.75rem,0.6rem+1vw,1.125rem)] focus:outline-none focus:border-gray-300 focus:shadow-[0_0_15px_rgba(0,0,0,0.2)] transition-all duration-200 border-gray-300 rounded-lg px-3 py-[4px] text-md  bg-gray-100 font-semibold text-lg w-full"
                        type="number"
                        placeholder="991054786"
                        defaultValue={user?.phone ?? ""}
                    />
                </div>
                <div className="space-y-1 px-3">
                    <label className="block text-[clamp(0.85rem,1.30vw,1.05rem)] font-bold ml-0.5 text-gray-600">shipping Address</label>
                    <input
                        {...register("count")}
                        className="border-solid text-black text-[clamp(0.75rem,0.6rem+1vw,1.125rem)] focus:outline-none focus:border-gray-300 focus:shadow-[0_0_15px_rgba(0,0,0,0.2)] transition-all duration-200 border-gray-300 rounded-lg px-3 py-[4px] text-md  bg-gray-100 font-semibold text-lg w-full"
                        type="text"
                        placeholder="Country"
                        defaultValue={user?.count ?? ""}
                    />
                    <input
                        {...register("city")}
                        className="border-solid my-2 text-black text-[clamp(0.75rem,0.6rem+1vw,1.125rem)] focus:outline-none focus:border-gray-300 focus:shadow-[0_0_15px_rgba(0,0,0,0.2)] transition-all duration-200 border-gray-300 rounded-lg px-3 py-[4px] text-md  bg-gray-100 font-semibold text-lg w-full"
                        type="text"
                        placeholder="City"
                        defaultValue={user?.city ?? ""}
                    />
                    <textarea
                        {...register("add")}
                        className="border-solid my-2 text-black text-[clamp(0.75rem,0.6rem+1vw,1.125rem)] focus:outline-none focus:border-gray-300 focus:shadow-[0_0_15px_rgba(0,0,0,0.2)] transition-all duration-200 border-gray-300 rounded-lg px-3 py-[4px] text-md  bg-gray-100 font-semibold text-lg w-full"
                        type="text"
                        placeholder="Street Address"
                        defaultValue={user?.add ?? ""}
                    />
                    <input
                        {...register("area")}
                        className="border-solid my-2 text-black text-[clamp(0.75rem,0.6rem+1vw,1.125rem)] focus:outline-none focus:border-gray-300 focus:shadow-[0_0_15px_rgba(0,0,0,0.2)] transition-all duration-200 border-gray-300 rounded-lg px-3 py-[4px] text-md  bg-gray-100 font-semibold text-lg w-full"
                        type="text"
                        placeholder="Area"
                        defaultValue={user?.area ?? ""}
                    />
                    <input
                        {...register("code")}
                        className="border-solid my-2 text-black focus:outline-none focus:border-gray-300 focus:shadow-[0_0_15px_rgba(0,0,0,0.2)] transition-all duration-200 border-gray-300 rounded-lg px-3 py-[4px] text-md  bg-gray-100 font-semibold text-lg w-full"
                        type="number"
                        placeholder="Postal Code"
                        defaultValue={user?.code ?? ""}
                    />
                </div>
                <div className='px-4'>
                    <button
                        type="submit"
                        onClick={() => console.log("Button clicked!")}
                        className="active:scale-97 cursor-pointer mt-3 mb-6 rounded-xl bg-black px-4 w-full py-2 text-white font-bold sm:text-lg lg:text-xl"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </motion.div>
    )
}

export default Profile