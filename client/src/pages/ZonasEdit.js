import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../pages/zonasedit.css';

const EditZona = () => {
  const { id } = useParams();  // Obtener el id de la zona a editar desde la URL
  const [zona, setZona] = useState(null);
  const [eventos, setEventos] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    capacidad: '',
    precio_extra: '',
    descripcion: '',
    evento_id: ''
  });

  const navigate = useNavigate();

  // Cargar la zona a editar y los eventos disponibles
  useEffect(() => {
    const fetchZona = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/zonas/${id}`);
        const data = await response.json();
        setZona(data);
        setFormData({
          nombre: data.nombre,
          capacidad: data.capacidad,
          precio_extra: data.precio_extra,
          descripcion: data.descripcion,
          evento_id: data.evento_id
        });
      } catch (error) {
        console.error('Error al cargar la zona:', error);
      }
    };

    const fetchEventos = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/eventos');
        const data = await response.json();
        setEventos(data);
      } catch (error) {
        console.error('Error al cargar los eventos:', error);
      }
    };

    fetchZona();
    fetchEventos();
  }, [id]);

  // Actualizar los datos del formulario al cambiar un campo
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Enviar los datos actualizados al backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/api/zonas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Zona actualizada con éxito');
        navigate('/ZonasList');  // Redirigir a la lista de zonas
      } else {
        alert('Error al actualizar la zona');
      }
    } catch (error) {
      console.error('Error al actualizar la zona:', error);
      alert('Error al actualizar la zona');
    }
  };

  return (
    <div className='zona-container'>
      <h2>Editar Zona</h2>
      {zona && (
       <form onSubmit={handleSubmit}>
       <div className="form-row">
         <div>
           <label htmlFor="nombre">Nombre de la Zona</label>
           <input
             type="text"
             id="nombre"
             name="nombre"
             value={formData.nombre}
             onChange={handleInputChange}
             required
           />
         </div>
     
         <div>
           <label htmlFor="capacidad">Capacidad</label>
           <input
             type="number"
             id="capacidad"
             name="capacidad"
             value={formData.capacidad}
             onChange={handleInputChange}
             required
           />
         </div>
       </div>
     
       <div className="form-row">
         <div>
           <label htmlFor="precio_extra">Precio Extra</label>
           <input
             type="number"
             id="precio_extra"
             name="precio_extra"
             value={formData.precio_extra}
             onChange={handleInputChange}
             step="0.01"
             required
           />
         </div>
     
         <div>
           <label htmlFor="evento_id">Evento</label>
           <select
             id="evento_id"
             name="evento_id"
             value={formData.evento_id}
             onChange={handleInputChange}
             required
           >
             <option value="">Selecciona un evento</option>
             {eventos.map((evento) => (
               <option key={evento.id} value={evento.id}>
                 {evento.titulo}
               </option>
             ))}
           </select>
         </div>
       </div>
     
       <div>
         <label htmlFor="descripcion">Descripción</label>
         <textarea
           id="descripcion"
           name="descripcion"
           value={formData.descripcion}
           onChange={handleInputChange}
           required
         />
       </div>
     
       <div className="button-row">
         <button type="submit">Guardar Cambios</button>
         <button type="button" onClick={() => navigate('/ZonasList')}>
           Cancelar
         </button>
       </div>
     </form>
     
      )}
    </div>
  );
};

export default EditZona;
