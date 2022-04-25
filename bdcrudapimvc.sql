create database mvcapicrud;
use mvcapicrud;

create table persona(
id int primary key identity(1,1),
nombre varchar(50),
edad int,
token varchar(500) 
);

insert into persona values('pepe1',12,null);
insert into persona values('pepe2',123,null);
insert into persona values('pepe3',124,null);

select * from persona;