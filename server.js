const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express:server,
    autoescape: false,
    nocache: true
})

server.get("/", function(req, res) {
    const about = {
        avatar_url: "https://media-exp1.licdn.com/dms/image/C4E03AQGovqFB45oNhw/profile-displayphoto-shrink_200_200/0/1517653557842?e=1618444800&v=beta&t=YaReY183sGdD8DLaKABEv6KFKF5ZgSvPzmHs9aentXc",
        name: "Marco Dias",
        role: "Product Owner - Grupo Meta",
        description: 'Gerenciamento de backlog, criação de user stories e épicos, refinamento e priorização. <br>Cliente: <a href="https://www.delltechnologies.com/pt-br/index.htm" target="_blank">Dell Technologies</a>',
        link: [
            {name: "LinkedIn", url: "https://www.linkedin.com/in/marcoapdias/?locale=pt_BR"},
            {name: "Twitter", url: "https://twitter.com/marcoapdias"},
            {name: "Instagram", url: "https://www.instagram.com/marcoapdias"}
        ]
    }
    return res.render("about", {about: about})
})

server.get("/portfolio", function(req, res) {
    return res.render("portfolio", { items: videos })
})

server.get("/video", function(req, res) {
    const id = req.query.id
    
    const video = videos.find( function(video) {
        return (video.id == id) 
    })

    if (!video) {
        return res.send("Video Não Encontrado")
    }

    return res.render("video", { item: video })
})

server.listen(5000, function() {
    console.log("Server is running");
})