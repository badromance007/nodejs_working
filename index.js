const express = require('express')
const dotenv = require('dotenv').config() // env variables
const port = process.env.PORT || 3500

const { FieldValue } = require('firebase-admin/firestore')
const { db } = require('./firebase.js')

const app = express()
app.use(express.json())

// get path that store HTML files
const root_path = require('path').resolve('./')
app.set('views',  root_path + '/views')
app.set('view engine', 'ejs');

app.patch('/api/hass', async (req, res) => {
    const { wan_ip } = req.body
    const homeRef = db.collection('home').doc('hass')
    const res2 = await homeRef.set({
        wan_ip: wan_ip
    }, { merge: true })
    res.status(200).send(res2)
})

// display index file and pass variable to it
app.get('/', async (req, res) => {

    const homeRef = db.collection('home').doc('hass')
    const doc = await homeRef.get()
    if (!doc.exists) {
        return res.sendStatus(400)
    }

    res.render("index", doc.data())
})

app.listen(port, () => console.log(`Server started on port ${port}`))
