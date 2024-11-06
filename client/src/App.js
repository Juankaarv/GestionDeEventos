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
      </Routes>
    </Router>
  );
};

export default App;
