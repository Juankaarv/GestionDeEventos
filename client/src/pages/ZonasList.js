import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
 import '../pages/ZonasList.css';
const ZonasList = () => {
  const [zonas, setZonas] = useState([]);
  const navigate = useNavigate();
 
  // Cargar las zonas desde el backend
  useEffect(() => {
    const fetchZonas = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/zonas'); // Asegúrate de que esta ruta sea correcta
        const data = await response.json();
        setZonas(data);
      } catch (error) {
        console.error('Error al cargar las zonas:', error);
      }
    };
 
    fetchZonas();
  }, []);
 
  // Eliminar zona
  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta zona?')) {
      try {
        const response = await fetch(`http://localhost:3001/api/zonas/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setZonas(zonas.filter((zona) => zona.zona_id !== id));
          alert('Zona eliminada con éxito');
        } else {
          alert('Error al eliminar la zona');
        }
      } catch (error) {
        console.error('Error al eliminar la zona:', error);
        alert('Error al eliminar la zona');
      }
    }
  };
 
  return (
<div className='zona-container'>
<h2>Listado de Zonas</h2>
 
      {/* Botón "Crear Zona" */}
<button 
        onClick={() => navigate('/Zonas')}
        style={{
          display: 'block',
          margin: '20px auto',
          padding: '10px 20px',
          backgroundColor: '#A86666',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
>
        Crear Zona
</button>
 
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
<thead>
<tr>
<th style={{ border: '1px solid black', padding: '8px' }}>Nombre de Zona</th>
<th style={{ border: '1px solid black', padding: '8px' }}>Capacidad</th>
<th style={{ border: '1px solid black', padding: '8px' }}>Precio Extra</th>
<th style={{ border: '1px solid black', padding: '8px' }}>Descripción</th>
<th style={{ border: '1px solid black', padding: '8px' }}>Evento</th>
<th style={{ border: '1px solid black', padding: '8px' }}>Acciones</th>
</tr>
</thead>
<tbody>
          {zonas.length > 0 ? (
            zonas.map((zona) => (
<tr key={zona.zona_id}>
<td style={{ border: '1px solid black', padding: '8px' }}>{zona.zona_nombre}</td>
<td style={{ border: '1px solid black', padding: '8px' }}>{zona.capacidad}</td>
<td style={{ border: '1px solid black', padding: '8px' }}>{zona.precio_extra}</td>
<td style={{ border: '1px solid black', padding: '8px' }}>{zona.descripcion}</td>
<td style={{ border: '1px solid black', padding: '8px' }}>{zona.evento_titulo}</td>
<td style={{ border: '1px solid black', padding: '8px' }}>
<button
                    style={{ marginRight: '10px' }}
                    onClick={() => navigate(`/ZonasEdit/${zona.zona_id}`)}
>
                    Editar
</button>
<button onClick={() => handleDelete(zona.zona_id)}>Eliminar</button>
</td>
</tr>
            ))
          ) : (
<tr>
<td colSpan="6" style={{ textAlign: 'center', padding: '8px' }}>
                No hay zonas disponibles.
</td>
</tr>
          )}
</tbody>
</table>
</div>
  );
};
 
export default ZonasList;