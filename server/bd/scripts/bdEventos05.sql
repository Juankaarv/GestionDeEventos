CREATE DATABASE IF NOT EXISTS sistema_eventos05;
USE sistema_eventos05;

-- Tabla de Roles (referenciada por Usuarios)
CREATE TABLE Roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    UNIQUE (nombre)
);

-- Modificación de la tabla Usuarios para incluir nombres, apellidos y número de celular
CREATE TABLE Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    numero_celular VARCHAR(20) NOT NULL,
    correo_electronico VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    carnet VARCHAR(20) UNIQUE NOT NULL,
    rol_id INT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (rol_id) REFERENCES Roles(id) ON DELETE SET NULL
);

-- Tabla de Tipos de Evento (por ejemplo, musical, deportivo, conferencia)
CREATE TABLE TipoEventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT
);

-- Tabla de Categorías de Evento (detalles más específicos, como conciertos, fútbol, etc.)
CREATE TABLE CategoriaEventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo_evento_id INT NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT,
    FOREIGN KEY (tipo_evento_id) REFERENCES TipoEventos(id) ON DELETE CASCADE
);

-- Tabla de Eventos para incluir URL, tipo de evento y organizadores
CREATE TABLE Eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    categoria_evento_id INT NOT NULL,
    titulo VARCHAR(100) NOT NULL,
    url VARCHAR(255),
    descripcion TEXT,
    organizadores VARCHAR(255),
    ubicacion VARCHAR(255),
    fecha_hora DATETIME NOT NULL,
    precio_base DECIMAL(10, 2) NOT NULL CHECK (precio_base >= 0),
    cupo_disponible INT NOT NULL CHECK (cupo_disponible >= 0),
    es_evento_virtual BOOLEAN DEFAULT FALSE,
    url_transmision VARCHAR(255),
    plataforma_virtual VARCHAR(100),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (categoria_evento_id) REFERENCES CategoriaEventos(id) ON DELETE CASCADE
);

-- Tabla de Zonas del Evento (Curva Norte, VIP, Gradería, etc.)
CREATE TABLE Zonas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    evento_id INT NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    capacidad INT NOT NULL CHECK (capacidad >= 0),
    precio_extra DECIMAL(10, 2) DEFAULT 0 CHECK (precio_extra >= 0),
    descripcion TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (evento_id) REFERENCES Eventos(id) ON DELETE CASCADE
);

-- Tabla de Asientos por Zona (si es necesario manejar asientos específicos)
CREATE TABLE Asientos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    zona_id INT NOT NULL,
    fila VARCHAR(10) NOT NULL,
    numero INT NOT NULL CHECK (numero >= 0),
    estado ENUM('disponible', 'reservado', 'vendido') DEFAULT 'disponible',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (zona_id) REFERENCES Zonas(id) ON DELETE CASCADE
);

-- Tabla para gestionar la asistencia o entradas compradas
CREATE TABLE Entradas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    evento_id INT NOT NULL,
    zona_id INT,
    asiento_id INT,
    fecha_entrada DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (evento_id) REFERENCES Eventos(id) ON DELETE CASCADE,
    FOREIGN KEY (zona_id) REFERENCES Zonas(id) ON DELETE SET NULL,
    FOREIGN KEY (asiento_id) REFERENCES Asientos(id) ON DELETE SET NULL
);

-- Tabla de Tipo de Tickets (para definir si es de pago o gratuito)
CREATE TABLE TipoTickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    es_de_pago BOOLEAN NOT NULL,
    precio DECIMAL(10, 2) CHECK (precio >= 0),
    limite_compra INT CHECK (limite_compra >= 0),
    stock INT NOT NULL CHECK (stock >= 0),
    fecha_inicio_venta DATETIME,
    fecha_final_venta DATETIME,
    es_por_fecha BOOLEAN NOT NULL,
    evento_id INT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (evento_id) REFERENCES Eventos(id) ON DELETE CASCADE
);

-- Tabla de Estados de Pago
CREATE TABLE EstadoPagos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    estado VARCHAR(50) NOT NULL
);

-- Tabla de Métodos de Pago
CREATE TABLE MetodoPagos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    metodo VARCHAR(50) NOT NULL
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
    FOREIGN KEY (ticket_id) REFERENCES TipoTickets(id) ON DELETE CASCADE,
    FOREIGN KEY (metodo_pago_id) REFERENCES MetodoPagos(id),
    FOREIGN KEY (estado_pago_id) REFERENCES EstadoPagos(id)
);

-- Tabla de Historial de Acciones para Auditoría
CREATE TABLE HistorialAcciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    entidad VARCHAR(50) NOT NULL,
    accion VARCHAR(255) NOT NULL,
    detalles TEXT,
    fecha_accion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id) ON DELETE CASCADE
);
