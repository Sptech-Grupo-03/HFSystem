create database hfsystem;

use hfsystem;

create table endereco(
idEndereco int primary key auto_increment, 
tipo varchar(45),
cep char (8),
complemento varchar(45),
numero int,
uf char(2),
constraint checkTipo check (tipo in ('Fazenda', 'Empresa'))
);

create table empresa (
idEmpresa int primary key auto_increment,
usernameEmpresa varchar(50),
cnpj char(14),
email varchar(100),
razaoSocial varchar(100),
nomeFantasia varchar(100),
representanteLegal varchar(45),
senha VARCHAR(50),
telefone char(11),
tipoEmpresa varchar(45),
dtCadastro date,
fkEndereco int,
constraint fkEnderecoEmpresa foreign key (fkEndereco)
references endereco(idEndereco)
);

create table fazenda(
idFazenda int primary key auto_increment, 
razaoSocial varchar(100), 
nomeFantasia varchar(100),
cnpj char(14),
telefone char(11), 
email varchar(100),
dataCadastro date,
fkEmpresa int, 
fkEndereco int,
constraint fkFazendaEmpresa foreign key (fkEmpresa)
	references Empresa(idEmpresa),
constraint fkFazendaEndereco foreign key (fkEndereco)
	references endereco(idEndereco)
);

create table clima (
idClima int primary key auto_increment,
probabilidadeDeChuva varchar(45),
UmidadeDoAr float,
temperaturaMinima float,
temperaturaMaxima float,
dtHrColeta date,
fkFazenda int,
constraint fkFazendaClima foreign key (fkFazenda)
 references fazenda(idFazenda)
 );

create table usuario(
idUsuario int primary key auto_increment,
username varchar(120),
nome varchar(45), 
telefone char(11), 
email varchar(100), 
senha char(10),
fkEmpresa int,
constraint fkUsuarioEmpresa foreign key (fkEmpresa)
	references empresa(idEmpresa)
);

create table reservatorio(
idReservatorio int primary key auto_increment, 
raio float not null,
altura float not null,
fkFazenda int,
 constraint fkFazendaReservatorio foreign key (fkFazenda)
	references fazenda(idFazenda) 
);

create table sensor(
idColeta int primary key auto_increment,
dtHrColeta datetime,
fkReservatorio int,
constraint fkSensorReservatorio foreign key (fkReservatorio)
	references reservatorio (idReservatorio)
);

CREATE TABLE historicoMedicao (
idHistoricoMedicao int primary key, 
dtHrMedicao datetime,
distanciaAgua float,
capacidadeCalculada float,
fkReservatorio int,
constraint fkReservatorioHistorico foreign key (fkReservatorio) 
references reservatorio(idReservatorio)
);

create table aviso(
idAviso int,
aviso varchar(45),
descricao varchar(120),
dtHrEmissao date,
fkReservatorio int,
constraint checkAviso check (aviso in ('Risco', 'Alerta')),
constraint fkReservatorioAviso foreign key (fkReservatorio) 
references reservatorio(idReservatorio));       

select * from empresa;

select * from usuario;
