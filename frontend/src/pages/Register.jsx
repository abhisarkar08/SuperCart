import { useForm } from 'react-hook-form';
import { nanoid } from 'nanoid';
import { Link, useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip'
import { AiOutlineInfoCircle } from "react-icons/ai";
import { asyncpostuser } from "../Store/Actions/UserAction";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify'
const Register = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navig = useNavigate();

  const onRegisterHandler = (data) => {
    data.id = nanoid();
    data.isAdmin = true
    dispatch(asyncpostuser(data));
    toast.success('Registered Successfull!')
    reset()
    navig("/home");
  };

  return (
    <div className='mx-auto max-w-[424px]  bg-gray-50 sm:mt-[10%] sm:mx-auto shadow-[0_3px_6px_0_rgba(0,0,0,0.3),0_0_0_1px_rgba(0,0,0,0.02)] rounded-xl'>
      <form
        onSubmit={handleSubmit(onRegisterHandler)}
        className="flex flex-col gap-4 px-5 py-7 mt-12 bg-white text-black rounded-2xl"
      >
        <p className='text-center text-[clamp(1.1rem,2vw,1.5rem)] font-bold'>Register</p>
        <div className='space-y-1 px-3'>
          <label className="block text-[clamp(0.85rem,1.30vw,1.05rem)] font-bold ml-0.5 text-gray-600">Username</label>
          <input
            {...register("username", { required: true })} 
            className="border-solid focus:outline-none focus:border-gray-300 focus:shadow-[0_0_15px_rgba(0,0,0,0.2)] transition-all duration-200 border-gray-300 rounded-lg px-3 py-[4px] text-md  bg-gray-100 font-semibold text-lg w-full"
            type="text"
          />
          {errors.password && (
            <p className="text-red-500 text-[clamp(0.85rem,1.32vw,0.92rem)] font-normal ml-0.5">Username is required.</p>
          )}
        </div>

        <div className="space-y-1 px-3">
          <label className="block text-[clamp(0.85rem,1.30vw,1.05rem)] font-bold ml-0.5 text-gray-600">Password</label>
          <input
            {...register("password", { required: true })}
            className="border-solid focus:outline-none focus:border-gray-300 focus:shadow-[0_0_15px_rgba(0,0,0,0.2)] transition-all duration-200 border-gray-300 rounded-lg px-3 py-[4px] text-md  bg-gray-100 font-semibold text-lg w-full"
            type="password"
          />
          {errors.password && (
            <p className="text-red-500 text-[clamp(0.85rem,1.32vw,0.92rem)] font-normal ml-0.5">Password is required.</p>
          )}
        </div>

        <div className="space-y-1 px-3">
          <label className=" flex items-center gap-1 block text-[clamp(0.85rem,1.30vw,1.05rem)] font-bold ml-0.5 text-gray-600">Email 
            <span 
              data-tooltip-id="emailTip" 
              data-tooltip-content="The e-mail need not to be a real one!"
              className="cursor-pointer ml-1"
            >
              <AiOutlineInfoCircle size={20} className="text-green-500"/>
            </span>
            <Tooltip id="emailTip" place="top" className="!text-sm !p-2 !bg-gray-800 !text-white !rounded-lg" />
          </label>
          <input
            {...register("email", { required: "Please enter email!" })}
            className="border-solid focus:outline-none focus:border-gray-300 focus:shadow-[0_0_15px_rgba(0,0,0,0.2)] transition-all duration-200 border-gray-300 rounded-lg px-3 py-[4px] text-md bg-gray-100 font-normal text-lg w-full"
            type="email"
          />
          {errors.email && <p className="text-red-500 text-[clamp(0.85rem,1.32vw,0.92rem)] font-normal ml-0.5">{errors.email.message}</p>}
        </div>

        <div className='px-4'>
          <button
            type="submit"
            className="active:scale-97 cursor-pointer mt-4 rounded-xl bg-black px-4 w-full py-2 text-white font-bold sm:text-lg lg:text-xl"
          >
            Register
          </button>
        </div>
        <p className='text-[clamp(0.875rem,1.3vw,1rem)] font-medium ml-1 text-center'>
          Already have an account? <Link className='text-blue-400' to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;