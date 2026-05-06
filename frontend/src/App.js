
import React, { useState, useEffect } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [status, setStatus] = useState('Loading...');

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchItems();
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      const response = await fetch(`${API_URL}/api/health`);
      const data = await response.json();
      setStatus(`Backend: ${data.status}`);
    } catch (err) {
      setStatus('Backend: Disconnected');
    }
  };

  const fetchItems = async () => {
    try {
      const response = await fetch(`${API_URL}/api/items`);
      const data = await response.json();
      setItems(data);
    } catch (err) {
      console.error('Error fetching items:', err);
    }
  };

  const addItem = async () => {
    if (!newItem.trim()) return;
    try {
      const response = await fetch(`${API_URL}/api/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newItem }),
      });
      const data = await response.json();
      setItems([...items, data]);
      setNewItem('');
    } catch (err) {
      console.error('Error adding item:', err);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial', maxWidth: '800px', margin: '50px auto', padding: '20px' }}>
      <h1>📦 Multi-Container App</h1>
      <div style={{ background: '#e0f7fa', padding: '10px', borderRadius: '5px' }}>
        <strong>Status:</strong> {status}
      </div>

      <h2>Items</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name} (ID: {item.id})</li>
        ))}
      </ul>

      <div>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Enter new item"
          style={{ padding: '8px', marginRight: '10px' }}
        />
        <button onClick={addItem} style={{ padding: '8px 16px' }}>Add Item</button>
      </div>
    </div>
  );
}

export default App;
