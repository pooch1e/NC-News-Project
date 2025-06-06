//listen.js
const app = require('./app');
const { PORT = 8080 } = process.env;

app.listen(PORT, (err) => {
  if (err) {
    console.log('not running');
    return err;
  } else {
    return console.log(`listening on ${PORT}`);
  }
});
