import { IoFlashOutline } from "react-icons/io5"   
import { LuShoppingCart } from "react-icons/lu";
import { FaStar } from "react-icons/fa"
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../Store/Reducers/CartSlice"; 
const Card = ({product}) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault(); 
    dispatch(addToCart({
      ...product,
      price: (product.price * 87).toFixed(2),  // 👈 yahan convert karke bhej do
    }));
  };

  return (
    <Link to={`/singleCard/${product.id}`} className="block">
      <div className="mx-auto max-w-[608px] md:max-w-[348px] text-black shadow-lg rounded-xl mb-[15%] hover:translate-y-[-8px] hover:shadow-2xl transition-transform duration-400 group" key={product.id}>
        <div className="relative bg-gray-100 rounded-t-xl">
            <img className='w-full h-[300px] object-cover mb-[8%]' src={product.thumbnail}  alt="" />
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
            <h1 className="absolute top-4 left-3 flex flex-row gap-1 items-center font-semibold p-1 bg-red-600 text-white rounded-4xl">
                <span><IoFlashOutline /></span> {product.discountPercentage}%
            </h1>
        </div>

        <div className="flex flex-row justify-between px-4 mb-[3%]">
          <h1
            className={`p-2 font-normal text-sm rounded-4xl bg-gray-200 ${
              product.brand ? "opacity-100" : "opacity-0"
            }`}
          >
            {product.brand || "Brand"} {/* optional placeholder */}
          </h1>
          <h1 className="flex flex-row gap-1 items-center font-semibold sm:text-lg md:text-base">
            <span className="text-yellow-500 sm:text-lg"><FaStar /></span> {product.rating}
          </h1>
        </div>

        <h1 className="px-3 font-semibold text-md mb-[3%] sm:text-lg">{product.title}</h1>
        
        <h1 className="px-3 text-base font-normal mb-[3%] sm:text-lg md:text-base">{product.description.slice(0, 100)}</h1>

        <div>
          <h1 className="flex flex-row flex-wrap px-4 gap-4 mb-[3%]">
          {product.tags.map((tag, index) => (
              <span key={index} className="bg-gray-200 px-2 py-1 rounded-3xl text-sm sm:text-base md:text-sm font-normal">{tag}</span>
          ))}
          </h1>
        </div>

        <div className="flex flex-row justify-between items-center font-semibold p-3 gap-1">
          <h1 className="text-2xl sm:text-3xl md:text-2xl lg:text-xl xl:text-2xl">₹{((product.price)*87).toFixed(2)}</h1>
          <button onClick={handleAddToCart} className="flex cursor-pointer flex-row gap-1 bg-black text-white rounded-lg active-97 px-3 py-2 text-md items-center sm:text-lg md:text-base lg:p-1 lg:whitespace-nowrap lg:text-sm xl:px-3 xl:text-base xl:py-1">
            <span><LuShoppingCart /></span> Add to Cart
          </button>
        </div>
      </div>
    </Link>
  )
}

export default Card