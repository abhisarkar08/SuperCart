import { useSelector } from "react-redux";
import Card from "../../components/Card";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { FiSettings } from "react-icons/fi";


const categoryMap = {
  beauty: ["beauty", "fragrances"],
  fashion: ["mens-shirts", "womens-dresses", "womens-shoes", "mens-shoes","womens-watches", "mens-watches", "sunglasses", "womens-jewellery", "womens-bags"],
  electronics: ["smartphones", "laptops", "tablets"],
  sports: ["sports-accessories"],
  groceries: ["groceries"],
  homeappli: ["home-decoration", "furniture", "kitchen-accessories"]
};

const categoryDescriptions = {
  beauty: "Glow up with premium skincare, cosmetics, and fragrances from top beauty brands.",
  fashion: "Stay in style with the latest trends in clothing, shoes, watches, and fashion accessories for all.",
  electronics: "Discover the latest in smartphones, laptops, tablets, and must-have accessories for your digital lifestyle.",
  sports: "Gear up for action with quality sports equipment, activewear, and fitness accessories.",
  groceries: "Shop everyday essentials and pantry favorites with fresh groceries delivered to your doorstep.",
  homeappli: "Upgrade your living space with modern furniture, stylish home decor, and essential kitchenware."
};

const Products = () => {
  const { category } = useParams();
  const products = useSelector((state) => state.productReducer.products);

  const [sortType, setSortType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  console.log("All products categories:", products.map(p => p.category));
  const filteredProducts = [...products]
    .filter((p) => {
      const allowedCategories = (categoryMap[category] || [category]).map(c => c.toLowerCase());
      return allowedCategories.includes(p.category.toLowerCase());
    })
    .filter((p) => {
      const min = minPrice !== "" ? parseFloat(minPrice) : 0;
      const max = maxPrice !== "" ? parseFloat(maxPrice) : Infinity;
      const priceInINR = p.price * 87;
      return priceInINR >= min && priceInINR <= max;
    })
    .sort((a, b) => {
      if (sortType === "price-asc") return a.price - b.price;
      if (sortType === "price-desc") return b.price - a.price;
      if (sortType === "rating") return b.rating - a.rating;
      if (sortType === "name") return a.title.localeCompare(b.title);
      return 0;
    });

  return (
    <div className="space-y-8 text-black md:max-w-[1536px] md:mx-auto">
      <section className="p-4 flex flex-col gap-1 justify-center items-center">
        <h2 className="text-3xl sm:text-4xl md:text-[2.4rem] font-semibold mb-2">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </h2>
        <p className="text-lg  font-normal opacity-60 text-center mb-2">
            {categoryDescriptions[category] || ""}
        </p>
        <p className="font-normal text-sm opacity-60 mb-[3%]">
          {filteredProducts.length} Products Found
        </p>

        <div className="flex flex-col w-full md:flex-row md:items-center gap-1 md:justify-end md:gap-2">
          <label className="text-base font-normal opacity-60 flex flex-row gap-1 items-center">
            <span><FiSettings /></span>Sort By:
          </label>
          <select
            className="bg-gray-100 p-1 rounded-lg font-normal sm:py-2 md:w-[15%] sm:px-2 md:text-md"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="">Name: A-Z</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highly Rated</option>
            <option value="name">Name</option>
          </select>
        </div>
      </section>

      <section className="flex flex-row gap-10 justify-center">
        {/* Sidebar Filter */}
        <div className="hidden lg:flex flex-col gap-6 px-6 py-4 rounded w-[43%] max-w-[368px] max-h-[240px] shadow-md bg-white">
          <h2 className="text-lg font-semibold">Filters</h2>
          <div className="flex flex-col gap-3">
            <h3 className="text-md font-medium opacity-80">Price Range</h3>
            <div className="flex flex-row gap-1 w-full">
              <input
                type="number"
                placeholder="0"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="border border-gray-300 p-1 rounded-lg w-full"
              />
              <input
                type="number"
                placeholder="5000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="border border-gray-300 p-1 rounded-lg w-full"
              />
            </div>
          </div>
          <button
            onClick={() => { setMinPrice(""); setMaxPrice(""); }}
            className="bg-gray-100 p-2 rounded-xl font-medium cursor-pointer mt-2 hover:bg-gray-200"
          >
            Reset Filter
          </button>
        </div>

        {/* Product Cards */}
        <div>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <Card key={product.id} product={product} />
              ))}
            </div>
          ) : (
            'lo'
          )}
        </div>
      </section>
    </div>
  );
};

export default Products;
