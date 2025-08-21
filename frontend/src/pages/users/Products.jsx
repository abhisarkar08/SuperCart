import { useSelector } from "react-redux";
import Card from "../../components/Card";
import { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { FiSettings } from "react-icons/fi";

const categoryMap = {
  beauty: ["beauty", "fragrances"],
  fashion: [
    "mens-shirts",
    "womens-dresses",
    "womens-shoes",
    "mens-shoes",
    "womens-watches",
    "mens-watches",
    "sunglasses",
    "womens-jewellery",
    "womens-bags",
  ],
  electronics: ["smartphones", "laptops", "tablets"],
  sports: ["sports-accessories"],
  groceries: ["groceries"],
  homeappli: ["home-decoration", "furniture", "kitchen-accessories"],
};

const categoryDescriptions = {
  beauty: "Glow up with premium skincare, cosmetics, and fragrances from top beauty brands.",
  fashion: "Stay in style with the latest trends in clothing, shoes, watches, and fashion accessories for all.",
  electronics: "Discover the latest in smartphones, laptops, tablets, and must-have accessories for your digital lifestyle.",
  sports: "Gear up for action with quality sports equipment, activewear, and fitness accessories.",
  groceries: "Shop everyday essentials and pantry favorites with fresh groceries delivered to your doorstep.",
  homeappli: "Upgrade your living space with modern furniture, stylish home decor, and essential kitchenware.",
};

const categoryDisplayNames = {
  homeappli: "Home & Kitchen",
};

const Products = () => {
  const { category } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  const products = useSelector((state) => state.productReducer.products) || [];

  const [sortType, setSortType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);

  // Step 1: Filter by category first
  const categoryProducts = products.filter((p) => {
    if (!category) return true;
    const cat = p?.category?.toLowerCase?.() || "";
    const allowedCategories = (categoryMap[category] || [category]).map((c) =>
      c?.toLowerCase?.() || ""
    );
    return allowedCategories.includes(cat);
  });

  // Step 2: Filter by search (for brand list also)
  const searchFilteredProducts = categoryProducts.filter((p) => {
    if (!searchQuery) return true;
    const title = p?.title?.toLowerCase?.() || "";
    return title.includes(searchQuery);
  });

  // Step 3: Available brands based on search + category
  const availableBrands = [
    ...new Set(searchFilteredProducts.map((p) => p?.brand).filter(Boolean)),
  ];

  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

  // Step 4: Final filtered products
  const filteredProducts = searchFilteredProducts
    .filter((p) => {
      const min = minPrice !== "" ? parseFloat(minPrice) : 0;
      const max = maxPrice !== "" ? parseFloat(maxPrice) : Infinity;
      const priceInINR = (p?.price || 0) * 87;
      return priceInINR >= min && priceInINR <= max;
    })
    .filter((p) =>
      selectedBrands.length === 0 || selectedBrands.includes(p?.brand)
    )
    .sort((a, b) => {
      if (sortType === "price-asc") return (a?.price || 0) - (b?.price || 0);
      if (sortType === "price-desc") return (b?.price || 0) - (a?.price || 0);
      if (sortType === "rating") return (b?.rating || 0) - (a?.rating || 0);
      if (sortType === "name")
        return (a?.title || "").localeCompare(b?.title || "");
      return 0;
    });

  return (
    <div className="space-y-8 text-black md:max-w-[1536px] md:mx-auto">
      <section className="p-4 flex flex-col gap-1 justify-center items-center">
        <h2 className="text-3xl sm:text-4xl md:text-[2.4rem] font-semibold mb-2">
          {category
            ? categoryDisplayNames[category] ||
              (category?.charAt?.(0)?.toUpperCase?.() || "") +
                (category?.slice?.(1) || "")
            : "All Products"}
        </h2>
        <p className="text-lg font-normal opacity-60 text-center mb-2">
          {categoryDescriptions[category] || ""}
        </p>
        <p className="font-normal text-sm opacity-60 mb-[3%]">
          {filteredProducts.length} Products Found
        </p>

        <div className="flex flex-col w-full md:flex-row md:items-center gap-1 md:justify-end md:gap-2">
          <label className="text-base font-normal opacity-60 flex flex-row gap-1 items-center">
            <span>
              <FiSettings />
            </span>
            Sort By:
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
        <div
          className={`hidden lg:flex flex-col gap-6 px-6 py-4 rounded w-[43%] max-w-[368px] shadow-md bg-white
          sticky top-[8rem]
          ${availableBrands.length > 0 ? "max-h-[420px]" : "max-h-[260px]"}`}
        >
          <h2 className="text-lg font-semibold">Filters</h2>

          {availableBrands.length > 0 && (
            <div className="flex flex-col gap-3">
              <h3 className="text-md font-medium opacity-80">Brand</h3>
              <div className="flex flex-col gap-2 max-h-[130px] overflow-y-auto">
                {availableBrands.map((brand) => (
                  <label key={brand} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleBrandChange(brand)}
                    />
                    {brand}
                  </label>
                ))}
              </div>
            </div>
          )}

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
            onClick={() => {
              setMinPrice("");
              setMaxPrice("");
              setSelectedBrands([]);
            }}
            className="bg-gray-100 p-2 rounded-xl font-medium cursor-pointer mt-2 hover:bg-gray-200"
          >
            Reset Filters
          </button>
        </div>

        {/* Product Cards */}
        <div>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <Card key={product?.id} product={product} />
              ))}
            </div>
          ) : (
            "No products found"
          )}
        </div>
      </section>
    </div>
  );
};

export default Products;






