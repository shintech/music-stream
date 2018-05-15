DROP DATABASE IF EXISTS api_development;
CREATE DATABASE api_development;

\c api_development;

CREATE TABLE models (
  ID SERIAL PRIMARY KEY,
  first_name VARCHAR,
  last_name VARCHAR,
  optional VARCHAR,
  email VARCHAR,
  message VARCHAR,
  created_at TIMESTAMP without time zone default (now() at time zone 'utc')
);


INSERT INTO models ( first_name, last_name, optional, email, message )
VALUES ( 'Nathanial', 'Robel', 'option1', 'River77@example.org', 'et' );

INSERT INTO models ( first_name, last_name, optional, email, message )
VALUES ( 'Trent', 'Satterfield', 'option1', 'Flavie_Hoeger65@example.com', 'corporis' );

INSERT INTO models ( first_name, last_name, optional, email, message )
VALUES ( 'Shayna', 'Predovic', 'option1', 'Darrick.Boyer78@example.com', 'voluptas' );

INSERT INTO models ( first_name, last_name, optional, email, message )
VALUES ( 'Maximillia', 'Hoppe', 'option1', 'Rashawn.Hintz@example.com', 'a' );

INSERT INTO models ( first_name, last_name, optional, email, message )
VALUES ( 'Camryn', 'Bailey', 'option1', 'Luis_Barton@example.net', 'tempora' );

INSERT INTO models ( first_name, last_name, optional, email, message )
VALUES ( 'Roselyn', 'Fahey', 'option1', 'Karina62@example.org', 'rerum' );

INSERT INTO models ( first_name, last_name, optional, email, message )
VALUES ( 'Burnice', 'McDermott', 'option1', 'Nella_Heidenreich68@example.net', 'quia' );

INSERT INTO models ( first_name, last_name, optional, email, message )
VALUES ( 'Anabelle', 'Tremblay', 'option1', 'Hadley_Lynch@example.org', 'consequuntur' );

INSERT INTO models ( first_name, last_name, optional, email, message )
VALUES ( 'Kay', 'Marks', 'option1', 'Deanna10@example.com', 'corporis' );

INSERT INTO models ( first_name, last_name, optional, email, message )
VALUES ( 'Wilma', 'Leannon', 'option1', 'Margarette_Kuphal24@example.org', 'maiores' );


CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
    username VARCHAR,
    password VARCHAR
);

INSERT INTO users ( username, password )
VALUES ( 'KillBill', '$2a$10$dbnjt3x9vj4brOcq0qyxyOmhw6XZJV3o5SdFDtDkFs4t1X4KhW46m');

---------------------------------------------------------------------------

DROP DATABASE IF EXISTS api_test;
CREATE DATABASE api_test;

\c api_test;

CREATE TABLE models (
  ID SERIAL PRIMARY KEY,
  first_name VARCHAR,
  last_name VARCHAR,
  optional VARCHAR,
  email VARCHAR,
  message VARCHAR,
  created_at TIMESTAMP without time zone default (now() at time zone 'utc')
);
