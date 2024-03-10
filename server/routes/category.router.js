const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

router.get('/', (req, res) => {
  const queryText = `
    SELECT * FROM "categories"
      ORDER BY "name" ASC;
  `;
  pool.query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`Error on query ${error}`);
      res.sendStatus(500);
    });
});

router.delete('/:id', (req, res) => {
  const queryText = `
    DELETE FROM "categories" WHERE "id"=$1;
  `;
  pool.query(queryText, [req.params.id])
    .then((result) => {
      res.send(200);
    })
    .catch((error) => {
      console.log(`Error on query ${error}`);
      res.sendStatus(500);
    });
});

router.put('/:id', (req, res) => {

  const queryText = `
    update "categories" set "name"=$1 WHERE "id"=$2;
  `;

  console.log(req.body, req.params.id)

  pool.query(queryText, [req.body.name, req.params.id])
    .then((result) => {
      res.send(200);
    })
    .catch((error) => {
      console.log(`Error on query ${error}`);
      res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
  const queryText = `
  INSERT INTO "categories"
  ("name")
  VALUES
  ($1);
  `;

  pool.query(queryText, [req.body.name])
    .then((result) => {
      res.send(200);
    })
    .catch((error) => {
      console.log(`Error on query ${error}`);
      res.sendStatus(500);
    });
});

module.exports = router;
