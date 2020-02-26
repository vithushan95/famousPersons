// // initialize Cloud Firestore on Google Cloud Platform 
// const admin = require('firebase-admin');

// admin.initializeApp({
//   credential: admin.credential.applicationDefault()
// });

// const db = admin.firestore();

// initialize Cloud Firestore on your own server
const admin = require('firebase-admin');

let serviceAccount = require('/Users/Vithushan/Documents/famousPersonsApi/tamilmovieapi-firebase-adminsdk-131wz-35734e1f29.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();


const express = require('express');
const app = express();
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const famousPersonsRef = await db.collection('famousPersons').get();
        const famousPersons = [];
        famousPersonsRef.forEach((doc) => {
            famousPersons.push({
                id: doc.id,
                data: doc.data()
            });
        });
        res.json(famousPersons);
    } catch(e) {
        next(e);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const text = req.body;
        if(!text) throw new Error('Text is blank');
        const data = { text };
        const ref = await db.collection('famousPersons').add(data);
        res.json({
            id: ref.id,
            data
        });
    } catch(e) {
        next(e);
    }
});
module.exports = router;