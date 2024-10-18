function showForm(formId) {
    //DEIXA TODOS OS FORMULARIOS OCULTADOS
    const forms = document.querySelectorAll('.labels');
    forms.forEach(form => {
        form.style.display = 'none';
    });

    // EXIBE APENAS O FORMULÁRIO EXECUTADO
    const selectedForm = document.getElementById(formId);
    if (selectedForm) {
        selectedForm.style.display = 'block';
    }
}

// SERÁ EXIBIDO POR PADRÃO AO CARREGAR A PÁGINA
showForm('addEmployeeForm');
