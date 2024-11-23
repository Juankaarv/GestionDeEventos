import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages/ZonasList.css';

const ZonasList = () => {
  const [zonas, setZonas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchZonas = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/zonas');
        const data = await response.json();
        setZonas(data);
      } catch (error) {
        console.error('Error al cargar las zonas:', error);
      }
    };

    fetchZonas();
  }, []);

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
    <div className="zonaL-container">
      <h2>Listado de Zonas</h2>

      <button
        onClick={() => navigate('/Zonas')}
        className="crear-zona-btn"
      >
        Crear Zona
      </button>

      <table className="zona-table">
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
                  <button
                    onClick={() => navigate(`/ZonasEdit/${zona.zona_id}`)}
                    className="edit-btn"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(zona.zona_id)}
                    className="delete-btn"
                  >
                    Eliminar
                  </button>
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
