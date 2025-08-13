import { useSelector } from "react-redux"
import Card from "../../components/Card"


const Electronics = () => {
    const products = useSelector((state) => state.productReducer.products);
    
    const electronicsProducts = products.filter(
        (p) => p.category === "laptops" || p.category === "smartphones" || p.category === "tablets"
    );

    return electronicsProducts.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {electronicsProducts.map((product) => (
        <Card key={product.id} product={product} />
      ))}
    </div>
  ) : (
    "Loading..."
  );
}

export default Electronics