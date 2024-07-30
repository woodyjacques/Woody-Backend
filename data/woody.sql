
CREATE TABLE user_woody (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(500) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    paper VARCHAR(255) NOT NULL,
    isVerified BOOLEAN ,  
    deletedAt DATETIME,
    PRIMARY KEY (id),
    UNIQUE KEY email (email)
);

CREATE TABLE product_woody (
    id int NOT NULL AUTO_INCREMENT,
	name varchar(100) NOT NULL,
    categories VARCHAR(100) NOT NULL,
	description text NOT NULL,
    linkVer VARCHAR(255),
    linkImagen VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY name (name)
);

CREATE TABLE _woody (
    id int NOT NULL AUTO_INCREMENT,
	name varchar(100) NOT NULL,
    categories VARCHAR(100) NOT NULL,
	description text NOT NULL,
    linkVer text,
    linkTrailer text,
    linkImagen text NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY name (name)
);

CREATE TABLE stori_woody (
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

CREATE TABLE category_woody (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  element varchar(200) NOT NULL,
  description text NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY name (name)
);