-- Selección de la base de datos
USE sistema_eventos05;

-- Insertar datos en la tabla de Roles
INSERT INTO Roles (nombre) VALUES 
('Administrador'), 
('Usuario'), 
('Organizador');

-- Insertar datos en la tabla de Usuarios
INSERT INTO Usuarios (nombres, apellidos, numero_celular, correo_electronico, contrasena, carnet, rol_id) VALUES 
('Juan', 'Perez', '555123456', 'juan.perez@example.com', 'password123', '123456', 1),
('Maria', 'Lopez', '555654321', 'maria.lopez@example.com', 'password123', '654321', 2);

-- Insertar datos en la tabla de TipoEventos
INSERT INTO TipoEventos (nombre, descripcion) VALUES 
('Musical', 'Eventos relacionados con música'), 
('Deportivo', 'Eventos deportivos'), 
('Conferencia', 'Conferencias de diferentes temas');

-- Insertar datos en la tabla de CategoriaEventos
INSERT INTO CategoriaEventos (tipo_evento_id, nombre, descripcion) VALUES 
(1, 'Concierto', 'Conciertos de diferentes géneros musicales'), 
(2, 'Fútbol', 'Partidos de fútbol'), 
(3, 'Tecnología', 'Conferencias relacionadas con tecnología');

-- Insertar datos en la tabla de Eventos
INSERT INTO Eventos (categoria_evento_id, titulo, url, descripcion, organizadores, ubicacion, fecha_hora, precio_base, cupo_disponible, es_evento_virtual, url_transmision, plataforma_virtual) VALUES 
(1, 'Concierto Rock Fest', 'http://rockfest.com', 'Festival de rock en vivo', 'RockFest Org', 'Estadio Nacional', '2023-11-15 20:00:00', 50.00, 1000, FALSE, NULL, NULL),
(2, 'Final de Liga', NULL, 'Partido final de la liga de fútbol', 'Liga Org', 'Estadio Metropolitano', '2023-12-01 18:00:00', 30.00, 500, FALSE, NULL, NULL),
(3, 'Conferencia de IA', 'http://techconf.com', 'Conferencia sobre Inteligencia Artificial', 'TechConf', 'Online', '2024-01-20 10:00:00', 0, 300, TRUE, 'http://streaming.techconf.com', 'Zoom');

-- Insertar datos en la tabla de Zonas
INSERT INTO Zonas (evento_id, nombre, capacidad, precio_extra, descripcion) VALUES 
(1, 'VIP', 100, 20.00, 'Zona VIP con mejores asientos'), 
(1, 'General', 900, 0.00, 'Zona general'), 
(2, 'Gradería', 300, 0.00, 'Zona de gradas'), 
(2, 'Palco', 200, 15.00, 'Zona de palco');

-- Insertar datos en la tabla de Asientos
INSERT INTO Asientos (zona_id, fila, numero, estado) VALUES 
(1, 'A', 1, 'disponible'), 
(1, 'A', 2, 'reservado'), 
(2, 'B', 10, 'vendido');

-- Insertar datos en la tabla de TipoTickets
INSERT INTO TipoTickets (nombre, es_de_pago, precio, limite_compra, stock, fecha_inicio_venta, fecha_final_venta, es_por_fecha, evento_id) VALUES 
('Entrada General', TRUE, 50.00, 5, 100, '2023-11-01 08:00:00', '2023-11-15 20:00:00', TRUE, 1), 
('Entrada VIP', TRUE, 70.00, 2, 50, '2023-11-01 08:00:00', '2023-11-15 20:00:00', TRUE, 1), 
('Entrada Gratuita Conferencia', FALSE, 0, 1, 300, '2023-12-01 08:00:00', '2024-01-20 09:00:00', TRUE, 3);

-- Insertar datos en la tabla de EstadoPagos
INSERT INTO EstadoPagos (estado) VALUES 
('Pendiente'), 
('Completado'), 
('Fallido');

-- Insertar datos en la tabla de MetodoPagos
INSERT INTO MetodoPagos (metodo) VALUES 
('Tarjeta de Crédito'), 
('PayPal'), 
('Transferencia Bancaria');

-- Insertar datos en la tabla de Pagos
INSERT INTO Pagos (usuario_id, ticket_id, monto, metodo_pago_id, estado_pago_id) VALUES 
(1, 1, 50.00, 1, 2), 
(2, 2, 70.00, 2, 1);

-- Insertar datos en la tabla de Entradas
INSERT INTO Entradas (usuario_id, evento_id, zona_id, asiento_id) VALUES 
(1, 1, 1, 1), 
(2, 2, 2, NULL);

-- Insertar datos en la tabla de HistorialAcciones
INSERT INTO HistorialAcciones (usuario_id, entidad, accion, detalles) VALUES 
(1, 'Eventos', 'Creación', 'Creación del evento Rock Fest'), 
(2, 'Entradas', 'Compra', 'Compra de entrada para el partido de fútbol final');
