import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages/AsientoCreate.css';
const CreateAsiento = () => {
  const [formData, setFormData] = useState({
    zona_id: '',
    fila: '',
    numero: '',
    estado: 'disponible',
  });
  const [zonas, setZonas] = useState([]);
  const navigate = useNavigate();

  // Cargar las zonas disponibles
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/asientos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Asiento creado con éxito');
        navigate('/asientos');
      } else {
        alert('Error al crear el asiento');
      }
    } catch (error) {
      console.error('Error al crear el asiento:', error);
      alert('Error al crear el asiento');
    }
  };

  return (
    <div className='asientoscre-container'>
      <h2>Crear Nuevo Asiento</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="zona_id">Zona</label>
          <select
            id="zona_id"
            name="zona_id"
            value={formData.zona_id}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una zona</option>
            {zonas.map((zona) => (
              <option key={zona.zona_id} value={zona.zona_id}>
                {zona.zona_nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="fila">Fila</label>
          <input
            type="text"
            id="fila"
            name="fila"
            value={formData.fila}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="numero">Número</label>
          <input
            type="number"
            id="numero"
            name="numero"
            value={formData.numero}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="estado">Estado</label>
          <select
            id="estado"
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            required
          >
            <option value="disponible">Disponible</option>
            <option value="reservado">Reservado</option>
            <option value="vendido">Vendido</option>
          </select>
        </div>

        <button type="submit">Crear Asiento</button>
      </form>
    </div>
  );
};

export default CreateAsiento;
