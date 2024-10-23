//1° Bloco - Pinos do sensor
//Inclui a biblioteca para o sensor HC-SR04
#include "Ultrasonic.h"

// Definições dos pinos de trigger e echo
const int PINO_TRIGGER = 12;
const int PINO_ECHO = 13;

// Cria uma instância do objeto HC_SR04 com os pinos definidos
HC_SR04 sensor(PINO_TRIGGER, PINO_ECHO);

// 2° Bloco - Configura a comunicação maquina x arduino
void setup() {
  Serial.begin(9600);  // Inicializa a comunicação serial a 9600 bps
}

// 3° Bloco - Função principal de execução contínua
// Exibe a distância captada pelo sensor
void loop() {  

  Serial.println(sensor.distance());
  // Aguarda 1 segundo antes da próxima leitura
  delay(1000);
}