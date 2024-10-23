USE sistema_eventos04;

-- Insertar datos en la tabla de Roles
INSERT INTO Roles (nombre) VALUES ('admin'), ('usuario');

-- Insertar datos en la tabla de EstadoTickets
INSERT INTO EstadoTickets (estado) VALUES ('pagado'), ('reservado'), ('cancelado');

-- Insertar datos en la tabla de EstadoReservas
INSERT INTO EstadoReservas (estado) VALUES ('reservado'), ('confirmado'), ('cancelado');

-- Insertar datos en la tabla de MetodoPagos
INSERT INTO MetodoPagos (metodo) VALUES ('tarjeta de crédito'), ('transferencia bancaria'), ('paypal');

-- Insertar datos en la tabla de EstadoPagos
INSERT INTO EstadoPagos (estado) VALUES ('completado'), ('pendiente'), ('fallido');

-- Insertar datos en la tabla de Usuarios
INSERT INTO Usuarios (nombre, correo_electronico, contrasena, carnet, rol_id)
VALUES 
('Juan Pérez', 'juan.perez@example.com', 'password123', 'CARNET001', 1),
('Maria López', 'maria.lopez@example.com', 'password123', 'CARNET002', 2),
('Carlos Sánchez', 'carlos.sanchez@example.com', 'password123', 'CARNET003', 2);

-- Insertar datos en la tabla de Eventos
INSERT INTO Eventos (titulo, descripcion, ubicacion, fecha_hora, precio, cupo_disponible)
VALUES 
('Concierto de Rock', 'Concierto de rock al aire libre.', 'Parque Central', '2024-11-15 20:00:00', 50.00, 500),
('Conferencia de Tecnología', 'Evento sobre las últimas tendencias tecnológicas.', 'Centro de Convenciones', '2024-12-01 09:00:00', 150.00, 300),
('Festival de Cine', 'Proyección de películas independientes.', 'Teatro Municipal', '2024-12-20 18:00:00', 20.00, 200);

-- Insertar datos en la tabla de Tickets
INSERT INTO Tickets (codigo_ticket, usuario_id, evento_id, estado_ticket_id)
VALUES 
('TICKET001', 1, 1, 1),
('TICKET002', 2, 2, 2),
('TICKET003', 3, 3, 3);

-- Insertar datos en la tabla de Reservas
INSERT INTO Reservas (usuario_id, evento_id, asiento, estado_reserva_id)
VALUES 
(1, 1, 'A1', 1),
(2, 2, 'B2', 2),
(3, 3, 'C3', 3);

-- Insertar datos en la tabla de Pagos
INSERT INTO Pagos (usuario_id, ticket_id, monto, metodo_pago_id, estado_pago_id)
VALUES 
(1, 1, 50.00, 1, 1),
(2, 2, 150.00, 2, 2),
(3, 3, 20.00, 3, 3);

-- Insertar datos en la tabla de Historial
INSERT INTO Historial (usuario_id, evento_id, accion)
VALUES 
(1, 1, 'Compra de ticket'),
(2, 2, 'Reserva confirmada'),
(3, 3, 'Pago realizado');
