CREATE DATABASE IF NOT EXISTS sistema_eventos03;
USE sistema_eventos03;

-- Tabla de Roles (referenciada por Usuarios)
CREATE TABLE Roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    UNIQUE (nombre)  -- Índice único para evitar duplicados
);

-- Tabla de Usuarios (relacionada con Roles)
CREATE TABLE Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo_electronico VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    carnet VARCHAR(20) UNIQUE NOT NULL,  -- Campo carnet agregado
    rol_id INT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Auditoría: fecha de creación
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Auditoría: fecha de modificación
    FOREIGN KEY (rol_id) REFERENCES Roles(id) ON DELETE SET NULL
);

-- Tabla de Eventos
CREATE TABLE Eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descripcion TEXT,
    ubicacion VARCHAR(255),
    fecha_hora DATETIME NOT NULL,
    precio DECIMAL(10, 2) NOT NULL CHECK (precio >= 0), -- Validación de precio positivo
    cupo_disponible INT NOT NULL CHECK (cupo_disponible >= 0), -- Validación de cupo no negativo
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Auditoría: fecha de creación
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  -- Auditoría: fecha de modificación
);

-- Tabla de Estados de Ticket (para evitar ENUMs y permitir extensibilidad)
CREATE TABLE EstadoTickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    estado VARCHAR(50) NOT NULL
);

-- Tabla de Tickets (relacionada con Usuarios, Eventos y Estados de Ticket)
CREATE TABLE Tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo_ticket VARCHAR(50) UNIQUE NOT NULL,
    usuario_id INT,
    evento_id INT,
    estado_ticket_id INT, -- Relación con EstadoTickets
    fecha_compra DATETIME DEFAULT CURRENT_TIMESTAMP, -- Auditoría: fecha de compra
    carnet_usuario VARCHAR(20) NOT NULL, -- Campo agregado para tener el carnet del usuario
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Auditoría: fecha de creación
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Auditoría: fecha de modificación
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (evento_id) REFERENCES Eventos(id) ON DELETE CASCADE,
    FOREIGN KEY (estado_ticket_id) REFERENCES EstadoTickets(id), -- FK vinculada a Estados de Ticket
    FOREIGN KEY (carnet_usuario) REFERENCES Usuarios(carnet)  -- FK vinculada a carnet
);

-- Tabla de Estados de Reserva (para evitar ENUMs y permitir extensibilidad)
CREATE TABLE EstadoReservas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    estado VARCHAR(50) NOT NULL
);

-- Tabla de Reservas (relacionada con Usuarios, Eventos y Estados de Reserva)
CREATE TABLE Reservas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    evento_id INT,
    asiento VARCHAR(10),
    estado_reserva_id INT, -- Relación con EstadoReservas
    fecha_reserva DATETIME DEFAULT CURRENT_TIMESTAMP, -- Auditoría: fecha de reserva
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Auditoría: fecha de creación
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Auditoría: fecha de modificación
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (evento_id) REFERENCES Eventos(id) ON DELETE CASCADE,
    FOREIGN KEY (estado_reserva_id) REFERENCES EstadoReservas(id)  -- FK para Estado de Reserva
);

-- Tabla de Métodos de Pago (para evitar ENUMs y permitir extensibilidad)
CREATE TABLE MetodoPagos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    metodo VARCHAR(50) NOT NULL
);

-- Tabla de Estados de Pago (para evitar ENUMs y permitir extensibilidad)
CREATE TABLE EstadoPagos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    estado VARCHAR(50) NOT NULL
);

-- Tabla de Pagos (relacionada con Usuarios, Tickets, Métodos de Pago y Estados de Pago)
CREATE TABLE Pagos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    ticket_id INT,
    monto DECIMAL(10, 2) NOT NULL CHECK (monto >= 0), -- Validación de monto positivo
    metodo_pago_id INT, -- Relación con MetodoPagos
    estado_pago_id INT, -- Relación con EstadoPagos
    fecha_pago DATETIME DEFAULT CURRENT_TIMESTAMP, -- Auditoría: fecha de pago
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Auditoría: fecha de creación
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Auditoría: fecha de modificación
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (ticket_id) REFERENCES Tickets(id) ON DELETE CASCADE,
    FOREIGN KEY (metodo_pago_id) REFERENCES MetodoPagos(id), -- FK vinculada a MetodoPagos
    FOREIGN KEY (estado_pago_id) REFERENCES EstadoPagos(id)  -- FK vinculada a EstadoPagos
);

-- Tabla de Historial de acciones (relacionada con Usuarios y Eventos)
CREATE TABLE Historial (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    evento_id INT,
    accion VARCHAR(255),
    fecha_accion DATETIME DEFAULT CURRENT_TIMESTAMP, -- Auditoría: fecha de la acción
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (evento_id) REFERENCES Eventos(id) ON DELETE CASCADE
);

-- Insertar algunos valores en tablas de referencia
INSERT INTO Roles (nombre) VALUES ('admin'), ('usuario');
INSERT INTO EstadoTickets (estado) VALUES ('pagado'), ('reservado'), ('cancelado');
INSERT INTO EstadoReservas (estado) VALUES ('reservado'), ('confirmado'), ('cancelado');
INSERT INTO MetodoPagos (metodo) VALUES ('tarjeta de crédito'), ('transferencia bancaria'), ('paypal');
INSERT INTO EstadoPagos (estado) VALUES ('completado'), ('pendiente'), ('fallido');


