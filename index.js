const express = require('express')
const dotenv = require('dotenv').config() // env variables
const port = process.env.PORT || 3500

const app = express()

// get path that store HTML files
const root_path = require('path').resolve('./')
app.set('views',  root_path + '/views')
app.set('view engine', 'ejs');


app.get('/api/hass', (req, res) => {
    res.status(200).json({
        serial_number: "1234",
        wan_ip: "1222312321",
    })
})

// display index file and pass variable to it
app.get('/', (req, res) => {
    res.render("index", {
        serial_number: "1234",
        wan_ip: "1222312321",
    })
})

app.listen(port, () => console.log(`Server started on port ${port}`))
