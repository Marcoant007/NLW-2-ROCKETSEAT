const express = require('express')
const nunjucks = require('nunjucks')
const server = express()
const {
    getStudyPage,
    getLandingPage,
    getGiveClassesPage,
    saveClasses
} = require('./pages')

// configuring template engine
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

// running aplication server
server.use(express.urlencoded({ extended: true})) // enable req.body requests
    .use(express.static('public'))
    .get('/', getLandingPage)
    .get('/study', getStudyPage)
    .get('/give-classes', getGiveClassesPage)
    .post('/save-classes', saveClasses)
    .listen(5500)