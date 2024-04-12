
CREATE TABLE user_woody (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(500) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telephone  VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    paper VARCHAR(255) NOT NULL,
    isVerified BOOLEAN ,  
    deletedAt DATETIME,
    PRIMARY KEY (id),
    UNIQUE KEY email (email)
);

CREATE TABLE category_woody  (
    id int NOT NULL AUTO_INCREMENT,
	name varchar(100) NOT NULL,
	description text NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY name (name)
);

CREATE TABLE book_woody (
    id int NOT NULL AUTO_INCREMENT,
	name varchar(100) NOT NULL,
    categories VARCHAR(100) NOT NULL,
	description text NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    linkCompra VARCHAR(255),
    linkLeer VARCHAR(255),
    linkEscuchar VARCHAR(255),
    linkImagen VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY name (name)
);

CREATE TABLE peli_woody (
    id int NOT NULL AUTO_INCREMENT,
	name varchar(100) NOT NULL,
    categories VARCHAR(100) NOT NULL,
	description text NOT NULL,
    linkVer VARCHAR(255),
    linkTrailer VARCHAR(255),
    linkImagen VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY name (name)
);

CREATE TABLE relatos_woody (
    id int NOT NULL AUTO_INCREMENT,
	name varchar(100) NOT NULL,
    categories VARCHAR(100) NOT NULL,
	description text NOT NULL,
    linkVer VARCHAR(255),
    linkImagen VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY name (name)
);

CREATE TABLE service_woody (
    id int NOT NULL AUTO_INCREMENT,
	name varchar(100) NOT NULL,
	description text NOT NULL,
    linkImagen VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY name (name)
);