import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { AiFillHeart, AiOutlineSafety, AiOutlineStar, AiOutlineSync, AiOutlineUser, AiOutlineLike } from "react-icons/ai";
import { HiOutlineCube } from "react-icons/hi";
import { FaStar, FaRegStar, FaStarHalfAlt, FaCircle } from "react-icons/fa";
import { asyncloadpro } from '../Store/Actions/ProductAction';
import { useEffect, useState } from "react";
import { FiThumbsUp } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../Store/Reducers/CartSlice";
import { addToCartBackend } from '../Store/Actions/CartAction';
import {toast} from 'react-toastify'

const SingleCard = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productReducer.products);
  const product = products?.find((p) => p.id == id);
  const user = useSelector((state) => state.userReducer.user);

  const [mainImage, setMainImage] = useState(product?.images?.[0]);
  const [isThumbnail, setIsThumbnail] = useState(true);
  const [activeTab, setActiveTab] = useState("description");
  const [quantity, setQuantity] = useState(1);
  const [like, setLike] = useState(false);

  useEffect(() => {
    if (!product) return; 

    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isLiked = wishlist.some(item => item.id === product.id);
    setLike(isLiked);
  }, [product]);

  const handleLike = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (like) {

      const updatedWishlist = wishlist.filter(item => item.id !== product.id);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      setLike(false);
       toast.error("Removed from Wishlist");
    } else {

      const updatedWishlist = [...wishlist, product];
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      setLike(true);
      toast.success("Added to Wishlist"); 
    }
  };

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => Math.max(1, prev - 1));

  const navig = useNavigate();

  useEffect(() => {
    if (!products || products.length === 0) {
      dispatch(asyncloadpro());
    }
  }, [dispatch, products]);

  useEffect(() => {
    if (product) {
      setMainImage(product.thumbnail);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading product...
      </div>
    );
  }

  const handleThumbnailClick = (index) => {
    setMainImage(product.images[index]); 
  };


  const fullStars = Math.floor(product.rating);
  const hasHalfStar = product.rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const ratingCounts = [5, 4, 3, 2, 1].reduce((acc, star) => {
    acc[star] = product.reviews.filter(r => Math.floor(r.rating) === star).length;
    return acc;
  }, {});

  const totalReviews = Object.values(ratingCounts).reduce((a, b) => a + b, 0);
  const handleAddToCart = async () => {
    toast.success("Item added to cart!");
    const cartItem = {
      id: product.id,
      title: product.title,
      price: (product.price * 87).toFixed(2),
      image: product.thumbnail,
      quantity,
    };

    dispatch(addToCart(cartItem));  
    if (user?.id) {
      await addToCartBackend(product, user.id, quantity);
    }
  };

  return (
    <div className="mx-1 flex flex-col gap-0 text-black mt-5">
      <div className="flex flex-col md:flex-row md:gap-8 max-w-[1232px] mx-auto">
        <div className="flex-1 flex flex-col gap-0">
          <div className="relative flex-1 max-h-[500px] hover:scale-102 transition-all duration-300">
            <img
              className="w-full h-[500px] object-contain bg-gray-100 rounded-lg"
              src={mainImage || product.thumbnail}
              alt={product.title}
            />
            <AiFillHeart
              onClick={handleLike}
              className={`text-shadow-lg cursor-pointer absolute top-3 right-2 w-10 h-10 bg-white rounded-full p-2 ${like === true ? "text-red-500" : "text-blue-300"}`}
            />
          </div>

          <div className="flex gap-2 flex-row justify-start my-3 mt-5">
            {product?.images?.map((img, index) => (
              <div
                key={index}
                className={`border-2 p-1 cursor-pointer rounded-lg hover:scale-108 transition-all duration-200 ${mainImage === img ? "border-black" : "border-gray-300"}`}
                onClick={() => handleThumbnailClick(index)}
              >
                <img
                  src={img}
                  alt={`${product?.title} ${index + 1}`}
                  className="w-14 h-14 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 mb-[5rem]">
          <div className="flex flex-row justify-between px-3 mb-5">
            <div className={`bg-gray-100 px-3 text-sm font-sm rounded-xl flex justify-center items-center ${product.brand ? "opacity-100" : "opacity-0"}`}>{product.brand}</div>
            <div className="flex flex-row gap-1 items-center">
              <div className="flex flex-row gap-1 items-center text-base font-normal text-black">
                <FaStar className="text-yellow-500" />{product.rating}
              </div>
              <div className="text-gray-800 text-sm">({product.reviews.length} reviews)</div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold mb-[5%] px-1">{product.title}</h1>
            <h1 className="text-3xl font-semibold mb-[5%] px-1">₹ {((product.price) * 87).toFixed(2)}</h1>
            <h1 className="px-1 flex flex-row gap-2 text-green-600 items-center font-semibold text-base"><FaCircle className="text-xs" /> In Stock ({product.stock} available)</h1>
            <p className="my-[5%] px-4 text-[0.9rem] font-normal opacity-80 bg-gray-100 rounded-lg md:p-3 md:leading-6">{product.description}</p>
            <h1 className="flex flex-row gap-2 text-lg font-semibold items-center mb-[1.2rem]">Quantity:
              <div className="flex items-center gap-2 border w-max rounded-lg border-gray-300 text-lg ">
                <button
                  onClick={decrement}
                  className="px-3 py-1 border-r text-base cursor-pointer"
                >
                  -
                </button>
                <span className="px-3 text-base">{quantity}</span>
                <button
                  onClick={increment}
                  className="px-3 py-1 border-l text-base cursor-pointer"
                >
                  +
                </button>
              </div>
            </h1>
            <div className="flex flex-col sm:flex-row gap-2">
              <button onClick={handleAddToCart} className="flex-1 cursor-pointer bg-black text-white p-2 text-lg font-normal rounded-lg ">Add to Cart</button>
              <button onClick={() => navig(`/checkout/${product.id}`, { state: { quantity, isDirectBuy: true } })} className="flex-1 cursor-pointer text-lg p-2 rounded-lg font-semibold border border-gray-400">Buy Now</button>
            </div>
            <hr className="mt-4" />
            <div className="flex flex-col  gap-4 mt-5 sm:flex-row">
              <div className="flex-1 flex flex-row items-center gap-3">
                <AiOutlineSafety className="font-normal text-xl" />
                <div>
                  <h1 className="text-sm font-semibold">Trusted Brand</h1>
                  <h1 className="text-xs font-normal opacity-60  mt-0.5">{product.brand}is a trusted name in the industry.</h1>
                </div>
              </div>
              <div className="flex-1 flex flex-row items-center gap-3 ">
                <HiOutlineCube className="font-normal text-2xl" />
                <div>
                  <h1 className="text-sm font-semibold">Quality Product</h1>
                  <h1 className="text-xs font-normal opacity-60 mt-0.5">Carefully selected for performance and reliability</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="flex flex-col gap-2 w-full xl:w-[85%] mx-auto max-w-[1241px]">
        <div className="flex flex-row gap-6 items-center text-sm mb-2">
          <div className={`cursor-pointer font-normal ${activeTab === "description" ? "font-bold" : ""}`} onClick={() => setActiveTab("description")}>Description</div>
          <div className={`cursor-pointer text-center font-normal ${activeTab === "general" ? "font-bold" : ""}`} onClick={() => setActiveTab("general")}>General Information</div>
          <div className={`cursor-pointer text-center font-normal ${activeTab === "reviews" ? "font-bold" : ""}`} onClick={() => setActiveTab("reviews")}>Reviews ({product.reviews.length})</div>
        </div>
        <hr />

        <div>
          {activeTab === "description" && (
            <div>
              <div className="flex flex-row gap-1 items-center text-xl my-[1.5rem] font-semibold"><AiOutlineStar className="text-2xl text-yellow-400" /> Product Description</div>
              <div className="text-[1rem] font-normal opacity-70 mb-[1.5rem]">{product.description}</div>

              <div className="flex flex-col">
                <h1 className="font-normal text-base mb-4">Tags</h1>
                <h1 className="flex flex-row flex-wrap px-1 gap-4 mb-[2rem]">
                  {product.tags.map((tag, index) => (
                    <span key={index} className="bg-blue-100 px-2 py-1 rounded-3xl text-sm sm:text-base md:text-sm font-normal">{tag}</span>
                  ))}
                </h1>
              </div>

              <div className="flex flex-col gap-2 md:flex-row ">
                <div className="flex-1 flex flex-col gap-2 mb-5">
                  <h1 className="flex flex-row gap-2 items-center text-lg font-normal"><HiOutlineCube className=" text-xl text-green-300" /> Product Details</h1>
                  <h1 className="font-normal text-base px-1 sm:text-sm">Brand: <span className="opacity-50">{product.brand}</span></h1>
                  <h1 className="font-normal text-base px-1 sm:text-sm">Category: <span className="opacity-50">{product.category}</span></h1>
                  <h1 className="font-normal text-base px-1 sm:text-sm">SKU: <span className="opacity-50">{product.sku}</span></h1>
                  <h1 className="font-normal text-base px-1 sm:text-sm">Availability: <span className="opacity-50">{product.availabilityStatus}</span></h1>
                </div>

                <div className="flex-1 flex flex-col gap-2">
                  <h1 className="flex flex-row gap-2 items-center text-lg font-normal"><AiOutlineSync className=" text-xl text-purple-500" /> Shipping & Return</h1>
                  <h1 className="font-normal text-base px-1 sm:text-sm">Shipping: <span className="opacity-50">{product.shippingInformation}</span></h1>
                  <h1 className="font-normal text-base px-1 sm:text-sm">Return Policy: <span className="opacity-50">{product.returnPolicy}</span></h1>
                  <h1 className="font-normal text-base px-1 sm:text-sm">Warranty: <span className="opacity-50">{product.warrantyInformation}</span></h1>
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          {activeTab === "general" && (
            <div className="flex flex-col gap-2 bg-gray-100  rounded-lg gap-8 sm:flex-row sm:mb-[2rem] md:mt-[1rem]">
              <div className=" flex-1 flex flex-col gap-4 sm:justify-between sm:gap-6 sm:p-6">
                <div className="flex flex-row justify-between px-6 opcity-50">Width <span className="font-normal">{product.dimensions.width}</span></div>
                <div className="flex flex-row justify-between px-6 opcity-50">Height <span className="font-normal">{product.dimensions.height}</span></div>
                <div className="flex flex-row justify-between px-6 opcity-50">Depth <span className="font-normal">{product.dimensions.depth}</span></div>
              </div>
              <div className="flex-1 flex flex-col gap-4 sm:justify-between sm:p-6">
                <div className="flex flex-row justify-between px-6 opcity-50">Barcode <span className="font-normal text-black">{product.meta.barcode}</span></div>
                <div className="flex flex-row justify-between px-6 opcity-50">Weight <span className="font-normal">{(product.weight) / 1000} kg</span></div>
                <div className="flex flex-row justify-between px-6 opcity-50">Warranty <span className="font-normal">{product.warrantyInformation}</span></div>
              </div>
            </div>
          )}
        </div>


        <div>
          {activeTab === "reviews" && (
            <div className="flex flex-col gap-2">
              <div className="flex flex-row justify-between gap-6.5 items-center">
                <h1 className="text-lg font-semibold">Customer Reviews</h1>
                <h1 className="p-1.5 text-sm border border-black whitespace-nowrap rounded-lg font-normal">Write a Review</h1>
              </div>

              <div className="flex flex-col gap-2 bg-gray-50 p-1 rounded-lg md:flex-row md:my-[1.5rem] lg:w-[90%] lg:mx-auto">
                <div className="flex-1 flex flex-col gap-2 text-center mt-[2.5rem]">
                  <h1 className="font-bold text-3xl">{product.rating}</h1>
                  <div className="flex items-center gap-1 justify-center text-lg">
                    {[...Array(fullStars)].map((_, i) => (
                      <FaStar key={`full-${i}`} className="text-yellow-500" />
                    ))}
                    {hasHalfStar && <FaStarHalfAlt className="text-yellow-500" />}
                    {[...Array(emptyStars)].map((_, i) => (
                      <FaRegStar key={`empty-${i}`} className="text-yellow-500" />
                    ))}
                  </div>
                  <h1 className="text-sm font-normal opacity-60">Based on {product.reviews.length} reviews</h1>
                </div>

                <div className="mt-4 space-y-1 px-8 sm:px-10 flex-1">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = ratingCounts[star] || 0;
                    const percentage = totalReviews ? (count / totalReviews) * 100 : 0;
                    return (
                      <div key={star} className="flex items-center text-sm font-semibold">
                        <span className="w-6">{star}<span className="ml-1 text-yellow-500">★</span></span>
                        <div className="flex-1 h-2 bg-gray-300 rounded mx-2">
                          <div
                            className="h-2 bg-yellow-500 rounded"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="w-4 text-right">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>


              {product.reviews && product.reviews.length > 0 && (
                <div className="flex flex-col gap-5 mt-5 sm:px-5">
                  {product.reviews.map((review, index) => (
                    <div key={index} className="flex flex-row gap-4 items-center">
                      <AiOutlineUser size={34} className="bg-blue-500 rounded-full p-0.5" />
                      <div className="flex flex-col gap-2 mb-2">
                        <div className="flex gap-1 items-center md:gap-3">
                          <h1 className="font-medium text-base">{review.reviewerName}</h1>
                          <div className="flex mr-4">
                            {[...Array(Math.floor(review.rating))].map((_, i) => (
                              <FaStar key={`review-full-${i}`} className="text-yellow-500" />
                            ))}
                            {review.rating % 1 >= 0.5 && (
                              <FaStarHalfAlt className="text-yellow-500" />
                            )}
                            {[...Array(5 - Math.ceil(review.rating))].map((_, i) => (
                              <FaRegStar key={`review-empty-${i}`} className="text-yellow-500" />
                            ))}
                          </div>
                          <h1 className="whitespace-nowrap text-sm">{review.date.split("T")[0]}</h1>
                        </div>
                        <h1 className="font-normal ">{review.comment}</h1>
                        <div className="flex flex-row gap-4">
                          <h1 className="flex flex-row items-center gap-1 opacity-50"><FiThumbsUp /> Helpful()</h1>
                          <h1 className="flex flex-row items-center gap-1 opacity-50"><AiOutlineLike /> Reply</h1>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleCard;

