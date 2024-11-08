import React, { useState } from 'react';
import './App.css';

function App() {
  const [legs, setLegs] = useState('');
  const [wings, setWings] = useState('');
  const [flesh, setFlesh] = useState('');
  const [orderResult, setOrderResult] = useState(null);

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ legs, wings, flesh })
    });

    const result = await response.json();
    setOrderResult(result);
  };

  return (
    <div className="App">
      <h1>Poultry Shop</h1>
      <form onSubmit={handleOrderSubmit}>
        <label>
          Legs:
          <input
            type="number"
            placeholder="Enter legs"
            value={legs}
            onChange={(e) => setLegs(e.target.value)}
          />
        </label>
        <label>
          Wings:
          <input
            type="number"
            placeholder="Enter wings"
            value={wings}
            onChange={(e) => setWings(e.target.value)}
          />
        </label>
        <label>
          Flesh:
          <input
            type="number"
            placeholder="Enter flesh portions"
            value={flesh}
            onChange={(e) => setFlesh(e.target.value)}
          />
        </label>
        <button type="submit">Submit Order</button>
      </form>
      {orderResult && (
        <div>
          <h2>Order Summary</h2>
          <p>Total Weight: {orderResult.totalWeight} kg</p>
          <p>Whole Chickens Needed: {orderResult.wholeChickens}</p>
          <p>Remaining Legs: {orderResult.remaining.legs} ({orderResult.remaining.legsWeight} kg)</p>
          <p>Remaining Wings: {orderResult.remaining.wings} ({orderResult.remaining.wingsWeight} kg)</p>
          <p>Remaining Flesh Portions: {orderResult.remaining.flesh} ({orderResult.remaining.fleshWeight} kg)</p>
          <p>Total Remaining Weight: {orderResult.remaining.totalWeight} kg</p>
        </div>
      )}
    </div>
  );
}

export default App;
