const express = require('express');
var path = require("path");
const app = express();

app.use('/src', express.static('src'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(8080, () => console.log('App is running on port 8080!'));
