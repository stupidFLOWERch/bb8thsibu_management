import { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import { getOrderHistory, getOrderDetails, completeOrder } from "../api/order";
import "../styles/InventoryHistory.css";
import { checkStock, decreaseStock } from "../api/inventory";

function InventoryHistory() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [details, setDetails] = useState([]);

  const formatUTC = (time) => {
    return time.replace("T", " ").replace("Z", "");
  };

  useEffect(() => {
    async function loadOrders() {
      try {
        const data = await getOrderHistory();
        setOrders(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadOrders();
  }, []);

  //  click order → fetch details
  const handleClickOrder = async (orderId) => {
    try {
      setSelectedOrder(orderId);
      const data = await getOrderDetails(orderId);
      setDetails(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCompleteOrder = async () => {
    try {
      const res = await checkStock(selectedOrder,);
      if (!res.valid) {
        alert(res.message || "Insufficient stock");
        return; // ❗必须 stop
      }

      const orderItems = details.map(item => ({
        items: item.Items,
        qty: item.Quantity
      }));

      await completeOrder(selectedOrder);
      await decreaseStock(orderItems);

      setOrders((prev) =>
        prev.map((order) =>
          order.id === selectedOrder
            ? { ...order, status: "Completed" }
            : order
        )
      );
      alert("Order completed!");

    }catch (err) {
      console.error(err);
      alert("Failed to complete order.");
    }
  };

  return (
    <div className="menu-page">
      <TopBar />

      <h2>Pending Order</h2>

      {/* ORDER TABLE */}
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Member</th>
            <th>Status</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              onClick={() => handleClickOrder(order.id)}  
              className={selectedOrder === order.id ? "active-row" : ""}
            >
              <td>{order.id}</td>
              <td>{order.user}</td>
              <td className={`status-${order.status.toLowerCase()}`}>
                {order.status}
              </td>

              <td>{formatUTC(order.time)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ORDER DETAILS */}
      {selectedOrder && (
        <div className="details-box">
          <h3>Order #{selectedOrder} Details</h3>

          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
              </tr>
            </thead>

            <tbody>
              {details.map((item, index) => (
                <tr key={index}>
                  <td>{item.Items}</td>
                  <td>{item.Quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="details-actions">
            <button
              className="complete-btn"
              onClick={handleCompleteOrder}
            >
              Complete Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default InventoryHistory;