import { useNavigate, useParams } from "react-router-dom";
import WelcomeBand from "../components/WelcomeBand";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { CartItem } from "../types/CartItem";
import 'bootstrap/dist/css/bootstrap.min.css';

function MyCart() {
    const navigate = useNavigate();
    const { title, projectId } = useParams();
    const { addToCart } = useCart();
    const [price, setPrice] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(1);

    const handleAddToCart = () => {
        const newItem: CartItem = {
            projectId: Number(projectId),
            title: title || "No project Found",
            price,
            quantity
        };
        addToCart(newItem);
        navigate('/cart');
    };

    return (
        <div className="container mt-4">
            <WelcomeBand />
            <h2>Add "{title}" to Cart</h2>
            <div className="mb-3">
                <label className="form-label">Enter Price</label>
                <input 
                    type="number" 
                    className="form-control"
                    placeholder="Enter Price" 
                    value={price} 
                    onChange={(e) => setPrice(Number(e.target.value))} 
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Enter Quantity</label>
                <input 
                    type="number" 
                    className="form-control"
                    placeholder="Enter Quantity" 
                    value={quantity} 
                    min="1"
                    onChange={(e) => setQuantity(Number(e.target.value))} 
                />
            </div>
            <button className="btn btn-primary" onClick={handleAddToCart}>Add to Cart</button>
            <button className="btn btn-secondary mt-2" onClick={() => navigate('/projects')}>Go Back</button>
        </div>
    );
}
export default MyCart;
