import { useSelector } from "react-redux"
import Card from "../../components/Card"
import { useState } from "react";


const Electronics = () => {
    const products = useSelector((state) => state.productReducer.products);
    
    const [sortType, setSortType] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    
    const electronicsProducts = [...products]
      .filter((p) => p.category === "laptops" || p.category === "smartphones" || p.category === "tablets")
      .filter((p) => {
        const min = minPrice ? parseFloat(minPrice) : 0;
        const max = maxPrice ? parseFloat(maxPrice) : Infinity;
        return p.price >= min && p.price <= max;
      })
      .sort((a, b) => {
        if (sortType === "price-asc") return a.price - b.price;
        if (sortType === "price-desc") return b.price - a.price;
        if (sortType === "rating") return b.rating - a.rating;
        if (sortType === "name") return a.title.localeCompare(b.title);
        return 0; // default: no sorting
      });

    return (
      <div className="space-y-8 text-black md:max-w-[1536px] md:mx-auto ">
        {/* Section 1: Content */}
        <section className="p-4 flex flex-col gap-1 justify-center items-center">
          <h2 className="text-3xl sm:text-4xl md:text-[2.4rem] font-semibold mb-2">Electronics</h2>
          <p className="text-lg sm:text-[1.2rem] font-normal opacity-60 text-center">
          Discover the latest in smartphones, laptops, tablets, and must-have accessories for your digital lifestyle.
          </p>
          <p className="font-normal text-sm sm:text-base opacity-60 mb-[3%]">{electronicsProducts.length} Products Found</p>

          <div className="flex flex-col w-full md:flex-row md:items-center gap-1 md:justify-end md:gap-2">
            <label className="text-base font-normal opacity-60">Sort By: </label>
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

  
        {/* Section 2: Product Cards */}
        <section className="flex flex-row gap-10 justify-center">
        <div className="hidden lg:flex flex-col gap-6 px-6 py-4 rounded w-[43%] max-w-[368px] max-h-[240px] shadow-md -translate-y-15">
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

          <div>
            {electronicsProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-8">
                {electronicsProducts.map((product) => (
                  <Card key={product.id} product={product} />
                ))}
              </div>
            ) : (
              "Loading..."
            )}
          </div>
        </section>
      </div>
    );
}

export default Electronics