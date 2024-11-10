create database HFSystem;

use HFSystem;

create table endereco(
idEndereco int primary key auto_increment, 
tipo varchar(45),
cep char (8),
complemeto varchar(45),
numero int,
uf char(2),
constraint checkTipo check (tipo in ('Fazenda', 'Empresa'))
);

create table empresa (
idEmpresa int primary key auto_increment,
razaoSocial varchar(100),
nomeFantasia varchar(100),
cnpj char(14),
representanteLegal varchar(45),
telefone char(11),
email varchar(100),
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
dtHrColeta datetime,
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


insert into endereco (tipo, cep, complemento, numero, uf) values
('Empresa', '01414001',  'Andar 10', 595,'SP'),
('Empresa', '24130000', 'Andar 11', 200, 'RJ'),
('Fazenda', '01010000', 'Sede', 100,'SP'),
('Fazenda', '01310000', 'Sede', 500, 'SP'),
('Empresa', '76500000', 'Bloco B', 250, 'GO');

insert into fazenda (codigoFazenda, razaoSocial, nomeFantasia, cnpj,
 telefone, email, dataCadastro, fkEmpresa, fkEndereco) values
( 'ADFEFSGR23','JBS S/A', 'JBS', '02916265000160',  '11987654321', 'imprensa@jbs.com.br', '2024-10-10', 1, 1),
( '2ECC71FF11','BRF S.A.', 'BRF', '02939930000110',  '11987654322', 'contato@brf-br.com', '2024-10-12', 2, 2),
('F1C40FAA23' ,'Cargill Agrícola S/A', 'Cargill', '60584425000100', '31987654321', 'info@cargill.com.br', '2024-10-14', 3, 3),
('D35400BB44' ,'Bunge Brasil', 'Bunge', '60822150000140', '21987654321', 'atendimento@bunge.com.br', '2024-10-13', 4, 4),
('8E44ADDD55' ,'SLC Agrícola S/A', 'SLC', '02810719000102', '31987654324', 'contato@slcagricola.com.br', '2024-10-15', 5, 5);

insert into usuario (username, nome, telefone, email, senha, fkFazenda) values
('ViniGo', 'Vinicius Gonçalves', '47632499830', 'vinicius@jbs.com.br', 'senha1234', 1),
('NickSo', 'Nicoly Souza', '47987654321', 'nicoly@brf.com.br', 'senhaNick1', 2),
('AnnaBa', 'Ana Barrocal', '48987654322', 'ana@cargill.com.br', 'senhaAna2', 3),
('LeonardSa', 'Leonardo Sardinha', '49987654323', 'leo@bunge.com.br', 'senhaLeo3', 4),
('MathMart', 'Matheus Martinez', '47987654324', 'Math@slcagricola.com.br', 'senhaMath1',  5);

insert into reservatorio (raio, altura, fkFazenda) values
(2.5, 1, '2ECC71FF11'),
(3.0, 2,'ADFEFSGR23' ),
(2.5, 3, 'F1C40FAA23'),
(3.0, 4, 'D35400BB44'),
(2.5, 5, '8E44ADDD55');

insert into clima (probabilidadeDeChuva, umidadeDoAr, 
temperaturaMinina, temperaturaMaxima, dtHrColeta, fkFazenda) values
('2 Dias', '80', '18', '2024-10-18 07:00:00', '8E44ADDD55'),
('4 Dias', '60', '28', '2024-10-18 07:00:00', 'D35400BB44'),
('Sem chuvas', '70', '', '20', '2024-10-18 07:00:00', 'F1C40FAA23'),
('7 Dias', '50', '30', '2024-10-18 07:00:00', 'ADFEFSGR23'),
('1 dia', '52', '32', '2024-10-18 07:00:00', '2ECC71FF11');

insert into sensor (dtHrColeta, fkReservatorio) values
('2024-10-18', 1),
('2024-10-19', 2),
('2024-10-20', 3),
('2024-10-21', 4),
('2024-10-22', 5);

INSERT INTO historicoMedicao (idHistoricoMedicao, dtHrMedicao, 
distancialAgua, capacidadeCalculada, fkReservatorio) VALUES
(1, '2024-10-01 14:00:00', 7.5, 300.0, 1),
(2, '2024-10-01 15:00:00', 8.0, 320.0, 2),
(3, '2024-10-01 16:00:00', 7.0, 420.0, 3),
(4, '2024-10-01 17:00:00', 7.5, 420.0, 4),
(5, '2024-10-01 18:00:00', 8.0, 520.0, 5);

INSERT INTO aviso (idAviso, aviso, descricao, dtHrEmissao, fkReservatorio)
VALUES
  (1, 'Risco', 'Nível baixo risco de cavitação', '2023-11-20 10:00:00', 1),
  (2, 'Alerta', 'Nível baixo ', '2023-11-21 15:30:00', 2),
  (3, 'Risco', 'Cuidado com as bombas', '2023-11-22 08:15:00', 3),
  (4, 'Alerta', 'Nível baixo', '2023-11-23 12:45:00', 1),
  (5, 'Risco', 'Entrada de ar nas bombas', '2023-11-24 18:00:00', 2);

select * from sensor join reservatorio on idReservatorio = fkReservatorio;

select usuario.nome as Funcionario,
fazenda.razaoSocial as "Fazenda contratado"
from usuario
join fazenda
on usuario.fkfazenda = fazenda.idUsuario;

select fazenda.razaoSocial as Fazenda,
clima.temperaturaMaxima as TemperaturaMaxima,
clima.umidadeDoAr as Umidade,
reservatorio.altura as AlturaReservatorio,
endereco.tipo as EnderecoTipo	
from fazenda
join reservatorio
on fazenda.codigoFazenda = reservartorio.fkFazenda
join clima 
on fazenda.codigoFazenda = clima.fkFazenda
join endereco
on fazenda.fkEndereco = endereco.idEndereco;