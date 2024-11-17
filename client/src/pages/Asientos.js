import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
 
const AsientosList = () => {
  const [asientos, setAsientos] = useState([]);
  const navigate = useNavigate();
 
  // Cargar los asientos desde el backend
  useEffect(() => {
    const fetchAsientos = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/asientos');
        const data = await response.json();
        setAsientos(data);
      } catch (error) {
        console.error('Error al cargar los asientos:', error);
      }
    };
 
    fetchAsientos();
  }, []);
 
  // Eliminar asiento
  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este asiento?')) {
      try {
        const response = await fetch(`http://localhost:3001/api/asientos/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setAsientos(asientos.filter((asiento) => asiento.asiento_id !== id));
          alert('Asiento eliminado con éxito');
        } else {
          alert('Error al eliminar el asiento');
        }
      } catch (error) {
        console.error('Error al eliminar el asiento:', error);
        alert('Error al eliminar el asiento');
      }
    }
  };
 
  return (
<div>
<h2>Listado de Asientos</h2>
 
      {/* Botón "Crear Nuevo Asiento" */}
<button
        onClick={() => navigate('/AsientosCreate')}
        style={{
          display: 'block',
          margin: '20px auto',
          padding: '10px 20px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
>
        Crear Nuevo Asiento
</button>
 
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
<thead>
<tr>
<th style={{ border: '1px solid black', padding: '8px' }}>Zona</th>
<th style={{ border: '1px solid black', padding: '8px' }}>Fila</th>
<th style={{ border: '1px solid black', padding: '8px' }}>Número</th>
<th style={{ border: '1px solid black', padding: '8px' }}>Estado</th>
<th style={{ border: '1px solid black', padding: '8px' }}>Acciones</th>
</tr>
</thead>
<tbody>
          {asientos.length > 0 ? (
            asientos.map((asiento) => (
<tr key={asiento.asiento_id}>
<td style={{ border: '1px solid black', padding: '8px' }}>{asiento.zona_nombre}</td>
<td style={{ border: '1px solid black', padding: '8px' }}>{asiento.fila}</td>
<td style={{ border: '1px solid black', padding: '8px' }}>{asiento.numero}</td>
<td style={{ border: '1px solid black', padding: '8px' }}>{asiento.estado}</td>
<td style={{ border: '1px solid black', padding: '8px' }}>
<button
                    style={{ marginRight: '10px' }}
                    onClick={() => navigate(`/AsientoEdit/${asiento.asiento_id}`)}
>
                    Editar
</button>
<button onClick={() => handleDelete(asiento.asiento_id)}>Eliminar</button>
</td>
</tr>
            ))
          ) : (
<tr>
<td colSpan="5" style={{ textAlign: 'center', padding: '8px' }}>
                No hay asientos disponibles.
</td>
</tr>
          )}
</tbody>
</table>
</div>
  );
};
 
export default AsientosList;