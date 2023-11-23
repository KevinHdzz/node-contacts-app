DROP DATABASE IF EXISTS node_contacts_app;
CREATE DATABASE node_contacts_app;

USE node_contacts_app;

CREATE TABLE contacts (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO contacts (name, phone, email)
   VALUES 
      ('John', '23190324432', 'john@gmail.com'),
      ('Alice', '3219876543', 'alice@example.com'),
      ('Bob', '4567890123', 'bob@gmail.com'),
      ('Eva', '7890123456', 'eva@example.com'),
      ('Michael', '5678901234', 'michael@gmail.com'),
      ('Sophia', '6789012345', 'sophia@example.com'),
      ('David', '8901234567', 'david@gmail.com'),
      ('Emma', '9012345678', 'emma@example.com'),
      ('Daniel', '2345678901', 'daniel@gmail.com'),
      ('Olivia', '3456789012', 'olivia@example.com');
