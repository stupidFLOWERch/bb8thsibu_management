import './Card.css'

function InventoryCard({ item, onAdd, onMinus }) {
  console.log(
    `${import.meta.env.VITE_API_URL}${item.image}`
  );
    return (
      
      <div className="inventory-card inventory-grid">
        
        <div className="img-wrapper">
          <img src={item.image} />
        </div>

        <h3>{item.name}</h3>
  
        <p>Stock: {item.stock}</p>
  
        <div className="qty-controls">
          <button onClick={onMinus}>-</button>
  
          <span>{item.orderQty}</span>
  
          <button onClick={onAdd}>+</button>
        </div>
      </div>

      
    );
  }
  
  export default InventoryCard;