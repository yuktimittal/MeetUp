import express from 'express';
import db from './config/db.js';
import userRoutes from './routes/user/users.routes.js';
import authRoutes from './routes/user/auth.routes.js';
import eventRoutes from './routes/event/events.js';

const app = express();

app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/event', eventRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
