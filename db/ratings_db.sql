### Schema

CREATE DATABASE ratings_db;
USE ratings_db;

CREATE TABLE people
(
	id int NOT NULL AUTO_INCREMENT,
	personName varchar(255) NOT NULL,
	address varchar(255) NOT NULL,
	city varchar(255) NOT NULL,
	state varchar(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE comments
(
	id int NOT NULL AUTO_INCREMENT,
	personName varchar(255) NOT NULL,
	comment varchar(255) NOT NULL,
	rating int(10) NOT NULL,
	worktype varchar(255) NOT NULL,
	userName varchar(255) NOT NULL, 
	PRIMARY KEY (id)
);

