import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import About from './pages/About';
import Eventos from './pages/Eventos';
import Login from './pages/Login';
import Register from './pages/Register';
import RegisterEvent from './pages/RegisterEvent';
import RegisterEventDetails from './pages/RegisterEventDetails';
import ActiveEvents from './pages/ActiveEvents';
import EditEvent from './pages/EditEvent';
import NewTicket from './pages/NewTicket';
import TipoTicketsList from './pages/TipoTicketsList';
import EditTicket from './pages/EditTicket';
import EventRegistration from './pages/EventRegistration';
import EditTipoTicket from './pages/EditTipoTicket';
import Zonas from './pages/Zonas';
import ZonasList from './pages/ZonasList';  
import ZonasEdit from './pages/ZonasEdit';  
import Asientos from './pages/Asientos'; 
import AsientosCreate from './pages/AsientosCreate';   
import AsientoEdit from './pages/AsientoEdit';   
import EventoSelect from './pages/EventoSelect';   

  

import ZonaEntrada from './pages/ZonaEntrada';  // Página para seleccionar zona
import MetodoPago from './pages/MetodoPago';  // Página para realizar el pago



const App = () => {
  // Estado para almacenar los datos del evento
  const [eventData, setEventData] = useState({});

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Enviar el setEventData a RegisterEvent para capturar los datos */}
        <Route 
          path="/RegisterEvent" 
          element={<RegisterEvent setEventData={setEventData} />} 
        />

        {/* Pasar eventData a RegisterEventDetails para usarlo en la siguiente vista */}
        <Route 
          path="/RegisterEventDetails" 
          element={<RegisterEventDetails eventData={eventData} />} 
        />
        <Route path="/activeEvents" element={<ActiveEvents />} />
        <Route path="/editEvent/:eventId" element={<EditEvent />} />
        <Route path="/newTicket" element={<NewTicket />} />
        <Route path="/editTicket/:id" element={<EditTicket />} />
        <Route path="/eventRegistration" element={<EventRegistration />} />
        <Route path="/tipoTicketsList" element={<TipoTicketsList />} />
        <Route path="/tipotickets/:id" element={<EditTipoTicket />} />
        <Route path="/zonas" element={<Zonas />} />
        <Route path="/zonasList" element={<ZonasList />} />
        <Route path="/zonasEdit/:id" element={<ZonasEdit />} />
        <Route path="/asientos" element={<Asientos />} />
        <Route path="/asientosCreate" element={<AsientosCreate />} />
        <Route path="/asientoEdit/:id" element={<AsientoEdit />} />
        <Route path="/eventoSelect" element={<EventoSelect />} />
        <Route path="/zonaEntrada/:id" element={<ZonaEntrada />} />
        <Route path="/metodo-pago/:zonaId" element={<MetodoPago />} />

        
      </Routes>
    </Router>
  );
};

export default App;
