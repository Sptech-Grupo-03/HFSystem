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

create table reservatorio(
idReservatorio int primary key auto_increment, 
capacidade float not null, 
tipo varchar(45) not null,
altura float not null,
largura float not null,
diasAteReabastecimento int,
fkEmpresa int,
 constraint fkEmpresaReservatorio foreign key (fkEmpresa)
	references fazenda (idEmpresa) 
);

create table hcsr04(
idSensor int primary key auto_increment,
nivelAgua float, 
dataColeta date,
fkReservatorio int,
constraint fkSensorReservatorio foreign key (fkReservatorio)
	references reservatorio (idReservatorio)
);

insert into enderecoEmpresa (cep, bairro, rua, cidade, uf, numero) values
('01414001', 'Cerqueira César', 'Rua Haddock Lobo', 'São Paulo', 'SP', 595),
('24130000', 'Centro', 'Praça do Conhecimento', 'São Gonçalo', 'RJ', 200),
('01010000', 'Centro', 'Avenida São João', 'São Paulo', 'SP', 100),
('01310000', 'Cerqueira César', 'Avenida Paulista', 'São Paulo', 'SP', 500),
('76500000', 'Centro', 'Rua José de Alencar', 'Aparecida de Goiânia', 'GO', 250);

insert into fazenda (razaoSocial, nomeFantasia, cnpj, representanteLegal, telefone, email, dataCadastro, fkEndereco) values
('JBS S/A', 'JBS', '02916265000160', 'Guilherme Perboyre Cavalcanti', '11987654321', 'imprensa@jbs.com.br', '2024-10-10', 1),
('BRF S.A.', 'BRF', '02939930000110', 'Lorival Luz', '11987654322', 'contato@brf-br.com', '2024-10-12', 2),
('Cargill Agrícola S/A', 'Cargill', '60584425000100', 'Fernando Pimenta', '31987654321', 'info@cargill.com.br', '2024-10-14', 3),
('Bunge Brasil', 'Bunge', '60822150000140', 'Ricardo Josué', '21987654321', 'atendimento@bunge.com.br', '2024-10-13', 4),
('SLC Agrícola S/A', 'SLC', '02810719000102', 'Aldo G. Meira', '31987654324', 'contato@slcagricola.com.br', '2024-10-15', 5);

insert into funcionario (nome, telefone, email, senha, cargo, nivelAcesso, fkEmpresaRegistro) values
('Vinicius Gonçalves', '47632499830', 'vinicius@jbs.com.br', 'senha1234', 'Gerente', 'Administrador', 1),
('Nicoly Souza', '47987654321', 'nicoly@brf.com.br', 'senhaNick1', 'Gerente', 'Administrador', 2),
('Ana Barrocal', '48987654322', 'ana@cargill.com.br', 'senhaAna2', 'Supervisor', 'Funcionario Comum', 3),
('Leonardo Sardinha', '49987654323', 'leo@bunge.com.br', 'senhaLeo3', 'Técnico', 'Funcionario Comum', 4),
('Matheus Martinez', '47987654324', 'Math@slcagricola.com.br', 'senhaMath1', 'Analista', 'Funcionario Comum', 5);

insert into reservatorio (capacidade, tipo, altura, largura, diasAteReabastecimento, fkEmpresa) values
(50000.0, 'Cilíndrico', 5.0, 3.0, 30, 1),
(80000.0, 'Tanque', 6.0, 4.0, 45, 2),
(70000.0, 'Cilíndrico', 5.0, 3.0, 40, 3),
(100000.0, 'Tanque', 7.0, 5.0, 60, 4),
(60000.0, 'Cilíndrico', 5.0, 3.5, 35, 5);

insert into hcsr04 (nivelAgua, dataColeta, fkReservatorio) values
(1.5, '2024-10-18', 1),
(2.0, '2024-10-19', 2),
(1.0, '2024-10-20', 3),
(2.0, '2024-10-21', 4),
(1.0, '2024-10-22', 5);

select * from hcsr04 join reservatorio on idReservatorio = fkReservatorio;

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