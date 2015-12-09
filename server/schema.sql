CREATE DATABASE thesis;

USE thesis;

CREATE TABLE tours (
  id int NOT NULL AUTO_INCREMENT,
  tourName varchar(200),
  userId int NOT NULL,
  cityId int,
  description varchar(1000),
  image varchar(200),
  category varchar(200),
  duration time,
  PRIMARY KEY (ID)
);

CREATE TABLE places (
  id int NOT NULL AUTO_INCREMENT,
  placeName varchar(200),
  tourId int NOT NULL,
  address varchar(500),
  description varchar(1000),
  image varchar(200),
  audio varchar(200),
  placeOrder int(3),
  PRIMARY KEY (ID)
);

CREATE TABLE cities (
  id int NOT NULL AUTO_INCREMENT,
  cityName varchar(200),
  state varchar(200),
  country varchar(200),
  PRIMARY KEY (ID)
);

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  userName varchar(200),
  firstName varchar(200),
  lastName varchar(200),
  password varchar(200),
  image varchar(200),
  PRIMARY KEY (ID)
);
