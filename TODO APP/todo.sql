CREATE EXTENSION pgcrypto;

CREATE TABLE Users (
	user_id SERIAL PRIMARY KEY,
	username VARCHAR(100),
	email VARCHAR(100),
	password TEXT NOT NULL
)

INSERT INTO Users (first_name, last_name, email, password) VALUES (
  'John',
	'Doe',
	'johndoe@mail.com',
  crypt('johnspassword', gen_salt('bf'))
);

INSERT INTO Users (first_name, last_name, email, password) VALUES (
  'Abc',
	'Def',
	'abcdef@mail.com',
  crypt('abcd', gen_salt('bf'))
);

SELECT * FROM users


CREATE TABLE TODOS(
	todo_id SERIAL PRIMARY KEY,
	task_name TEXT NOT NULL,
	description VARCHAR(100),
	status boolean,
	due_date DATE,
	user_id int,
	CONSTRAINT fk_todo FOREIGN KEY (user_id) REFERENCES Users (id)
);

INSERT INTO TODOS (task_name, description, status, due_date, user_id) VALUES (
 'asdasd', 'askjdlakjsdlakjsd', false, 'Aug, 9, 2021', 1 
);

SELECT * FROM Todos


-- Updated
CREATE EXTENSION pgcrypto;

CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(100),
    password TEXT NOT NULL
);

CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    category_name TEXT NOT NULL,
    user_id INT,
    CONSTRAINT fk_category FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE TODOS(
    todo_id SERIAL PRIMARY KEY,
    task_name TEXT NOT NULL,
    description VARCHAR(100),
    status BOOLEAN,
    due_date DATE,
    category_id INT,
    CONSTRAINT fk_todo FOREIGN KEY (category_id) REFERENCES categories (category_id)
);

ALTER TABLE categories ADD CONSTRAINT category_name_unique UNIQUE (category_name);


