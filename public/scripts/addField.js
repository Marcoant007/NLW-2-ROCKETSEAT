document.querySelector('#add-time').addEventListener('click', cloneField)

function cloneField() {
    var isFilled = true
    const scheduleFieldContainer = document.querySelectorAll('.schedule-item')
    const lastScheduleBlock = scheduleFieldContainer[scheduleFieldContainer.length - 1].cloneNode(true)
    const fields = lastScheduleBlock.querySelectorAll('input')
    
    fields.forEach((field) => {
        if(!field.value) isFilled = false
        field.value = ''
    })
    
    if(isFilled) document.querySelector('#schedule-items').appendChild(lastScheduleBlock)
    else alert('Preencha todos os campos dos horários disponíveis')
}