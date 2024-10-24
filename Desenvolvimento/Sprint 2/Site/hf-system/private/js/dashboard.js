function showForm(formId) {
  //DEIXA TODOS OS FORMULARIOS OCULTADOS
  const forms = document.querySelectorAll(".labels");
  forms.forEach((form) => {
    form.style.display = "none";
  });

  // EXIBE APENAS O FORMULÁRIO EXECUTADO
  const selectedForm = document.getElementById(formId);
  if (selectedForm) {
    if (formId != "dashboard_section_geral") {
      selectedForm.style.display = "block";
    }else{
      selectedForm.style.display = "grid";
    }
  }
}

// SERÁ EXIBIDO POR PADRÃO AO CARREGAR A PÁGINA
showForm("dashboard_section_geral");

const ctx = document.getElementById("myChart");

new Chart(ctx, {
  type: "line",
  data: {
    labels: ["01/01", "02/01", "03/01", "04/01", "05/01", "06/01"],
    datasets: [
      {
        label: "Reservatorio 1",
        data: [100, 85, 75, 50, 30, 3],
        borderWidth: 4,
        borderColor: "#0e617c",
        backgroundColor: "#0e617c",
      },
      {
        label: "Reservatorio 2",
        data: [60, 100, 72, 67, 35, 5],
        borderWidth: 4,
        borderColor: "#36a3b3",
        backgroundColor: "#36a3b3",
      },
      {
        label: "Reservatorio 3",
        data: [70, 55, 42, 36, 27, 4],
        borderWidth: 4,
        borderColor: "#27d4d4",
        backgroundColor: "#27d4d4",
      },
      // {
      //   label: "Capacidade Total",
      //   data: [100, 100, 100, 100, 100, 100],
      //   borderWidth: 1,
      //   borderColor: "#07313e ",
      //   backgroundColor: "#07313e ",
      // },
      // {
      //   label: "Ideal",
      //   data: [85, 85, 85, 85, 85, 85],
      //   borderWidth: 1,
      //   borderColor: "#0bd365 ",
      //   backgroundColor: "#0bd365 ",
      // },
      // {
      //   label: "Abaixo do Ideal",
      //   data: [40, 40, 40, 40, 40, 40],
      //   borderWidth: 1,
      //   borderColor: "#d3400b ",
      //   backgroundColor: "#d3400b ",
      // },
      // {
      //   label: "Muito Abaixo do Ideal",
      //   data: [20, 20, 20, 20, 20, 20],
      //   borderWidth: 1,
      //   borderColor: "#d3c90b ",
      //   backgroundColor: "#d3c90b ",
      // },
      // {
      //   label: "Limite",
      //   data: [5, 5, 5, 5, 5, 5],
      //   borderWidth: 1,
      //   borderColor: "#d92727 ",
      //   backgroundColor: "#d92727 ",
      // },

      // {
      //   label: "Sem Água",
      //   data: [0, 0, 0, 0, 0, 0],
      //   borderWidth: 1,
      //   borderColor: "#bf0202 ",
      //   backgroundColor: "#bf0202 ",
      // }
    ],
  },
  options: {
    plugins: {
      legend: {
        labels: {
          // Filtro para exibir somente os labels dos reservatórios
          filter: function (legendItem) {
            return legendItem.text === "Reservatorio 1" || 
                   legendItem.text === "Reservatorio 2" || 
                   legendItem.text === "Reservatorio 3";
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});


const ctx2 = document.getElementById("myChart2");

new Chart(ctx2, {
  type: "bar",
  data: {
    labels: ["01/01", "02/01", "03/01", "04/01", "05/01", "06/01"],
    datasets: [
      {
        label: "reservatório 1",
        data: [200000, 150000, 270000, 167000, 234000, 255000],
        borderWidth: 1,
        borderColor: "#0E617C",
        backgroundColor: "#0E617C",
      },
      {
        label: "reservatório 2",
        data: [100000, 178000, 90000, 125000, 194000, 106000],
        borderWidth: 1,
        borderColor: "#36a3b3",
        backgroundColor: "#36a3b3",
      },
      {
        label: "reservatório 3",
        data: [280000, 110000, 170000, 199000, 207000, 149000],
        borderWidth: 1,
        borderColor: "#27d4d4",
        backgroundColor: "#27d4d4",
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

const ctx3 = document.getElementById("myChart3");
