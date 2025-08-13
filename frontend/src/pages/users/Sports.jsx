import { useSelector } from "react-redux"
import Card from "../../components/Card"
import { useState } from "react";


const Sports = () => {
    const products = useSelector((state) => state.productReducer.products);

    const [sortType, setSortType] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    
    const sportsProducts = [...products]
      .filter((p) => p.category === "sports-accessories")
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
          <h2 className="text-4xl font-semibold mb-2">Sports</h2>
          <p className="text-lg font-normal opacity-60 text-center">
          Gear up for action with quality sports equipment, activewear, and fitness accessories.
          </p>
          <p className="font-normal text-sm opacity-50 mb-[3%]">{sportsProducts.length} Products Found</p>

          <div className="flex flex-col w-full md:flex-row md:items-center gap-1 md:justify-end">
            <label className="text-sm font-normal opacity-60">Sort By</label>
            <select
              className="bg-gray-200 p-1 rounded-lg font-normal"
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
        <section className="flex flex-row gap-16">
        <div className="hidden lg:flex flex-col gap-2 p-4 rounded w-[60%] max-w-[368px] h-[fit-content] shadow-md sticky top-[6%]">
          <h2 className="text-lg font-semibold">Filter</h2>
          <h3 className="text-md font-medium opacity-70">Price Range</h3>
          
          <div className="flex flex-row gap-1 w-full">
            <input
              type="number"
              placeholder="0"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="border border-gray-300 p-1 rounded w-full"
            />
            <input
              type="number"
              placeholder="5000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="border border-gray-300 p-1 rounded w-full"
            />
          </div>
          
          <button
            onClick={() => { setMinPrice(""); setMaxPrice(""); }}
            className="bg-gray-200 p-2 rounded-lg font-medium cursor-pointer mt-2 hover:bg-gray-300"
          >
            Reset Filter
          </button>
        </div>

          <div>
            {sportsProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sportsProducts.map((product) => (
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

export default  Sports