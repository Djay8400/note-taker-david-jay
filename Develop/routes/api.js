const apis = require('express').Router();
const fs = require('fs');
const uuid = require('../helper/uuid');
const reviews = require('../db/db.json');

// GET request for notes
apis.get('/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          // Convert string into JSON object
          const parsedNotes = JSON.parse(data);
            res.json(parsedNotes)
    
    
        }; 
  });
});

// POST request to add a note
apis.post('/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a note`);
  
    // Destructuring assignment for the items in req.body
    const { title, text, } = req.body;
  
    // If all the required properties are present
    if (title && text) {
      // Variable for the object we will save
      const newReview = {
        title,
        text,
        id: uuid(),
      };
  
      // Obtain existing notes
      fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          // Convert string into JSON object
          const parsedNotes = JSON.parse(data);
  
          // Add a new note
          parsedNotes.push(newReview);
  
          // Write updated notes back to the file
          fs.writeFile('./db/db.json',JSON.stringify(parsedNotes, null, 2),
            (writeErr) =>
              writeErr
                ? console.error(writeErr)
                : console.info('Successfully updated notes!')
          );
        }
      });
  
      const response = {
        status: 'success',
        body: newReview,
      };
  
      console.log(response);
      res.status(201).json(response);
    } else {
      res.status(500).json('Error in posting review');
    }
  });

  apis.delete('/notes/:id', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          // Convert string into JSON object
          const parsedNotes = JSON.parse(data);
          const notesId = req.params.id;

          for (let i = 0; i < parsedNotes.length; i++) {
            const currentNote = parsedNotes[i];
            if (currentNote.id === notesId) {
              console.log(parsedNotes.splice(i, 1))
              
            }
          }
          fs.writeFile('./db/db.json',JSON.stringify(parsedNotes, null, 2),
            (writeErr) =>
              writeErr
                ? console.error(writeErr)
                : console.info('Successfully updated notes!')
          );
        res.json(parsedNotes)
      };
  });
});
  module.exports = apis;

 