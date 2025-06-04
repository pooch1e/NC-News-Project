//listen.js
const app = require('../northcoders-news-BE/app');
const port = 8000;

app.listen(port, (err) => {
  if (err) {
    return err;
  } else {
    return console.log(`listening on ${port}`);
  }
});
