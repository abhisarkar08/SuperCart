import { useSelector } from "react-redux"
import Card from "../../components/Card"


const Fashion = () => {
    const products = useSelector((state) => state.productReducer.products);
    
    const fashionProducts = products.filter((p) =>
      ["mens-shirts", "womens-dresses", "mens-shoes", "womens-shoes", "womens-watches", "mens-watches", "sunglasses", "womens-jewellery", "womens-bags"].includes(p.category?.trim().toLowerCase())
    );


    return fashionProducts.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {fashionProducts.map((product) => (
        <Card key={product.id} product={product} />
      ))}
    </div>
  ) : (
    "Loading..."
  );
}

export default  Fashion