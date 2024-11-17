import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ZonasList = () => {
  const [zonas, setZonas] = useState([]);
  const navigate = useNavigate();

  // Cargar las zonas desde el backend
  useEffect(() => {
    const fetchZonas = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/zonas'); // Asegúrate que esta ruta sea correcta
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
    <div>
      <h2>Listado de Zonas</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre de Zona</th>
            <th>Capacidad</th>
            <th>Precio Extra</th>
            <th>Descripción</th>
            <th>Evento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {zonas.length > 0 ? (
            zonas.map((zona) => (
              <tr key={zona.zona_id}>
                <td>{zona.zona_nombre}</td>
                <td>{zona.capacidad}</td>
                <td>{zona.precio_extra}</td>
                <td>{zona.descripcion}</td>
                <td>{zona.evento_titulo}</td>
                <td>
                  {/* Botón de editar */}
                  <button onClick={() => navigate(`/ZonasEdit/${zona.zona_id}`)}>
                    Editar
                  </button>
                  <button onClick={() => handleDelete(zona.zona_id)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No hay zonas disponibles.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ZonasList;
