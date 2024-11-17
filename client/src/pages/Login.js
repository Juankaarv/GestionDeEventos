import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../img/LogoUticket.png';
import '../components/Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null); // Limpiamos cualquier error previo

        try {
            const response = await axios.post('http://localhost:3001/api/usuarios/login', {
                correo_electronico: email,
                contrasena: password,
            });

            // Guardar el token en localStorage o en el contexto de autenticación
            localStorage.setItem('token', response.data.token);

            // Redirigir al usuario a la página de inicio
            navigate('/');
        } catch (error) {
            // Manejar el error y mostrar el mensaje adecuado
            if (error.response && error.response.status === 401) {
                setError('Credenciales incorrectas. Por favor, inténtelo de nuevo.');
            } else {
                setError('Ocurrió un error al intentar iniciar sesión. Inténtelo más tarde.');
            }
        }
    };

    return (
        <div className="login-background">
            <div className="login-container">
                <div className="logo-section">
                    <img src={logo} alt="Logo Utickets" />
                </div>

                <div className="form-section">
                    <h2>Bienvenido a <span className="highlight">UTICKET</span></h2>
                    
                    <button className="social-login google">Login with Google</button>
                    <button className="social-login facebook">Login with Facebook</button>

                    <form onSubmit={handleLogin}>
                        <div className="input-container">
                            <input
                                type="email"
                                placeholder="Ingresa tu correo electronico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Ingresa tu contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-options">
                            <div className="remember-me">
                                <input type="checkbox" id="remember-me" />
                                <label htmlFor="remember-me">Recuérdame</label>
                            </div>
                            <Link to="/forgot-password" className="forgot-password">Olvidé mi contraseña</Link>
                        </div>

                        {error && <div className="error-message">{error}</div>}

                        <button type="submit" className="login-button">Ingresar</button>
                    </form>

                    <p className="register-option">
                        ¿No tienes cuenta? <Link to="/register">Registrarse</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
