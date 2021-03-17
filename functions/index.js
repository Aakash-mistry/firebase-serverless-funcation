const functions = require("firebase-functions");
const admin = require('firebase-admin')
const crypto = require('crypto')

admin.initializeApp(functions.config().firestore)
var db = admin.firestore();

exports.hashedString = functions.https.onRequest((req, res) => {
     const hashedString = crypto.createHash("sha256", "Hello").digest("hex")
     console.log(`The string is ready ${hashedString}`)
     res.send(`The string is ready ${hashedString}`)
})

exports.configFunc = functions.https.onRequest((req, res) => {
     console.log(functions.config().someservice)
     res.send(functions.config().someservice).status(200)
})

exports.readFireStoreData = functions.https.onRequest(async (req, res) => {
     try {
          const data = await db.collection("users").get()
          console.log(data)
          const users = data.map(x=>({id:x.id,name :x.data()}))
          res.send(users).status(200)
     } catch (err) {
          res.send(err).status(401)
     }
})

exports.createFireStoreData = functions.https.onRequest(async(req, res) => {
     try {
         await db.collection("users").doc("3").set({
               name: 'Vikram',
               email : "vikram@code.com"
          })
          res.send(`Write of data is successfull...`)
     } catch (err) {
          console.log(err)
          res.send(err).status(401)
     }
})

exports.updateFireStoreData = functions.https.onRequest(async(req,res) => {
     try {
          await db.collection('users').doc("2").update({
               name: 'test',
               email: 'test@test.com'
          })
          res.send("updation of data is complete")
     } catch (err) {
          console.log(err)
          res.send(err).status(401)
     }
})

exports.deleteFireStoreData = functions.https.onRequest(async (req,res) => {
     try {
          await db.collection("users").doc('2').delete()
          res.send('deletion of data was successfull')
     } catch (err) {
          res.send(err).status(401)
     }
})