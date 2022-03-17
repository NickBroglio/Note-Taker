const router = require('express').Router();
const { append } = require('express/lib/response');
const fs = require('fs');
const dbJson = require('../db/db.json')



// /api/notes
router.get('/notes', (req, res) => {
    console.log('GET /api/notes')
    console.log(dbJson)
    res.json(dbJson)
})

router.post('/notes', (req, res) => {
    console.info(`${req.method} request received`);

    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text
        };

        fs.readFile('/notes', 'utf-8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const parsedNote = JSON.parse(data);

                parsedNote.push(newNote);

                fs.writeFile(
                    '/notes',
                    JSON.stringify(parsedNote, null, 4),
                    (writeErr) =>
                        writeErr
                            ? console.error(writeErr)
                            : console.info('Successfully added note!')
                );
            }
        });

        const response = {
            status: 'success',
            body: newNote,
        };

        console.log(response);
        res.status(201).json(response);
    } else {
        res.status(500).json('error in making note')
    }
})

module.exports = router
