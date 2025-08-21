import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="flex flex-col text-black w-screen -mx-[18px]  items-center justify-center h-screen ">
      <p className="text-3xl mb-4 font-semibold">Loading...</p>
      <p className="text-sm sm:text-lg opacity-60 mb-4 font-medium">Please wait while we fetch the best deals for you.</p>
      <motion.div
        className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
    </div>
  );
}