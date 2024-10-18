import React, { useState } from 'react';
import './Register.css'; 
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    celular: '',
    cedula: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Preparar los datos que se enviarán
    const dataToSend = {
      nombre: formData.nombre,
      correo_electronico: formData.email, // Asegurarse de que coincida con el backend
      contrasena: formData.password,
      carnet: formData.cedula,
      rol_id: 1 // Supón que rol_id es fijo por ahora, se puede cambiar según necesidad
    };

    try {
      const response = await fetch('http://localhost:3001/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });

      if (response.ok) {
        setMessage('Usuario registrado exitosamente');
      } else {
        setMessage('Error registrando el usuario');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error al conectar con el servidor');
    }
  };

  return (
    <div className="register-background">
      <div className="register-container">
        <h2>Crear cuenta</h2>
        <p>
          Si eres nuevo crea tu cuenta, sino{' '}
          <Link to="/login">inicia sesión aquí</Link>.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre"
            placeholder="Ingresa tu nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="apellido"
            placeholder="Ingresa tus apellidos"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="celular"
            placeholder="Ej: 7777777"
            value={formData.celular}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="cedula"
            placeholder="Ej: 1234567"
            value={formData.cedula}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Ingresa tu correo electrónico"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="********"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Crear cuenta</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Register;
