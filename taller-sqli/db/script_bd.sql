DROP DATABASE IF EXISTS taller_sqli;
CREATE DATABASE taller_sqli;
USE taller_sqli;

CREATE TABLE roles(
	id INT AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(64)
)ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;



CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre_usuario VARCHAR(64) NOT NULL,
  password VARCHAR(256) NOT NULL,
  id_rol INT NOT NULL,
  CONSTRAINT fk_usuario_x_rol
	FOREIGN KEY (id_rol)
	REFERENCES roles(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE recursos(
	id INT AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(64)
)ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

CREATE TABLE tipos_permisos(
	id INT AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(64),
	alias VARCHAR(8) NOT NULL
)ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

CREATE TABLE permisos(
	id INT AUTO_INCREMENT PRIMARY KEY,
  id_recurso INT NOT NULL,
	id_tipo_permiso INT NOT NULL,
  id_rol INT NOT NULL,
	CONSTRAINT fk_permiso_x_rol
	FOREIGN KEY (id_rol)
	REFERENCES roles(id),
	CONSTRAINT fk_permiso_x_recurso
	FOREIGN KEY (id_recurso)
	REFERENCES recursos(id),
	CONSTRAINT fk_permiso_x_tipo
	FOREIGN KEY (id_tipo_permiso)
	REFERENCES tipos_permisos(id)
)ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;



INSERT INTO recursos(id, nombre)
VALUES
(1, 'consultar_materias'),
(2, 'actualizar_estado_materia'),
(3, 'consultar_alumnos'),
(4, 'actualizar_alumno'),
(5, 'consultar_cursos'),
(6, 'actualizar curso'),
(7, 'consultar_profesores');


INSERT INTO tipos_permisos(id, nombre, alias) VALUES(1, 'access','a');

INSERT INTO roles(id, nombre) VALUES(1, 'administrador');
INSERT INTO roles(id, nombre) VALUES(2, 'alumno');
INSERT INTO roles(id, nombre) VALUES(3, 'profesor');


-- Permisos de administrador
INSERT INTO permisos (id_recurso, id_tipo_permiso, id_rol)
VALUES
(1, 1, 1), -- consultar materias
(2, 1, 1), -- actualizar estado materia
(3, 1, 1), -- consultar alumnos
(4, 1, 1), -- actualizar alumnop
(5, 1, 1), -- consultar cursos
(6, 1, 1), -- actualizar curso
(7, 1, 1);

-- Permisos de alumno
INSERT INTO permisos (id_recurso, id_tipo_permiso, id_rol)
VALUES
(1, 1, 2), -- consultar materias
(2, 1, 2); -- actualizar estado materia
-- (3, 1, 1), -- consultar alumnos
-- (4, 1, 1), -- actualizar alumnop
-- (5, 1, 1); -- consultar cursos
-- (6, 1, 1); -- actualizar curso

-- Permisos de profesor
INSERT INTO permisos (id_recurso, id_tipo_permiso, id_rol)
VALUES
(1, 1, 1), -- consultar materias
-- (2, 1, 1), -- actualizar estado materia
(3, 1, 1), -- consultar alumnos
(4, 1, 1), -- actualizar alumnop
(5, 1, 1); -- consultar cursos
-- (6, 1, 1); -- actualizar curso



CREATE TABLE profesores(
	legajo INT AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(64),
	id_usuario INT,

	FOREIGN KEY(id_usuario)
	REFERENCES usuarios(id)
)ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;


CREATE TABLE alumnos(
	legajo INT AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(64),

	FOREIGN KEY(id_usuario)
	REFERENCES usuarios(id)
)ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;


CREATE TABLE materias(
	id INT AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(64)
)ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;


CREATE TABLE cursos(
	id INT AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(64)
)ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;



CREATE TABLE materias_x_profesores_x_cursos(
	id_materia INT,
	id_curso INT,
	legajo_profesor INT,

	PRIMARY KEY (id_materia, id_curso, legajo_profesor),

	CONSTRAINT fk_materia_x_m_x_p_x_c
	FOREIGN KEY(id_curso)
	REFERENCES cursos(id),

	CONSTRAINT fk_profesor_x_m_x_p_x_c
	FOREIGN KEY(legajo_profesor)
	REFERENCES profesores(legajo),

	CONSTRAINT fk_curso_x_m_x_p_x_c
	FOREIGN KEY(id_curso)
	REFERENCES cursos(id)

)ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;



CREATE TABLE alumnos_x_cursos(
	id_curso INT,
	legajo_alumno INT,

	PRIMARY KEY (legajo_alumno, id_curso),

	CONSTRAINT fk_alumno_x_a_x_c
	FOREIGN KEY(legajo_alumno)
	REFERENCES alumnos(legajo),

	CONSTRAINT fk_curso_x_a_x_c
	FOREIGN KEY(id_curso)
	REFERENCES cursos(id)

)ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;



INSERT INTO materias(id, nombre)
VALUES (1, 'Matemática'), (2, 'Historia'), (3, 'Sociología'), (4, 'Lengua'), (5, 'Biología');

INSERT INTO profesores(legajo, nombre)
VALUES (111, 'Ned Lud'), (112, 'Ernest Hemingway'), (113, 'Fyodor Dostoievski'), (114, 'Leon Tolstoi'),
(115, 'Lenín'), (116, 'Franz Kafka'), (117, 'Darwin'), (118, 'Stephen Hawkins');


INSERT INTO cursos (id, nombre)
VALUES (1, 'Primero'), (2, 'Segundo A');


INSERT INTO usuarios(id, nombre_usuario, password, id_rol)
VALUES
(3, 'olympe', '12345678', 2),
(4, 'jacobino', '12345678', 2),
(5, 'napoléon', '12345678', 2),
(6, 'luisito', '12345678', 2),
(7, 'girondino', '12345678', 2);


INSERT INTO alumnos (legajo, nombre, id_usuario)
VALUES
(10, 'Olympe de Gouges',3),
(11, 'Robespierre', 4),
(12, 'Napoléon Bonapaorte', 5),
(13, 'Luis XI', 6),
(14, 'Brissot', 7);


INSERT INTO alumnos_x_cursos(id_curso, legajo_alumno)
VALUES (1, 10),(1, 11), (1, 14), (2, 12), (2, 13);


INSERT INTO materias_x_profesores_x_cursos(id_materia, id_curso, legajo_profesor)
VALUES
(1, 1, 118),
(2, 1, 115),
(2, 1, 114),
(3, 2, 111),
(3, 2, 115),
(4, 1, 112),
(4, 1, 113),
(5, 2, 113);


