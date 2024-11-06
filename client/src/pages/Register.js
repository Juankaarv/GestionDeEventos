import React, { useState } from 'react';
import './Register.css'; 
import logo from '../img/LogoUticket.png';
import { Link } from 'react-router-dom';
import axios from 'axios';  // Importar axios

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    celular: '',
    cedula: '',
    email: '',
    password: '',
    repeatPassword: ''
  });

  const [passwordMatchError, setPasswordMatchError] = useState('');
  const [passwordRequirementsError, setPasswordRequirementsError] = useState('');
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validatePassword = () => {
    const { password, repeatPassword } = formData;

    if (password !== repeatPassword) {
      setPasswordMatchError("Las contraseñas no coinciden");
      return false;
    } else {
      setPasswordMatchError("");
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{2,3}$/;
    if (!passwordRegex.test(password)) {
      setPasswordRequirementsError("La contraseña debe tener entre 2 y 3 caracteres, una letra mayúscula, un número y un carácter especial.");
      return false;
    } else {
      setPasswordRequirementsError("");
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validatePassword()) {
      
    }
  };

  return ( 
    <div className="register-background">
      <div className="register-container">
        <div className='form-section'>
          <h2> Crear cuenta</h2>
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
            <button type="submit">Crear cuenta</button>
          </form>
        </div>
        <div className="logo-section">
          <img src={logo} alt="Logo Utickets" />
        </div>
      </div>
    </div>
  );
};

export default Register;
