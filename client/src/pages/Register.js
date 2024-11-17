import React, { useState } from 'react';
import './Register.css'; 
import logo from '../img/LogoUticket.png';
import { Link, useNavigate } from 'react-router-dom';  // Importamos useNavigate para redirigir
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
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // Usamos useNavigate para la redirección

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

    // Regex para validar la contraseña (debes adaptarlo si es necesario)
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
      try {
        // Enviar la solicitud de registro al backend
        const response = await axios.post('http://localhost:3001/api/usuarios', {
          nombres: formData.nombre,
          apellidos: formData.apellido,
          correo_electronico: formData.email,
          contrasena: formData.password,
          carnet: formData.cedula,
          numero_celular: formData.celular,
        });

        // Si la solicitud es exitosa, mostramos un mensaje de éxito y redirigimos
        setSuccessMessage('¡Registro exitoso! Redirigiendo...');
        setTimeout(() => {
          navigate('/login');  // Redirigir al login
        }, 2000);
      } catch (error) {
        // Si ocurre un error, mostramos un mensaje de error
        setErrorMessage(error.response?.data?.error || 'Hubo un error al registrar el usuario.');
      }
    }
  };

  return ( 
    <div className="register-background">
      <div className="register-container">
        <div className='form-section'>
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
            {passwordMatchError && <p className="error-message">{passwordMatchError}</p>}
            {passwordRequirementsError && <p className="error-message">{passwordRequirementsError}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
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
