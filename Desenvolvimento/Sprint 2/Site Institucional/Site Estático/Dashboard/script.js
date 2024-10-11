 const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['01/01', '02/01', '03/01', '04/01', '05/01', '06/01'],
      datasets: [{
        label: 'Nível atual',
        data: [30000, 25000, 20000, 15000, 10000, 5000, 0],
        borderWidth: 1,
        borderColor: '#0E617C',
        backgroundColor: '#0E617C',
      },{
        label: 'Nivel Mínimo',
        data: [10000,10000, 10000, 10000, 10000, 10000, 10000],
        borderWidth: 1,
        borderColor: '#FF0000 ',
        backgroundColor: '#FF0000 ',
      }],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  const ctx2 = document.getElementById('myChart2');

  new Chart(ctx2, {
    type: 'scatter',
    data: {
      labels: [20,22,24,26,28,30,32,34,36,38,40],
      datasets: [{
        label: 'Consumo de água',
        data: [30000, 25000, 20000, 15000, 10000, 5000, 0],
        borderWidth: 1,
        borderColor: '#0E617C',
        backgroundColor: '#0E617C',
      }],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });


  const ctx3 = document.getElementById('myChart3');

  new Chart(ctx3, {
    type: 'bar',
    data: {
      labels: ['01/01 08:00','01/01 18:00', '02/01 08:00','02/01 18:00', '03/01 08:00','03/01 18:00', '04/01 08:00','04/01 18:00', '05/01 08:00', '05/01 18:00','06/01 08:00', '06/01 18:00', '07/01 08:00','07/01 18:00'
      ],
      datasets: [{
        label: 'Fluxo de água',
        data: [60000,30000,26000,8000,100000,90000,73000,53000,50000,46000,47500,42000,44000,17000],
        borderWidth: 1,
        borderColor: '#0E617C',
        backgroundColor: '#0E617C',
      }],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });