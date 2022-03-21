const router = require('express').Router();
const req = require('express/lib/request');
// const { append } = require('express/lib/response');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
// const { readFromFile, writeToFile } = require('../helpers/fsUtils')
// const dbJson = require('../db/db.json')



// // /api/notes
// router.get('/notes', (req, res) => {
//     console.log('GET /api/notes')
//     console.log(dbJson)
//     res.json(dbJson)
// });

router.get('/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        res.json(JSON.parse(data))

    });
});

// adds new note to db json file
router.post('/notes', (req, res) => {
    console.info(`${req.method} request received`);

    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedNote = JSON.parse(data);
            console.log(parsedNote)
            parsedNote.push(newNote);
            console.log(newNote)
            fs.writeFile('./db/db.json', JSON.stringify(parsedNote), (writeErr) =>
                writeErr
                ? console.error(writeErr)
                : console.info('Successfully added note!')
            );
    // const response = {
    //     status: 'success',
    //     body: newNote,
    // };
    res.json(newNote);
                //     console.log(response);
                //     res.status(201).json(response);
                // } else {
                //     res.status(500).json('error in making note')
                // }
    }
    });


    }
});





module.exports = router

