const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// return all favorite images
router.get('/', (req, res) => {
  const queryText = `SELECT * FROM "favorites" ORDER BY "id" DESC;`;

  pool.query(queryText)
  .then((result) => { res.send(result.rows); })
  .catch((err) => {
    console.log('Error in GET /api/favorites', err);
    res.sendStatus(500);
  });
});

// add a new favorite
router.post('/', (req, res) => {
  const faveGif = req.body;
  const postText = `
  INSERT INTO "favorites"
  ("url", "title")
  VALUES
  ($1, $2);
  `
  const faveValues = [
    faveGif.gifURL,
    faveGif.gifName
  ];

  pool.query(postText, faveValues)
  .then((result) => {
    res.sendStatus(201);
  }).catch((error) => {
      console.log('Got an error posting to faves', error);
    })
});

// update a favorite's associated category
router.put('/:id', (req, res) => {
  // req.body should contain a category_id to add to this favorite image
  res.sendStatus(200);
});

// delete a favorite
router.delete('/:id', (req, res) => {
  const queryText =`DELETE FROM "favorites" WHERE id=$1;`;

pool.query(queryText, [req.params.id])
.then(() => { res.sendStatus(200); })
.catch((err) => {
  console.log('Error in DELETE /api/gifs/:id', err);
  res.sendStatus(500);
});
});

module.exports = router;
