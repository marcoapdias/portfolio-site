const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    nocache: true
})

server.get("/", function (req, res) {
    const about = {
        avatar_url: "https://avatars.githubusercontent.com/u/20601292?s=400&u=535f5d2977edd6cac69d5428ead273df8a4a0857&v=4c",
        name: "Marco Dias",
        role: "Dropshipper",
        description: 'Gerenciamento de backlog, criação de user stories e épicos, refinamento e priorização. <br>Cliente: <a href="https://www.delltechnologies.com/pt-br/index.htm" target="_blank">Dell Technologies</a>',
        link: [
            { name: "LinkedIn", url: "https://www.linkedin.com/in/marcoapdias/?locale=pt_BR" },
            { name: "Twitter", url: "https://twitter.com/marcoapdias" },
            { name: "Instagram", url: "https://www.instagram.com/marcoapdias" }
        ]
    }
    return res.render("about", { about: about })
})

server.get("/portfolio", function (req, res) {
    return res.render("portfolio", { items: videos })
})

server.get("/video", function (req, res) {
    const id = req.query.id

    const video = videos.find(function (video) {
        return (video.id == id)
    })

    if (!video) {
        return res.send("Video Não Encontrado")
    }

    return res.render("video", { item: video })
})

server.listen(5000, function () {
    console.log("Server is running");
})