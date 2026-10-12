CREATE DATABASE soundboard;

use soundboard;

Create table category (
    id_category INT auto_increment PRIMARY key,
    name VARCHAR(255) NOT NULL );

CREATE TABLE sound (
    id_sound int auto_increment primary key,
    name varchar(255) not null,
    link varchar(255) not null,
    added date not null,
    id_category int not null,
    foreign key (id_category) references category (id_category) );name VARCHAR(255) NOT NULL );

create table user (
    id_user int auto_increment primary key,
    username varchar(255) not null,
    mail varchar(255) not null,
    password varchar(255) not null );