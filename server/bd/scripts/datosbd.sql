-- Insertar Roles
INSERT INTO Roles (nombre) VALUES 
('Administrador'),
('Usuario'),
('Organizador');

-- Insertar Usuarios
INSERT INTO Usuarios (nombre, correo_electronico, contrasena, carnet, fecha_nacimiento, rol_id) VALUES
('Juan Pérez', 'juan.perez@example.com', 'password123', 'CARNET123', '1990-05-15', 1),
('María López', 'maria.lopez@example.com', 'password123', 'CARNET124', '1985-09-10', 2),
('Carlos Ruiz', 'carlos.ruiz@example.com', 'password123', 'CARNET125', '2000-01-22', 3);

-- Insertar Eventos
INSERT INTO Eventos (titulo, descripcion, ubicacion, fecha_hora, precio, cupo_disponible) VALUES
('Concierto de Rock', 'Un concierto de rock con bandas locales.', 'Auditorio Nacional', '2024-11-15 20:00:00', 150.00, 200),
('Seminario de Tecnología', 'Seminario sobre las últimas tendencias en tecnología.', 'Centro de Convenciones', '2024-12-01 09:00:00', 50.00, 100),
('Taller de Fotografía', 'Aprende técnicas avanzadas de fotografía.', 'Estudio Creativo', '2024-11-25 10:00:00', 75.00, 50);

-- Insertar Estados de Ticket
INSERT INTO EstadoTickets (estado) VALUES 
('Disponible'),
('Reservado'),
('Cancelado');

-- Insertar Tickets
INSERT INTO Tickets (codigo_ticket, usuario_id, evento_id, estado_ticket_id) VALUES
('TICKET001', 1, 1, 2),
('TICKET002', 2, 2, 1),
('TICKET003', 3, 3, 1);

-- Insertar Estados de Reserva
INSERT INTO EstadoReservas (estado) VALUES 
('Pendiente'),
('Confirmada'),
('Cancelada');

-- Insertar Reservas
INSERT INTO Reservas (usuario_id, evento_id, asiento, estado_reserva_id) VALUES
(1, 1, 'A1', 2),
(2, 2, 'B5', 1),
(3, 3, 'C3', 3);

-- Insertar Métodos de Pago
INSERT INTO MetodoPagos (metodo) VALUES 
('Tarjeta de Crédito'),
('PayPal'),
('Transferencia Bancaria');

-- Insertar Estados de Pago
INSERT INTO EstadoPagos (estado) VALUES 
('Pendiente'),
('Completado'),
('Fallido');

-- Insertar Pagos
INSERT INTO Pagos (usuario_id, ticket_id, monto, metodo_pago_id, estado_pago_id) VALUES
(1, 1, 150.00, 1, 2),
(2, 2, 50.00, 2, 1),
(3, 3, 75.00, 3, 2);

-- Insertar Historial de Acciones
INSERT INTO Historial (usuario_id, evento_id, accion) VALUES
(1, 1, 'Compra de ticket'),
(2, 2, 'Reserva realizada'),
(3, 3, 'Pago completado');
