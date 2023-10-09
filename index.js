const app = require('./app');
require("dotenv").config();

const port = process.env.PORT ||2727;


app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
