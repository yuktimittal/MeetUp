const express = require('express');
require('./config/db');

const app = express();

app.use(express.json());

app.use('/user', require('./routes/user/users'));

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
