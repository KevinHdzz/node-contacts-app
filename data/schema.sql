DROP DATABASE IF EXISTS node_contacts_app;
CREATE DATABASE node_contacts_app;

USE node_contacts_app;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE contacts (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  PRIMARY KEY (id)
  FOREIGN KEY (user_id) REFERENCES users(id)
);
