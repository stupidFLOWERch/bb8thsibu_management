import { useEffect, useState } from "react";
import TopBar from '../components/TopBar';
import InventoryCard from '../components/InventoryCard';
import '../styles/ShowInventory.css'
import { showInventory, orderInventory } from '../api/inventory';

function ShowInventory() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const data = await showInventory();

      const formatted = data.map(item => ({
        ...item,
        orderQty: 0
      }));

      setItems(formatted);
    } catch (err) {
      console.error("Failed to fetch inventory:", err);
    }
  };

  const updateQty = (id, type) => {
    setItems(prev =>
      prev.map(item => {
        if (item.id === id) {
          return {
            ...item,
            orderQty:
              type === "add"
                ? item.orderQty + 1
                : Math.max(0, item.orderQty - 1)
          };
        }
        return item;
      })
    );
  };

  const handleSubmitOrder = async () => {
    const orderItems = items
      .filter(item => item.orderQty > 0)
      .map(item => ({
        itemId: item.id,
        qty: item.orderQty
      }));
  
    if (orderItems.length === 0) {
      alert("No items selected");
      return;
    }
  
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const data = await orderInventory({
        userId: user.userId,
        items: orderItems
      });
  
      console.log(data);
  
      alert("Order placed successfully!");
  
      setItems(prev =>
        prev.map(item => ({
          ...item,
          orderQty: 0
        }))
      );
  
    } catch (err) {
      console.error(err);
      alert("Order failed: " + err.message);
    }
  };

  return (
    <div className="menu-page">
      <TopBar />

      <div className="inventory-grid">
        {items.map(item => (
          <InventoryCard
            key={item.id}
            item={item}
            onAdd={() => updateQty(item.id, "add")}
            onMinus={() => updateQty(item.id, "minus")}
          />
        ))}
      </div>

      <div className="checkout-bar">
        <div className="checkout-inner">
          <div className="checkout-left">
            Total Items: {items.reduce((sum, i) => sum + i.orderQty, 0)}
          </div>

          <button className="checkout-btn" onClick={handleSubmitOrder}>
            Submit Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShowInventory;