const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (request, response) => {
//   response.render('index');
// });

app.listen(port, () => {
  console.log(`Starting server on port ${port}`);
});
