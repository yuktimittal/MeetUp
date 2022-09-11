const express = require('express');
require('./config/db');

const app = express();

app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use('/user', require('./routes/user/users'));
app.use('/auth', require('./routes/user/auth.routes'));

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
