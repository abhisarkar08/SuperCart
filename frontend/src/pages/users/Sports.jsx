import { useSelector } from "react-redux"
import Card from "../../components/Card"


const Sports = () => {
    const products = useSelector((state) => state.productReducer.products);
    
    const sportsProducts = products.filter(
        (p) => p.category === "sports-accessories"
    );

    return sportsProducts.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {sportsProducts.map((product) => (
        <Card key={product.id} product={product} />
      ))}
    </div>
  ) : (
    "Loading..."
  );
}

export default  Sports