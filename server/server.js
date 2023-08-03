import express from 'express';
import db from './config/db.js';
import userRoutes from './routes/user/users.routes.js';
import authRoutes from './routes/user/auth.routes.js';
import eventRoutes from './routes/event/event.routes.js';
import registrationRoutes from './routes/registration/registration.routes.js';
import interestRoutes from './routes/interest/interest.routes.js';
import chatRoutes from './routes/chat/chat.routes.js';
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';

const app = express();

app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/event', eventRoutes);
app.use('/register', registrationRoutes);
app.use('/interest', interestRoutes);
app.use('/chat', chatRoutes);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
