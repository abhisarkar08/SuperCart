import { useSelector } from "react-redux"
import Card from "../../components/Card"


const Homeappli = () => {
    const products = useSelector((state) => state.productReducer.products);
    
    const homeappliProducts = products.filter(
        (p) => p.category === "home-decoration" || p.category === "furniture" || p.category === "kitchen-accessories"
    );

    return homeappliProducts.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {homeappliProducts.map((product) => (
        <Card key={product.id} product={product} />
      ))}
    </div>
  ) : (
    "Loading..."
  );
}

export default  Homeappli