create database HFSystem;

use HFSystem;

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
razaoSocial varchar(100),
nomeFantasia varchar(100),
cnpj char(14),
representanteLegal varchar(45),
telefone char(11),
email varchar(100),
tipoEmpresa varchar(45),
dtCadastro date,
fkEndereco int,
constraint fkEmpresaEndereco foreign key (fkEndereco)
references endereco(idEndereco)
);

create table fazenda(
codigoFazenda char(10) primary key, 
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
nivelAtual float,
nivelIdeal float,
nivelAlerta float,
nivelRisco float,
fkFazenda int,
 constraint fkFazendaReservatorio foreign key (fkFazenda)
	references fazenda(idFazenda) 
);

create table sensor(
idColeta int primary key auto_increment,
nome varchar(45),
distanciaAgua float,
dtHrColeta datetime,
fkReservatorio int,
constraint fkSensorReservatorio foreign key (fkReservatorio)
	references reservatorio (idReservatorio)
);

CREATE TABLE historicoMedicao (
idHistoricoMedicao int primary key, 
dtHrNivelCalculado datetime,
nivelCalculado float,
fkReservatorio int,
fkSensor int,
constraint fkReservatorioHistorico foreign key (fkReservatorio) 
references reservatorio(idReservatorio)
);

create table aviso(
idAviso int,
aviso varchar(45),
descricao varchar(120),
dtHrEmissao datetime,
fkHistoricoMedicao int,
fkReservatorio int,
constraint checkAviso check (aviso in ('Risco', 'Alerta')),
constraint fkHistoricoMedicaoAviso foreign key (fkHistoricoMedicao)
references historicoMedicao(idHistoricoMedicao),
constraint fkReservatorioAviso foreign key (fkReservatorio) 
references reservatorio(idReservatorio));       

SELECT * FROM fazenda ;

insert into endereco (tipo, cep, complemento, numero, uf) values
('Empresa', '01414001',  'Andar 10', 595,'SP'),
('Empresa', '24130000', 'Andar 11', 200, 'RJ'),
('Fazenda', '01010000', 'Sede', 100,'SP'),
('Fazenda', '01310000', 'Sede', 500, 'SP'),
('Empresa', '76500000', 'Bloco B', 250, 'GO');

INSERT INTO empresa (razaoSocial, nomeFantasia, cnpj, representanteLegal,
 telefone, email, tipoEmpresa, dtCadastro, fkEndereco) VALUES
('JBS S/A', 'JBS', '12345678901234', 'João Silva', '11987654321', 'contato@jbs.com.br', 'Agricultura', '2023-11-07', 1),
('BRF S.A.', 'BRF', '98765432109876', 'Maria Souza', '11987654322', 'contato@brf.com.br', 'Alimentícia', '2023-11-08', 2),
('Cargill Agrícola S/A', 'Cargill', '01234567890123', 'Pedro Santos', '11987654323', 'contato@cargill.com.br', 'Agricultura', '2023-11-09', 3),
('Bunge Brasil', 'Bunge', '23456789012345', 'Ana Silva', '11987654324', 'contato@bunge.com.br', 'Agricultura', '2023-11-10', 4),
('SLC Agrícola S/A', 'SLC', '45678901234567', 'Carlos Oliveira', '11987654325', 'contato@slc.com.br', 'Agricultura', '2023-11-11', 5);

insert into fazenda (nomeFazenda, dataCadastro, fkEmpresa, fkEndereco) values
('JBS S/A', '2024-10-10', 1, 1),
('BRF S.A.', '2024-10-12', 2, 2),
('Cargill Agrícola S/A', '2024-10-14', 3, 3),
('Bunge Brasil', '2024-10-13', 4, 4),
('SLC Agrícola S/A', '2024-10-15', 5, 5);

insert into usuario (username, nome, telefone, email, senha, fkEmpresa) values
('ViniGo', 'Vinicius Gonçalves', '47632499830', 'vinicius@jbs.com.br', 'senha1234', 1),
('NickSo', 'Nicoly Souza', '47987654321', 'nicoly@brf.com.br', 'senhaNick1', 2),
('AnnaBa', 'Ana Barrocal', '48987654322', 'ana@cargill.com.br', 'senhaAna2', 3),
('LeonardSa', 'Leonardo Sardinha', '49987654323', 'leo@bunge.com.br', 'senhaLeo3', 4),
('MathMart', 'Matheus Martinez', '47987654324', 'Math@slcagricola.com.br', 'senhaMath1',  5);

insert into reservatorio (raio, altura,  nivelAtual, nivelIdeal,
nivelAlerta, nivelRisco, fkFazenda) values
(2.5, 90, 80, 50, 25, 1, 1),
(3.0, 40, 51, 50, 25, 2, 2),
(2.5, 10, 51, 50, 25, 3, 3),
(3.0, 30, 51, 50, 25,4, 4),
(2.5, 90, 51, 50, 25, 5, 5);

insert into clima (probabilidadeDeChuva, umidadeDoAr, 
temperaturaMinima, temperaturaMaxima, dtHrColeta, fkFazenda) values
('2 Dias', 80, 18, 20, '2024-10-18 07:00:00', 1),
('4 Dias', 60, 28, 30, '2024-10-18 07:00:00', 2),
('Sem chuvas', 70, 20, 25, '2024-10-18 07:00:00', 3),
('7 Dias', 50, 30, 27, '2024-10-18 07:00:00', 4),
('1 dia', 52, 32, 35, '2024-10-18 07:00:00', 5);

insert into sensor (nome, distanciaAgua, dtHrColeta, fkReservatorio) values
    ('Sensor 1', 2.5, '2023-11-20 10:00:00', 1),
    ('Sensor 2', 3.2, '2023-11-21 12:30:00', 2),
    ('Sensor 3', 1.8, '2023-11-22 09:15:00', 1),
    ('Sensor 4', 4.1, '2023-11-23 14:45:00', 3),
    ('Sensor 5', 2.9, '2023-11-24 17:00:00', 2);

INSERT INTO historicoMedicao (idHistoricoMedicao, dtHrNivelCalculado, 
nivelCalculado, fkReservatorio) VALUES
(1, '2024-10-01 14:00:00', 300.0, 1),
(2, '2024-10-01 15:00:00', 320.0, 2),
(3, '2024-10-01 16:00:00', 420.0, 3),
(4, '2024-10-01 17:00:00', 420.0, 4),
(5, '2024-10-01 18:00:00', 520.0, 5);

insert into aviso (idAviso, aviso, descricao, dtHrEmissao, 
fkHistoricoMedicao,fkReservatorio) values
  (1, 'Risco', 'Nível baixo risco de cavitação', '2023-11-20 10:00:00', 1, 1),
  (2, 'Alerta', 'Nível baixo ', '2023-11-21 15:30:00', 2, 2),
  (3, 'Risco', 'Cuidado com as bombas', '2023-11-22 08:15:00', 3, 3),
  (4, 'Alerta', 'Nível baixo', '2023-11-23 12:45:00', 1, 1),
  (5, 'Risco', 'Entrada de ar nas bombas', '2023-11-24 18:00:00', 2, 2);

select * from sensor join reservatorio on idReservatorio = fkReservatorio;

select usuario.nome as Funcionario,
empresa.nomeFantasia as "Fazenda contratado"
from usuario
join empresa
on usuario.fkEmpresa = empresa.idEmpresa;

select fazenda.nomeFazenda as Fazenda,
clima.temperaturaMaxima as TemperaturaMaxima,
clima.umidadeDoAr as Umidade,
reservatorio.altura as AlturaReservatorio,
endereco.tipo as EnderecoTipo	
from fazenda
join reservatorio
on fazenda.idFazenda = reservatorio.fkFazenda
join clima 
on fazenda.idFazenda = clima.fkFazenda
join endereco
on fazenda.fkEndereco = endereco.idEndereco;

