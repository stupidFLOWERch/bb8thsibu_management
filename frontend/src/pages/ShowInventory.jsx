import { useEffect, useState } from "react";
import TopBar from '../components/TopBar';
import InventoryCard from '../components/InventoryCard';
import '../styles/ShowInventory.css'
import { showInventory } from '../api/inventory';

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

  // const handleSubmitOrder = async () => {
  //   const orderItems = items
  //     .filter(item => item.orderQty > 0)
  //     .map(item => ({
  //       itemId: item.id,
  //       qty: item.orderQty
  //     }));
  
  //   if (orderItems.length === 0) {
  //     alert("No items selected");
  //     return;
  //   }
  
  //   try {
  //     const res = await fetch("http://localhost:5000/api/orders/place-order", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({
  //         userId: 1,
  //         items: orderItems
  //       })
  //     });
  
  //     const data = await res.json();
  
  //     if (!res.ok) {
  //       throw new Error(data.error);
  //     }
  
  //     alert("Order placed successfully!");
  
  //     // reset qty
  //     setItems(prev =>
  //       prev.map(item => ({
  //         ...item,
  //         orderQty: 0
  //       }))
  //     );
  
  //   } catch (err) {
  //     console.error(err);
  //     alert("Order failed: " + err.message);
  //   }
  // };

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

      <button className="submit-btn" onClick={handleSubmitOrder}>
        Submit Order
      </button>
    </div>
  );
}

export default ShowInventory;