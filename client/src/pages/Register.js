import React, { useState } from 'react';
import '../pages/Register.css';

import logo from '../img/LogoUticket.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    celular: '',
    cedula: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validatePassword = () => {
    const { password, repeatPassword } = formData;
    let validationErrors = {};

    if (password !== repeatPassword) {
      validationErrors.passwordMatch = "Las contraseñas no coinciden.";
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    if (!passwordRegex.test(password)) {
      validationErrors.passwordStrength =
        "La contraseña debe tener entre 8 y 20 caracteres, una letra mayúscula, un número y un carácter especial.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validatePassword()) {
      try {
        await axios.post('http://localhost:3001/api/usuarios', {
          nombres: formData.nombre,
          apellidos: formData.apellido,
          correo_electronico: formData.email,
          contrasena: formData.password,
          carnet: formData.cedula,
          numero_celular: formData.celular,
        });

        setSuccessMessage('¡Registro exitoso! Redirigiendo...');
        setTimeout(() => navigate('/login'), 2000);
      } catch (error) {
        setErrors({ server: error.response?.data?.error || 'Error al registrar usuario.' });
      }
    }
  };

  return (
  <div> 
  
  
    <div className="register-background">
      <div className="register-container">
        <div className="form-section">
          <h2>Crear cuenta</h2>
          <p>
            Si eres nuevo crea tu cuenta, sino{' '}
            <Link to="/login">inicia sesión aquí</Link>.
          </p>
          <form onSubmit={handleSubmit}>
            {['nombre', 'apellido', 'celular', 'cedula', 'email'].map((field) => (
              <input
                key={field}
                type={field === 'email' ? 'email' : 'text'}
                name={field}
                placeholder={`Ingresa tu ${field}`}
                value={formData[field]}
                onChange={handleChange}
                required
              />
            ))}
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="repeatPassword"
              placeholder="Repite tu contraseña"
              value={formData.repeatPassword}
              onChange={handleChange}
              required
            />
            {errors.passwordMatch && <p className="error-message">{errors.passwordMatch}</p>}
            {errors.passwordStrength && <p className="error-message">{errors.passwordStrength}</p>}
            {errors.server && <p className="error-message">{errors.server}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <button type="submit">Crear cuenta</button>
          </form>
        </div>
        <div className="logo-section">
          <img src={logo} alt="Logo Utickets" />
        </div>
      </div>
    </div>
    </div>
  );
};

export default Register;
