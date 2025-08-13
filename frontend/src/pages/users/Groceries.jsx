import { useSelector } from "react-redux"
import Card from "../../components/Card"


const Groceries = () => {
    const products = useSelector((state) => state.productReducer.products);
    
    const groceriesProducts = products.filter(
        (p) => p.category === "groceries"
    );

    return groceriesProducts.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {groceriesProducts.map((product) => (
        <Card key={product.id} product={product} />
      ))}
    </div>
  ) : (
    "Loading..."
  );
}

export default  Groceries