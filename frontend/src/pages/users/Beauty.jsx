import { useSelector } from "react-redux"
import Card from "../../components/Card"


const Beauty = () => {
    const products = useSelector((state) => state.productReducer.products);
    
    const beautyProducts = products.filter(
        (p) => p.category === "beauty" || p.category === "fragrances"
    );

    return beautyProducts.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {beautyProducts.map((product) => (
        <Card key={product.id} product={product} />
      ))}
    </div>
  ) : (
    "Loading..."
  );
}

export default  Beauty