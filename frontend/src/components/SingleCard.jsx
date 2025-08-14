import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { asyncloadpro } from '../Store/Actions/ProductAction';
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa"
import { FaShieldAlt } from 'react-icons/fa';
import { FaCube } from 'react-icons/fa';

const SingleCard = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productReducer.products); // plural
  const product = products?.find((p) => p.id == id);

  // Fetch products if store is empty
  useEffect(() => {
    if (!products || products.length === 0) {
      dispatch(asyncloadpro());
    }
  }, [dispatch, products]);

  // Guard: show loading until product is available
  if (!product) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading product...
      </div>
    );
  }

  const [mainImage, setMainImage] = useState(product.thumbnail); // default bada image
  const [isThumbnail, setIsThumbnail] = useState(true); // toggle state

  const handleThumbnailClick = () => {
    if (isThumbnail) {
      setMainImage(product.image); // badi wali
    } else {
      setMainImage(product.thumbnail); // normal
    }
    setIsThumbnail(!isThumbnail);
  };

  return (
    <div className="bg-gray-200 mx-2 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="relative">
          <img
            className="w-full h-[500px] object-contain border border-black"
            src={product.thumbnail}
            alt={product.title}
          />
          <AiOutlineHeart className="cursor-pointer absolute top-3 right-2 w-10 h-10 text-red-300 bg-white rounded-full p-2" />
        </div>

        <div className="flex justify-center mt-4">
          <img
            src={product.images} // chhota preview
            alt={product.title}
            className="w-14 h-14 object-contain cursor-pointer border border-gray-300 p-1"
            onClick={handleThumbnailClick}
          />
        </div>
      </div>
      <div>
        <div className="flex flex-row justify-between px-4 mb-5">
          <div className="bg-gray-400 px-2 text-sm font-sm rounded-xl flex justify-center items-center">{product.brand}</div>
          <div className="flex flex-row gap-1 items-center">
          <div className="flex flex-row gap-1 items-center text-base font-normal text-black"><FaStar className="text-yellow-500"/>{product.rating}</div>
          <div className="text-gray-800 text-sm">({(product.reviews).length} reviews)</div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <h1>{product.title}</h1>
          <h1>{(product.price)*87}</h1>
          <h1>In Stock ({product.stock} available)</h1>
          <p>{product.description}</p>
          <h1>Quantity: </h1>
          <div className="flex flex-col">
            <button>Add to Cart</button>
            <button>Buy Now</button>
          </div>
          <hr/>
          <div className="flex flex-col items-center">
            <div className="flex flex-row items-center">
              <div><FaShieldAlt/></div>
              <div>
                <h1>Trusted Brand</h1>
                <h1>Annibale Colombo is a trusted name in the industry.</h1>
              </div>
            </div>
            <div className="flex flex-row items-cemter">
              <div><FaCube/></div>
              <div>
                <h1>Quality Product</h1>
                <h1>Carefully selected for performance and reliability</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCard;
