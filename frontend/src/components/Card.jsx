import { IoFlashOutline } from "react-icons/io5"   
import { LuShoppingCart } from "react-icons/lu";
import { FaStar } from "react-icons/fa"
const Card = ({product}) => {
  return (
    <div className="text-black shadow-lg rounded-xl mb-[15%] max-w-[606px] mx-auto hover:translate-y-[-8px] hover:shadow-2xl transition-transform duration-400 group" key={product.id}>
        <div className="relative bg-gray-100 rounded-t-xl">
            <img className='object-cover w-[100%] mb-[8%]' src={product.thumbnail}  alt="" />
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
            <h1 className="absolute top-2 left-3 flex flex-row gap-1 items-center font-semibold p-1 bg-red-600 text-white rounded-4xl">
                <span><IoFlashOutline /></span> {product.discountPercentage}%
            </h1>
        </div>

      <div className="flex flex-row justify-between px-4 mb-[3%]">
        <h1 className="p-2 font-normal text-sm rounded-4xl bg-gray-200">{(product.brand)?"":""}</h1>
        <h1 className="flex flex-row gap-1 items-center font-semibold">
          <span className="text-yellow-500"><FaStar /></span> {product.rating}
        </h1>
      </div>

      <h1 className="px-3 font-semibold text-md mb-[3%]">{product.title}</h1>
      
      <h1 className="px-3 text-md font-normal mb-[3%]">{product.description.slice(0, 100)}</h1>

      <div>
        <h1 className="flex flex-row px-4 gap-4 mb-[3%]">
        {product.tags.map((tag, index) => (
            <span key={index} className="bg-gray-200 px-2 py-1 rounded-3xl text-sm font-normal">{tag}</span>
        ))}
        </h1>
      </div>

      <div className="flex flex-row justify-between items-center font-semibold p-3">
        <h1 className="text-3xl">₹{((product.price)*87).toFixed(2)}</h1>
        <button className="flex flex-row gap-1 bg-black text-white rounded-xl active-97 px-3 py-2 text-md items-center">
          <span><LuShoppingCart /></span> Add to Cart
        </button>
      </div>
    </div>
  )
}

export default Card