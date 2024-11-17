create database HFSystem;

use HFSystem;

create table endereco(
idEndereco int primary key auto_increment, 
tipo varchar(45),
cep char (8),
complemento varchar(45),
numero int,
cidade varchar(45),
uf char(2)
);

create table fazenda (
codigoFazenda char(10) primary key,
razaoSocial varchar(100),
nomeFazenda varchar(100),
cnpj char(14),
representanteLegal varchar(45),
dtCadastro date,
fkEndereco int,
fkClima int,
constraint fkFazendaEndereco foreign key (fkEndereco)
references endereco(idEndereco),
constraint fkFazendaClima foreign key (fkClima)
references clima(idClima)
);

create table clima (
idClima int primary key auto_increment,
probabilidadeDeChuva varchar(45),
UmidadeDoAr float,
temperaturaMinima float,
temperaturaMaxima float,
dtHrColeta datetime,
fkFazenda char(10),
constraint fkFazendaClima foreign key (fkFazenda)
 references fazenda(coodigoFazenda)
 );

create table usuario(
idUsuario int primary key auto_increment,
username varchar(120),
nome varchar(45),
tipo varchar(45), 
telefone char(11), 
email varchar(100), 
senha char(10),
fkUsuario int,
fkFazenda char(10),
constraint checkTipo check(tipo in ('Fazenda','Cliente', 'N3')),
constraint fkUsuario foreign key (fkUsuario)
	references usuario(idUsuario),
constraint fkUsuarioFazenda foreign key (fkFazenda)
	references fazenda(codigoFazenda)
);

create table reservatorio(
idReservatorio int primary key auto_increment, 
raio float not null,
altura float not null,
nivelAtual float,
nivelIdeal float,
nivelAlerta float,
nivelRisco float,
fkFazenda char(10),
 constraint fkFazendaReservatorio foreign key (fkFazenda)
	references fazenda(codigoFazenda) 
);

create table sensor(
idColeta int primary key auto_increment,
nome varchar(45),
distanciaAgua float,
dtHrColeta timestamp default current_timestamp,
fkReservatorio int,
constraint fkSensorReservatorio foreign key (fkReservatorio)
	references reservatorio (idReservatorio)
);

CREATE TABLE historico (
idHistorico int primary key, 
dtHrNivelCalculado timestamp default current_timestamp,
nivelCalculado float, 
fkSensor int,
constraint fkSensorHistorico foreign key (fkSensor) 
references sensor(idSensor)
);

create table aviso(
idAviso int,
aviso varchar(45),
descricao varchar(120),
dtHrEmissao timestamp default current_timestamp,
fkHistorico int,
constraint checkAviso check (aviso in ('Risco', 'Alerta')),
constraint fkHistoricoAviso foreign key (fkHistorico)
references historico(idHistorico)
);       

SELECT * FROM fazenda;

insert into endereco (cep, complemento, numero, cidade, uf) values
('01414001',  'Andar 10', 595, 'São Paulo', 'SP'),
('24130000', 'Andar 11', 200, 'Teresópolis', 'RJ'),
('01010000', 'Sede', 100, 'Mogi das Cruzes', 'SP'),
('01310000', 'Sede', 500, 'Itapevi', 'SP'),
('76500000', 'Bloco B', 250, 'Jataí', 'GO');


insert into fazenda (codigoFazenda, razaoSocial, nomeFazenda, cnpj, representanteLegal, 
dataCadastro, fkEndereco, fkClima) values
( 'ADCCD7', 'JBS','JBS S/A', '98.765.432/0001-77', 'Ana Barrocal', '2024-10-10', 1, 1),
( 'BDC9D7', 'BRF','BRF S/A', '12.345.678/0001-99', 'Leonardo Sardinha', '2024-10-12', 2, 2),
( 'C7C4D8', 'Cargill Agrícola','Cargill Agrícola S/A', '87.654.321/0001-88', 'Matheus Martinez', '2024-10-14', 3, 3),
( 'D4C1D9', 'Bunge Brasil','Bunge Brasil S/A', '45.678.901/0001-23', 'Nicolly Sousa', '2024-10-13', 4, 4),
( 'E0BFDD', 'SLC Agrícola','SLC Agrícola S/A', '98.765.432/0001-12', 'Rennan Moura', '2024-10-15', 5, 5);

insert into usuario (username, nome, tipo, telefone, email, 
senha, fkUsuario, fkFazenda) values
('ViniGo', 'Vinicius Gonçalves', 'Cliente', '47632499830', 'vinicius@jbs.com.br', 'senha1234', 1, 'ADCCD7'),
('NickSo', 'Nicoly Souza', 'Cliente', '47987654321', 'nicoly@brf.com.br', 'senhaNick1', 2, 'BDC9D7'),
('AnnaBa', 'Ana Barrocal', 'N3', '48987654322', 'ana@cargill.com.br', 'senhaAna2', 3, 'C7C4D8'),
('LeonardSa', 'Leonardo Sardinha', 'N3', '49987654323', 'leo@bunge.com.br', 'senhaLeo3', 4, 'D4C1D9'),
('MathMart', 'Matheus Martinez', 'Fazenda', '47987654324', 'Math@slcagricola.com.br', 'senhaMath1',  5, 'E0BFDD');

insert into reservatorio (raio, altura,  nivelAtual, nivelIdeal,
nivelAlerta, nivelRisco, fkFazenda) values
(2.5, 90, 80, 50, 25, 'BDC9D7'),
(3.0, 40, 51, 50, 25, 'C7C4D8'),
(2.5, 10, 51, 50, 25, 'D4C1D9'),
(3.0, 30, 51, 50, 25, 'ADCCD7'),
(2.5, 90, 51, 50, 25, 'E0BFDD');

insert into clima (probabilidadeDeChuva, umidadeDoAr, 
temperaturaMinima, temperaturaMaxima, dtHrColeta, fkFazenda) values
('2 Dias', 80, 18, 20, '2024-10-18 07:00:00', 'ADCCD7'),
('4 Dias', 60, 28, 30, '2024-10-18 07:00:00', 'BDC9D7'),
('Sem chuvas', 70, 20, 25, '2024-10-18 07:00:00', 'C7C4D8'),
('7 Dias', 50, 30, 27, '2024-10-18 07:00:00', 'D4C1D9'),
('1 dia', 52, 32, 35, '2024-10-18 07:00:00', 'E0BFDD');

insert into sensor (nome, distanciaAgua, dtHrColeta, fkReservatorio) values
    ('Sensor 1', 2.5, '2023-11-20 10:00:00', 1),
    ('Sensor 2', 3.2, '2023-11-21 12:30:00', 2),
    ('Sensor 3', 1.8, '2023-11-22 09:15:00', 1),
    ('Sensor 4', 4.1, '2023-11-23 14:45:00', 3),
    ('Sensor 5', 2.9, '2023-11-24 17:00:00', 2);

INSERT INTO historico (idHistorico, dtHrNivelCalculado, 
nivelCalculado, fkSensor) VALUES
(1, '2024-10-01 14:00:00', 300.0, 1),
(2, '2024-10-01 15:00:00', 320.0, 2),
(3, '2024-10-01 16:00:00', 420.0, 3),
(4, '2024-10-01 17:00:00', 420.0, 4),
(5, '2024-10-01 18:00:00', 520.0, 5);

insert into aviso (idAviso, aviso, descricao, dtHrEmissao, 
fkHistorico) values
  (1, 'Risco', 'Nível baixo risco de cavitação', '2023-11-20 10:00:00', 1),
  (2, 'Alerta', 'Nível baixo ', '2023-11-21 15:30:00', 2),
  (3, 'Risco', 'Cuidado com as bombas', '2023-11-22 08:15:00', 3),
  (4, 'Alerta', 'Nível baixo', '2023-11-23 12:45:00', 1),
  (5, 'Risco', 'Entrada de ar nas bombas', '2023-11-24 18:00:00', 2);

select * from sensor join reservatorio on idReservatorio = fkReservatorio;

select usuario.nome as Funcionario,
fazenda.nomeFazenda as "Fazenda contratado"
from usuario
join fazenda
on usuario.fkFazenda = fazenda.codigoFazenda;

select fazenda.nomeFazenda as Fazenda,
clima.temperaturaMaxima as TemperaturaMaxima,
clima.umidadeDoAr as Umidade,
reservatorio.altura as AlturaReservatorio,
endereco.tipo as EnderecoTipo	
from fazenda
join reservatorio
on fazenda.codigoFazenda = reservatorio.fkFazenda
join clima 
on fazenda.codigoFazenda = clima.fkFazenda
join endereco
on fazenda.fkEndereco = endereco.idEndereco;

