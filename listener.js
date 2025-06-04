//listen.js
const app = require('./app');
const port = 8080;

app.listen(port, (err) => {
  if (err) {
    console.log('not running');
    return err;
  } else {
    return console.log(`listening on ${port}`);
  }
});
