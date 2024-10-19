create database HFSystem;
use HFSystem;

create table enderecoEmpresa(
idEndereco int primary key auto_increment, 
cep char(8),
bairro varchar(45),
rua varchar (50),
cidade varchar (45), 
uf char(2), 
numero int
);

create table fazenda(
idEmpresa int primary key auto_increment, 
razaoSocial varchar(45), 
nomeFantasia varchar(45),
cnpj char(14),
representanteLegal varchar(100),
telefone char(11), 
email varchar(100),
dataCadastro date,
fkEndereco int, 
constraint fkEnderecoEmpresa foreign key (fkEndereco)
	references enderecoEmpresa (idEndereco)
);

create table funcionario(
idFuncionario int primary key auto_increment,
nome varchar(45), 
telefone char(11), 
email varchar(100), 
senha char(10),
cargo varchar(20),
nivelAcesso varchar(25), 
constraint checkNivelAcesso check (nivelAcesso in ('Administrador', 'Funcionario Comum')),
fkEmpresaRegistro int, 
constraint fkEmpresaFuncionario foreign key (fkEmpresaRegistro)
	references fazenda (idEmpresa)
);

create table hcsr04(
id int primary key auto_increment,
nivelAgua float, 
dataColeta date
);

create table reservatorio(
idReservatorio int primary key auto_increment, 
capacidade float not null, 
tipo varchar(45) not null,
altura float not null,
largura float not null, 
fkSensor int,
constraint fkSensorReservatorio foreign key (fkSensor)
	references hcSr04 (id),
fkEmpresa int,
 constraint fkEmpresaReservatorio foreign key (fkEmpresa)
	references fazenda (idEmpresa)    
);

insert into enderecoEmpresa (cep, bairro, rua, cidade, uf, numero) values
('12345678', 'Centro', 'Rua A', 'São Paulo', 'SP', 123),
('87654321', 'Jardins', 'Rua B', 'Rio de Janeiro', 'RJ', 456),
('56789012', 'Vila Nova', 'Rua C', 'Belo Horizonte', 'MG', 789);

insert into fazenda (razaoSocial, nomeFantasia, cnpj, representanteLegal, telefone, email, dataCadastro, fkEndereco) values
('Fazenda Agrobom Ltda', 'Agro Bom', '12345678000199', 'Carlos Oliveira', '11987654321', 'fazenda@agrobom.com', '2024-10-10', 1),
('Brasil Farm Ltda', 'Brasil Farm', '98765432000199', 'Maria Souza', '21976543210', 'farm@brasil.com', '2024-10-11', 2);

insert into funcionario (nome, telefone, email, senha, cargo, nivelAcesso, fkEmpresaRegistro) values
('Vinicius Gonçalves', '47632499830', 'vinicius@agrobom.com', 'senha1234', 'Gerente', 'Administrador', 1),
('Nicolly Souza', '98765432100', 'nicolly@farm.com', 'senha5678', 'Operador', 'Funcionario Comum', 2);

insert into hcsr04 (nivelAgua, dataColeta) values
(1000, '2024-09-10'),
(500, '2024-09-25'),
(100, '2024-10-10');

insert into reservatorio (capacidade, tipo, altura, largura, fkSensor, fkEmpresa) values
(1000, 'Cilíndrico', 3.0, 3.0, 1, 1),
(800, 'Cilíndrico', 2.5, 2.5, 2, 2);

select * from reservatorio join hcsr04 on id = fkSensor;

select funcionario.nome as Funcionario,
fazenda.razaoSocial as "Fazenda contratado"
from funcionario
join fazenda
on funcionario.fkEmpresaRegistro = fazenda.idEmpresa;

select fazenda.razaoSocial as Fazenda,
reservatorio.capacidade as CapacidadeReservatorio,
reservatorio.tipo as TipoReservatorio,
reservatorio.altura as AlturaReservatorio,
reservatorio.largura as LarguraReservatorio
from fazenda
join reservatorio
on fazenda.idEmpresa = reservatorio.fkEmpresa;