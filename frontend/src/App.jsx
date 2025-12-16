import { useState, useEffect } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/items')
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.error('Erro:', error));
  }, []);

  const handleAddItem = () => {
    if (!name) return;

    fetch('http://localhost:3000/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    })
    .then(response => response.json())
    .then(newItem => {
      setItems([...items, newItem.item]);
      setName('');
    });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/items/${id}`, {
      method: 'DELETE',
    })
    .then(() => {
      setItems(items.filter(item => item._id !== id));
    })
    .catch(error => console.error('Erro ao deletar:', error));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Lista de Itens</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Digite um nome"
          style={{ padding: '5px', marginRight: '5px' }}
        />
        <button onClick={handleAddItem} style={{ padding: '5px' }}>COLOQUE</button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map(item => (
          <li key={item._id} style={{  
            margin: '5px 0', 
            padding: '10px', 
            display: 'flex', 
            justifyContent: 'space-between',
            maxWidth: '300px'
          }}>
            <span>{item.name}</span>
            <button 
              onClick={() => handleDelete(item._id)}
              style={{ background: 'red', color: 'white', border: 'none', cursor: 'pointer' }}
            >
              APAGUE
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;