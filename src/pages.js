const {
    subjects,
    weekdays,
    getSubject,
    convertHoursToMinutes
} = require('./utils/format')
const dataBase = require('./database/db')
const createProffy = require('./database/createProffy')

function getLandingPage(req,res) {
    return res.render('index.html')
}

async function getStudyPage(req,res) {
    const filters = req.query
    var noProffysOnDB = false

    if (!filters.subject || !filters.weekday || !filters.time) {
        const query = `
            SELECT classes.*, proffys.*
            FROM proffys
            JOIN classes ON (classes.proffy_id = proffys.id)
            WHERE EXISTS (
                SELECT class_schedule.*
                FROM class_schedule
                WHERE class_schedule.class_id = classes.id
            )
        `

        try {
            const db = await dataBase
            const proffys = await db.all(query)
            proffys.map((proffy) => {
                if (proffy.subject) proffy.subject = getSubject(proffy.subject)
                else noProffysOnDB = true
            })

            if (noProffysOnDB) return res.render('study.html', { filters, subjects, weekdays })

            return res.render('study.html', { proffys, filters, subjects, weekdays })
        } catch (error) {
            console.error(`Error searching study data on dataBase for page without query: ${error}`)
        }
    }

    const timeInMinutes = convertHoursToMinutes(filters.time)

    const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS (
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <= ${timeInMinutes}
            AND class_schedule.time_to > ${timeInMinutes}
        )
        AND classes.subject = '${filters.subject}'
    `

    try {
        const db = await dataBase
        const proffys = await db.all(query)
        proffys.map((proffy) => {
            proffy.subject = getSubject(proffy.subject)
        })
        
        return res.render('study.html', { proffys, filters, subjects, weekdays })
        
    } catch (error) {
        console.error(`Error searching study data on dataBase: ${error}`)
    }
}

function getGiveClassesPage(req,res) {
    return res.render('give-classes.html', { subjects, weekdays })
}

async function saveClasses(req,res) {
    const data = req.body

    const proffyValue = {
        name: data.name,
        avatar: data.avatar,
        whatsapp: data.whatsapp,
        bio: data.bio
    }
    const classValue = {
        subject: data.subject,
        cost: data.cost
    }

    const classScheduleValues = data.weekday.map(
        (weekday, index) => {
            return {
                weekday,
                time_from: convertHoursToMinutes(data.time_from[index]),
                time_to: convertHoursToMinutes(data.time_to[index])
            }
        }
    )

    try {
        const db = await dataBase
        await createProffy(db, { proffyValue, classValue, classScheduleValues })

        let queryString = '?subject=' + data.subject
        queryString += '&weekday=' + data.weekday[0]
        queryString += '&time=' + data.time_from[0]
        return res.redirect(`/study${queryString}`)
    } catch (error) {
        console.error(`Error saving proffy: ${error}`)
    }

}

module.exports = {
    getLandingPage,
    getStudyPage,
    getGiveClassesPage,
    saveClasses
}