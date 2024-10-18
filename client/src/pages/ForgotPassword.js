// src/pages/ForgotPassword.js
import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3001/api/usuarios/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ correo_electronico: email })
      });

      if (response.ok) {
        setMessage('Revisa tu correo electrónico para restablecer tu contraseña.');
      } else {
        setMessage('Hubo un error enviando el correo. Inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error al conectar con el servidor.');
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Olvidé mi contraseña</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Ingresa tu correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Enviar enlace de restablecimiento</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
