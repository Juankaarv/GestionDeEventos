CREATE DATABASE IF NOT EXISTS sistema_eventos05;
USE sistema_eventos05;

-- Tabla de Roles (referenciada por Usuarios)
CREATE TABLE Roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    UNIQUE (nombre)
);

-- Tabla de Usuarios (relacionada con Roles)
CREATE TABLE Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo_electronico VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    carnet VARCHAR(20) UNIQUE NOT NULL,
    rol_id INT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (rol_id) REFERENCES Roles(id) ON DELETE SET NULL
);

-- Tabla de Eventos
CREATE TABLE Eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descripcion TEXT,
    ubicacion VARCHAR(255),
    fecha_hora DATETIME NOT NULL,
    precio DECIMAL(10, 2) NOT NULL CHECK (precio >= 0),
    cupo_disponible INT NOT NULL CHECK (cupo_disponible >= 0),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de Estados de Ticket
CREATE TABLE EstadoTickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    estado VARCHAR(50) NOT NULL
);

-- Tabla de Tickets
CREATE TABLE Tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo_ticket VARCHAR(50) UNIQUE NOT NULL,
    usuario_id INT,
    evento_id INT,
    estado_ticket_id INT,
    fecha_compra DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (evento_id) REFERENCES Eventos(id) ON DELETE CASCADE,
    FOREIGN KEY (estado_ticket_id) REFERENCES EstadoTickets(id)
);

-- Tabla de Estados de Reserva
CREATE TABLE EstadoReservas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    estado VARCHAR(50) NOT NULL
);

-- Tabla de Reservas
CREATE TABLE Reservas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    evento_id INT,
    asiento VARCHAR(10),
    estado_reserva_id INT,
    fecha_reserva DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (evento_id) REFERENCES Eventos(id) ON DELETE CASCADE,
    FOREIGN KEY (estado_reserva_id) REFERENCES EstadoReservas(id)
);

-- Tabla de Métodos de Pago
CREATE TABLE MetodosPago (
    id INT AUTO_INCREMENT PRIMARY KEY,
    metodo VARCHAR(50) NOT NULL
);

-- Tabla de Estados de Pago
CREATE TABLE EstadoPagos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    estado VARCHAR(50) NOT NULL
);

-- Tabla de Pagos
CREATE TABLE Pagos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    ticket_id INT,
    monto DECIMAL(10, 2) NOT NULL CHECK (monto >= 0),
    metodo_pago_id INT,
    estado_pago_id INT,
    fecha_pago DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (ticket_id) REFERENCES Tickets(id) ON DELETE CASCADE,
    FOREIGN KEY (metodo_pago_id) REFERENCES MetodosPago(id),
    FOREIGN KEY (estado_pago_id) REFERENCES EstadoPagos(id)
);

-- Tabla de Historial de acciones
CREATE TABLE Historial (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    evento_id INT,
    accion VARCHAR(255),
    fecha_accion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (evento_id) REFERENCES Eventos(id) ON DELETE CASCADE
);
