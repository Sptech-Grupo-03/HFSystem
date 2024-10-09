create database HFSystem;
use HFSystem;

create table enderecoEmpresa(
idEndereco int primary key auto_increment, 
cep char(8),
bairro varchar(45), 
uf char(2), 
numero int
);

create table empresa(
idEmpresa int primary key auto_increment, 
razaoEmpresa varchar(45), 
nomeFantasia varchar(45),
cpnpj char(14),
representanteLegal varchar(100),
telefone char(11), 
email varchar(100), 
tipoEmpresa varchar(45), 
dataCadastro date,
fkEndereco int, 
constraint fkEnderecoEmpresa foreign key (fkEndereco)
	references endereco (idEndereco)
);

create table funcionario(
idFuncionario int primary key auto_increment,
nome varchar(45), 
dataNasc date, 
telefone char(11), 
email varchar(100), 
senha char(10),
cargo varchar(20),
nivelAcesso varchar(15), 
constraint checkNivelAcesso check (nivelAcesso in ('Administrador', 'Funcionario Comum')),
fkEmpresaRegistro int, 
constraint fkEmpresaFuncionario foreign key (fkEmpresaRegistro)
	references empresa (idEmpresa)
);

create table hcSr04(
id int primary key auto_increment,
nivelAgua float, 
dataColeta date
);

create table reservatorio(
idReservatorio int primary key auto_increment, 
capacidade float not null, 
tipo varchar(45) not null,
altura float not null, 
diametro float null, 
comprimento float null,
largura float not null, 
fkSensor int,
constraint fkSensorReservatorio foreign key (fkSensor)
	references hcSr04 (id),
fkEmpresa int,
 constraint fkEmpresaReservatorio foreign key (fkEmpresa)
	references empresa (idEmpresa)    
);

create table temperatura(
idTemperatura int primary key auto_increment, 
temperatura float,
dataColeta date
);

create table gasto(
idGasto int primary key auto_increment,
gasto decimal, 
dataGasto date
);

create table LeituraAgua(
idLeituraAgua int auto_increment, 
qtdAguaDisponivel float,
diasAteReabastecimento int,
capacidadeConsumida float,
dataColeta date
);

create table dashboard(
idDashboard int primary key auto_increment, 
nome varchar(60),
dataColeta date,
fkTemperatura int, 
constraint fkTemperaturaDashboard foreign key (fkTemperatura)
	references temperatura (idTemperatura),
fkLeituraDaAgua int, 
constraint fkLeituraAguaDashboard foreign key (fkLeituraAgua)
	references leituraAgua (idLeituraAgua),
fkGastos int, 
constraint fkGastosDashboard foreign key (fkGastos)
	references gasto (idGasto),
fkReservatorioColeta int, 
constraint fkReservatorioDashboard foreign key (fkReservatorioColeta)
	references reservatorio (idReservatorio)
);