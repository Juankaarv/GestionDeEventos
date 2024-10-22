
CREATE DATABASE IF NOT EXISTS sistema_eventos02;
USE sistema_eventos02;

CREATE TABLE Roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    UNIQUE (nombre)  -- Índice único para evitar duplicados
);

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

CREATE TABLE Eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descripcion TEXT,
    ubicacion VARCHAR(255),
    fecha_hora DATETIME NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    cupo_disponible INT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Auditoría: fecha de creación
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  -- Auditoría: fecha de modificación
);

CREATE TABLE Tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo_ticket VARCHAR(50) UNIQUE NOT NULL,
    usuario_id INT,
    evento_id INT,
    estado ENUM('pagado', 'reservado', 'cancelado') NOT NULL,
    fecha_compra DATETIME DEFAULT CURRENT_TIMESTAMP, -- Auditoría: fecha de compra
    carnet_usuario VARCHAR(20) NOT NULL, -- Campo agregado para tener el carnet del usuario
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Auditoría: fecha de creación
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Auditoría: fecha de modificación
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (evento_id) REFERENCES Eventos(id) ON DELETE CASCADE,
    FOREIGN KEY (carnet_usuario) REFERENCES Usuarios(carnet)  -- FK vinculada a carnet
);

CREATE TABLE Reservas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    evento_id INT,
    asiento VARCHAR(10),
    estado ENUM('reservado', 'confirmado', 'cancelado') NOT NULL,
    fecha_reserva DATETIME DEFAULT CURRENT_TIMESTAMP, -- Auditoría: fecha de reserva
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Auditoría: fecha de creación
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Auditoría: fecha de modificación
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (evento_id) REFERENCES Eventos(id) ON DELETE CASCADE
);

CREATE TABLE Pagos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    ticket_id INT,
    monto DECIMAL(10, 2) NOT NULL,
    metodo_pago VARCHAR(50) NOT NULL,
    fecha_pago DATETIME DEFAULT CURRENT_TIMESTAMP, -- Auditoría: fecha de pago
    estado ENUM('completado', 'pendiente', 'fallido') NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Auditoría: fecha de creación
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Auditoría: fecha de modificación
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (ticket_id) REFERENCES Tickets(id) ON DELETE CASCADE
);

CREATE TABLE Historial (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    evento_id INT,
    accion VARCHAR(255),
    fecha_accion DATETIME DEFAULT CURRENT_TIMESTAMP, -- Auditoría: fecha de la acción
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (evento_id) REFERENCES Eventos(id) ON DELETE CASCADE
);
