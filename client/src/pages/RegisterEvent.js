import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '../components/RegisterEvent.css';

const RegisterEvent = ({ setEventData }) => {
    const [formData, setFormData] = useState({
        nombreEvento: '',
        descripcionEvento: '',
        tipoEvento: '',
        aforo: '',
        categoriaEventoId: '',
        precioBase: '',
        sectores: {
            vip: false,
            general: false,
            preferencia: false,
        },
        costos: {
            costoVip: '',
            costoGeneral: '',
            costoPreferencia: ''
        }
    });

    const [categorias, setCategorias] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/categorias');
                const data = await response.json();
                setCategorias(data);
            } catch (error) {
                console.error('Error al cargar las categorías:', error);
            }
        };

        fetchCategorias();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            setFormData({
                ...formData,
                sectores: {
                    ...formData.sectores,
                    [name]: checked
                }
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleCostoChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            costos: { ...formData.costos, [name]: value }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setEventData(formData);
        navigate('/registereventdetails');
    };

    return (
        <form className="register-event-form" onSubmit={handleSubmit}>
            <h2>Registro de evento</h2>
            <label>Nombre del evento</label>
            <input
                type="text"
                name="nombreEvento"
                placeholder="Nombre del evento"
                value={formData.nombreEvento}
                onChange={handleChange}
                required
            />

            <label>Descripción del evento</label>
            <input
                type="text"
                name="descripcionEvento"
                placeholder="Descripción del evento"
                value={formData.descripcionEvento}
                onChange={handleChange}
                required
            />

            <label>Tipo de evento</label>
            <input
                type="text"
                name="tipoEvento"
                placeholder="Tipo de evento"
                value={formData.tipoEvento}
                onChange={handleChange}
                required
            />

            <label>Aforo</label>
            <input
                type="number"
                name="aforo"
                placeholder="Cantidad"
                value={formData.aforo}
                onChange={handleChange}
                required
            />

            <label>Categoria de Evento</label>
            <select
                name="categoriaEventoId"
                value={formData.categoriaEventoId}
                onChange={handleChange}
                required
            >
                <option value="">Seleccione una categoría</option>
                {categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>
                        {categoria.nombre}
                    </option>
                ))}
            </select>

            <label>Precio Base</label>
            <input
                type="number"
                name="precioBase"
                placeholder="Precio base del evento"
                value={formData.precioBase}
                onChange={handleChange}
            />

            <div className="sectores">
                <div>
                    <input
                        type="checkbox"
                        name="vip"
                        checked={formData.sectores.vip}
                        onChange={handleChange}
                    />
                    <label>VIP</label>
                    {formData.sectores.vip && (
                        <input
                            type="number"
                            name="costoVip"
                            placeholder="Costo VIP"
                            value={formData.costos.costoVip}
                            onChange={handleCostoChange}
                        />
                    )}
                </div>
                <div>
                    <input
                        type="checkbox"
                        name="general"
                        checked={formData.sectores.general}
                        onChange={handleChange}
                    />
                    <label>General</label>
                    {formData.sectores.general && (
                        <input
                            type="number"
                            name="costoGeneral"
                            placeholder="Costo General"
                            value={formData.costos.costoGeneral}
                            onChange={handleCostoChange}
                        />
                    )}
                </div>
                <div>
                    <input
                        type="checkbox"
                        name="preferencia"
                        checked={formData.sectores.preferencia}
                        onChange={handleChange}
                    />
                    <label>Preferencia</label>
                    {formData.sectores.preferencia && (
                        <input
                            type="number"
                            name="costoPreferencia"
                            placeholder="Costo Preferencia"
                            value={formData.costos.costoPreferencia}
                            onChange={handleCostoChange}
                        />
                    )}
                </div>
            </div>

            <button type="submit">Siguiente</button>
        </form>
    );
};

export default RegisterEvent;
