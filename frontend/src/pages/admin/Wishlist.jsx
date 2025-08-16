    import { useEffect, useState } from "react";
    import Card from "../../components/Card"; // tumhara existing Card component


    const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlist(savedWishlist);
    }, []);

    return (
        <div className="min-h-screen px-4 py-6 text-black">
        <h1 className="text-3xl font-semibold mb-6 ml-2">My Wishlist</h1>

        {wishlist.length === 0 ? (
            <p className="text-lg font-normal text-red-400">Your Wishlist is empty.</p>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map((product) => (
                <Card key={product.id} product={product} />
            ))}
            </div>
        )}
        </div>
    );
    };

    export default Wishlist;

