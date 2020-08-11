const dataBase = require('./db')
const createProffy = require('./createProffy')

dataBase.then(async(db) => {
    // include data
    proffyValue = {
        name: 'Marco',
        avatar: 'https://avatars2.githubusercontent.com/u/59663846?s=460&u=d744fe0d3cb0e854b2d6817843375feffed46567&v=4',
        whatsapp: '27996244463',
        bio: 'Me chamo marco antonio'
    }

    //  proffy_id included by dataBase
    classValue = {
        subject: 1,
        cost: 40
    }

    // class_id included by dataBase
    classScheduleValues = [{
        weekday: 1,
        time_from: 720,
        time_to: 1220
    }, {
        weekday: 0,
        time_from: 520,
        time_to: 1220
    }]

    // await createProffy(db, { proffyValue, classValue, classScheduleValues })
    // search data
    const selectedProffys = await db.all("SELECT * FROM proffys")
        //console.log(selectedProffys)

    const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
        //console.log(selectClassesAndProffys)

    const selectedClassBySchedule = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "520"
        AND class_schedule.time_to > "520"
    `)

    console.log(selectedClassBySchedule)


})