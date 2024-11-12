const ctx = document.getElementById('fluxoAgua').getContext('2d');
const data = {
    labels: ['01h', '03h', '05h', '07h', '09h', '11h', '13h', '15h', '17h', '19h', '21h', '23h'],
    datasets: [
        {
            label: 'Nível Atual (%)',
            data: [40, 37, 37, 37, 36, 36, 35, 34, 34, 32, 31, 30, 30],
            borderColor: 'cyan',
            borderWidth: 2,
            pointBackgroundColor: 'cyan',
            pointBorderColor: 'black',
            pointRadius: 5,
            fill: true,
            backgroundColor: 'rgba(0, 123, 167, 0.3)', // Ajuste de cor para a área preenchida
        },
        {
            label: 'Nível Ideal',
            data: [51, 51, 51, 51, 51, 51, 51, 51, 51, 51, 51, 51],
            borderColor: 'green',
            borderWidth: 1,
            borderDash: [0, 0],
            fill: false,
            pointRadius: 0
        },
        {
            label: 'Nível de Alerta',
            data: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
            borderColor: 'yellow',
            borderWidth: 2,
            borderDash: [0, 0],
            fill: false,
            pointRadius: 0
        },
        {
            label: 'Nível de risco',
            data: [25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25],
            borderColor: 'red',
            borderWidth: 1,
            borderDash: [0, 0],
            fill: false,
            pointRadius: 0
        }
    ]
};

const config = {
    type: 'line',
    data: data,
    options: {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Horário',
                    font: {
                        size: 20
                    }
                }, ticks: {
                    font: {
                        size: 16,
                        weight:'bold'
                    },  color: 'black'
                },
                grid: {
                    display: false
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Nível de água (%)', font: {
                        size: 20 
                    }
                },
                min: 0,
                max: 100,
                ticks: {
                    stepSize: 10,
                    font: {
                        size: 16,
                        weight:'bold'
                    },  color: 'black'
                },
                grid: {
                    display: false
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 18 
                    },
                    color: 'black',
                    boxWidth: 20,
                    padding: 15,generateLabels: function(chart) {
                        const original = Chart.defaults.plugins.legend.labels.generateLabels;
                        const labels = original.call(this, chart);
                        labels.forEach((label, index) => {
                            // Personaliza a cor de cada quadrado com base no dataset
                            label.fillStyle = chart.data.datasets[index].borderColor;
                        });
                        return labels;
                    }
                }
            },
        },elements: {
            line: {
                borderCapStyle: 'round',  // Arredonda as extremidades das linhas
                borderJoinStyle: 'round', // Arredonda as junções entre as linhas
            }
        }
    }
};

new Chart(ctx, config);


const hamburgerIcon = document.getElementById('hamburger-icon');
const sidebar = document.getElementById('sidebar');
const body = document.body;

hamburgerIcon.addEventListener('click', () => {
    sidebar.classList.toggle('active');  // Ativa ou desativa a sidebar
    body.classList.toggle('sidebar-active');  // Aplica o efeito de desfoque no fundo
    hamburgerIcon.classList.toggle('open');  // Rotaciona o ícone do hamburger
    document.addEventListener("DOMContentLoaded", function() {
      HGWeather.initialize();
    });
});
