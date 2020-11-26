const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).send('/');
});

const port = 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
