import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Usa useNavigate en lugar de useHistory
import axios from 'axios'; // Necesitas instalar axios si no lo tienes ya: npm install axios
import logo from '../img/LogoUticket.png'; 
import '../components/Login.css'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // Para manejar errores de autenticación
    const navigate = useNavigate(); // Usar useNavigate en lugar de useHistory

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Enviar la solicitud de inicio de sesión al backend
            const response = await axios.post('http://localhost:3001/login', { // Ajusta la URL según tu backend
                correo_electronico: email,
                contrasena: password
            });

            // Si el inicio de sesión es exitoso, se obtiene el token
            const { token } = response.data;
            // Almacena el token en el localStorage (o en un estado global si prefieres)
            localStorage.setItem('authToken', token);
            
            // Redirige a la página principal o al dashboard
            navigate('/dashboard'); // O a la ruta que desees
        } catch (error) {
            setError('Credenciales incorrectas'); // Muestra un error si no se pueden autenticar
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

                    {/*<div className="divider">
                        <span>OR</span>
                    </div>*/}

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
                                <label htmlFor="remember-me">Recuerdame</label>
                            </div>
                            <Link to="/forgot-password" className="forgot-password">Olvide mi contraseña</Link>
                        </div>

                        {error && <div className="error-message">{error}</div>} {/* Muestra el error si existe */}

                        <button type="submit" className="login-button">Ingresar</button>
                    </form>

                    <p className="register-option">
                        No tienes cuenta? <Link to="/register">Registrarse</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
