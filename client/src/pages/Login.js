// src/pages/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../components/Login.css';

function Login() {
    const [correo_electronico, setCorreoElectronico] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/api/usuarios/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ correo_electronico, contrasena: password })
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                navigate('/eventos');
            } else {
                setErrorMessage('Credenciales incorrectas');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Error al conectar con el servidor');
        }
    };

    return (
        <div className="login-background">
            <div className="login-container">
                <form className="login-form" onSubmit={handleLogin}>
                    <h2>Inicio de Sesión</h2>
                    <p>
                        Si ya tienes una cuenta inicia sesión, sino{' '}
                        <Link to="/register">crea tu cuenta aquí</Link>.
                    </p>
                    <div className="input-container">
                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            value={correo_electronico}
                            onChange={(e) => setCorreoElectronico(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">Ingresar</button>
                    {errorMessage && <p>{errorMessage}</p>}
                </form>
                <p><Link to="/forgot-password">Olvidé mi contraseña</Link></p> {/* Enlace a ForgotPassword */}
            </div>
        </div>
    );
}

export default Login;
