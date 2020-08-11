module.exports = async function(db, { proffyValue, classValue, classScheduleValues }) {
    try {
        // add data on proffys table
        const insertedProffy = await db.run(`
            INSERT INTO proffys (
                name,
                avatar,
                whatsapp,
                bio
            ) VALUES (
                "${proffyValue.name}",
                "${proffyValue.avatar}",
                "${proffyValue.whatsapp}",
                "${proffyValue.bio}"
            );
        `)
        // get proffy_id after dataBase insertion
        const proffy_id = insertedProffy.lastID

        // add data on class table
        const insertedClass = await db.run(`
            INSERT INTO classes (
                subject,
                cost,
                proffy_id
            ) VALUES (
                "${classValue.subject}",
                "${classValue.cost}",
                "${proffy_id}"
            );   
        `)
        // get class_id after dataBase insertion
        const class_id = insertedClass.lastID

        // add data on schedule table
        const insertedClassScheduleValues = classScheduleValues.map((value) => {
            return db.run(`
                INSERT INTO class_schedule (
                    class_id,
                    weekday,
                    time_from,
                    time_to
                ) VALUES (
                    "${class_id}",
                    "${value.weekday}",
                    "${value.time_from}",
                    "${value.time_to}"
                );   
            `)
        })
        await Promise.all(insertedClassScheduleValues)

        
    } catch (error) {
        console.error(`Error including data on dataBase: ${error}`)
    }

}