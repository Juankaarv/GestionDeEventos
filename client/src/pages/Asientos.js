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
      <table>
        <thead>
          <tr>
            <th>Zona</th>
            <th>Fila</th>
            <th>Número</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {asientos.length > 0 ? (
            asientos.map((asiento) => (
              <tr key={asiento.asiento_id}>
                <td>{asiento.zona_nombre}</td>
                <td>{asiento.fila}</td>
                <td>{asiento.numero}</td>
                <td>{asiento.estado}</td>
                <td>
                  <button onClick={() => navigate(`/AsientoEdit/${asiento.asiento_id}`)}>Editar</button>
                  <button onClick={() => handleDelete(asiento.asiento_id)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No hay asientos disponibles.</td>
            </tr>
          )}
        </tbody>
      </table>
      <button onClick={() => navigate('/AsientosCreate')}>Crear Nuevo Asiento</button>
    </div>
  );
};

export default AsientosList;
