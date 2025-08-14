import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { AiOutlineHeart, AiOutlineSafety, AiOutlineStar, AiOutlineSync, AiOutlineUser, AiOutlineLike } from "react-icons/ai";
import { HiOutlineCube } from "react-icons/hi";
import { FaStar, FaRegStar, FaStarHalfAlt, FaCircle } from "react-icons/fa";
import { asyncloadpro } from '../Store/Actions/ProductAction';
import { useEffect, useState } from "react";
import { FiThumbsUp } from "react-icons/fi";

const SingleCard = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productReducer.products);
  const product = products?.find((p) => p.id == id);

  const [mainImage, setMainImage] = useState(null);
  const [isThumbnail, setIsThumbnail] = useState(true);
  const [activeTab, setActiveTab] = useState("description");
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => Math.max(1, prev - 1));

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

  const handleThumbnailClick = () => {
    setMainImage(isThumbnail ? product.image : product.thumbnail);
    setIsThumbnail(!isThumbnail);
  };


  const fullStars = Math.floor(product.rating);
  const hasHalfStar = product.rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  // Compute ratingCounts from product.reviews
  const ratingCounts = [5, 4, 3, 2, 1].reduce((acc, star) => {
    acc[star] = product.reviews.filter(r => Math.floor(r.rating) === star).length;
    return acc;
  }, {});

  const totalReviews = Object.values(ratingCounts).reduce((a, b) => a + b, 0);

  return (
    <div className="bg-gray-200 mx-2 flex flex-col gap-4">
      <div>
        <div className="flex flex-col gap-2">
          <div className="relative">
            <img
              className="w-full h-[500px] object-contain border border-black"
              src={mainImage || product.thumbnail}
              alt={product.title}
            />
            <AiOutlineHeart className="cursor-pointer absolute top-3 right-2 w-10 h-10 text-red-300 bg-white rounded-full p-2" />
          </div>

          <div className="flex justify-center mt-4">
            <img
              src={product.images[0]} // assuming product.images is an array
              alt={product.title}
              className="w-14 h-14 object-contain cursor-pointer border border-gray-300 p-1"
              onClick={handleThumbnailClick}
            />
          </div>
        </div>
        <div className="mb-[25%]">
          <div className="flex flex-row justify-between px-4 mb-5">
            <div className="bg-gray-400 px-2 text-sm font-sm rounded-xl flex justify-center items-center">{product.brand}</div>
            <div className="flex flex-row gap-1 items-center">
              <div className="flex flex-row gap-1 items-center text-base font-normal text-black">
                <FaStar className="text-yellow-500" />{product.rating}
              </div>
              <div className="text-gray-800 text-sm">({product.reviews.length} reviews)</div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <h1>{product.title}</h1>
            <h1>{(product.price) * 87}</h1>
            <h1 className="flex flex-row gap-1"><FaCircle/> In Stock ({product.stock} available)</h1>
            <p>{product.description}</p>
            <h1 className="flex flex-row gap-2">Quantity: 
            <div className="flex items-center gap-2 border w-max">
              <button
                onClick={decrement}
                className="px-3 py-1 border-r"
              >
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={increment}
                className="px-3 py-1 border-l"
              >
                +
              </button>
            </div>
            </h1>
            <div className="flex flex-col">
              <button>Add to Cart</button>
              <button>Buy Now</button>
            </div>
            <hr />
            <div className="flex flex-col items-center gap-2">
              <div className="flex flex-row items-center gap-2">
                <AiOutlineSafety />
                <div>
                  <h1>Trusted Brand</h1>
                  <h1>Annibale Colombo is a trusted name in the industry.</h1>
                </div>
              </div>
              <div className="flex flex-row items-center gap-2">
                <HiOutlineCube />
                <div>
                  <h1>Quality Product</h1>
                  <h1>Carefully selected for performance and reliability</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-4 items-center">
          <div className={activeTab === "description" ? "font-bold" : ""} onClick={() => setActiveTab("description")}>Description</div>
          <div className={activeTab === "general" ? "font-bold" : ""} onClick={() => setActiveTab("general")}>General Information</div>
          <div className={activeTab === "reviews" ? "font-bold" : ""} onClick={() => setActiveTab("reviews")}>Reviews ({product.reviews.length})</div>
        </div>
        <hr />

        <div>
        {activeTab === "description" && (
          <div>
            <div><AiOutlineStar /> Product Description</div>
            <div>{product.description}</div>

            <div className="flex flex-col">
              <h1>Tags</h1>
              <h1>{product.tags}</h1>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <h1><HiOutlineCube /> Product Details</h1>
                <h1>Brand: {product.brand}</h1>
                <h1>Category: {product.category}</h1>
                <h1>SKU: {product.sku}</h1>
                <h1>Availability: {product.availabilityStatus}</h1>
              </div>

              <div className="flex flex-col gap-2">
                <h1><AiOutlineSync /> Shipping & Return</h1>
                <h1>Shipping: {product.shippingInformation}</h1>
                <h1>Return Policy: {product.returnPolicy}</h1>
                <h1>Warranty: {product.warrantyInformation}</h1>
              </div>
            </div>
          </div>
        )}
        </div>

        <div>
          {activeTab === "general" && (
            <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                  <div>Width: {product.dimensions.width}</div>
                  <div>Height: {product.dimensions.height}</div>
                  <div>Depth: {product.dimensions.depth}</div>
                </div>
                <div className="flex flex-col">
                  <div>Barcode: {product.barcode}</div>
                  <div>Weight: {(product.weight) / 1000} kg</div>
                  <div>Warranty: {product.warrantyInformation}</div>
                </div>
            </div>
          )}
        </div>

        {/* Customer Reviews */}
        <div>
          {activeTab === "reviews" && (
            <div className="flex flex-col gap-2">
              <div className="flex flex-row justify-between">
                <h1>Customer Reviews</h1>
                <h1>Write a Review</h1>
              </div>

              <div className="flex flex-col gap-1">
                <h1>{product.rating}</h1>
                <div className="flex items-center gap-1">
                  {[...Array(fullStars)].map((_, i) => (
                    <FaStar key={`full-${i}`} className="text-yellow-500" />
                  ))}
                  {hasHalfStar && <FaStarHalfAlt className="text-yellow-500" />}
                  {[...Array(emptyStars)].map((_, i) => (
                    <FaRegStar key={`empty-${i}`} className="text-yellow-500" />
                  ))}
                </div>
                <h1>Based on {product.reviews.length} reviews</h1>
              </div>

              <div className="mt-4 space-y-1">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = ratingCounts[star] || 0;
                  const percentage = totalReviews ? (count / totalReviews) * 100 : 0;
                  return (
                    <div key={star} className="flex items-center text-sm">
                      <span className="w-6">{star}★</span>
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

              {/* Example single review */}
              {product.reviews && product.reviews.length > 0 && (
                <div className="flex flex-col gap-4 mt-4">
                  {product.reviews.map((review, index) => (
                    <div key={index} className="flex flex-row gap-1 items-start">
                      <AiOutlineUser size={24} />
                      <div className="flex flex-col gap-1">
                        <div className="flex flex-row gap-1 items-center">
                          <h1>{review.reviewerName}</h1>
                          <div className="flex items-center gap-1">
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
                          <h1>{review.date.split("T")[0]}</h1>
                        </div>
                        <h1>{review.comment}</h1>
                        <div className="flex flex-row gap-2">
                          <h1 className="flex flex-row items-center"><FiThumbsUp/> Helpful()</h1>
                          <h1 className="flex flex-row items-center"><AiOutlineLike/> Reply</h1>
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

