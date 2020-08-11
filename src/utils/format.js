const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química"
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
]

function getSubject(subjectNumber) {
    // check if ti is a number and subtract one since starts at 0
    const arrayPosition = +subjectNumber-1
    return subjects[arrayPosition]
}

function convertHoursToMinutes(time) {
    const [hour, minutes] = time.split(':')
    return parseInt(hour)*60 + parseInt(minutes)
}

module.exports = {
    subjects,
    weekdays,
    getSubject,
    convertHoursToMinutes
}