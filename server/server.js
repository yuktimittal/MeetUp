import express from 'express';
import db from './config/db.js';
import userRoutes from './routes/user/users.routes.js';
import authRoutes from './routes/user/auth.routes.js';
import eventRoutes from './routes/event/event.routes.js';
import registrationRoutes from './routes/registration/registration.routes.js';
import interestRoutes from './routes/interest/interest.routes.js';
import chatRoutes from './routes/chat/chat.routes.js';
import messageRoutes from './routes/message/message.route.js';
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';
import { Server } from 'socket.io';

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
app.use('/message', messageRoutes);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log(`server started at port ${port}`);
});

const io = new Server(server, {
  pingTimeout: 60000,
  cors: { origin: 'http://localhost:3000' },
});

io.on('connection', (socket) => {
  console.log('connected to socket.io');

  socket.on('setup', (userData) => {
    socket.join(userData.id);
    console.log('user data', userData.id);
    socket.emit('connected');
  });

  socket.on('join chat', (room) => {
    socket.join(room);
    console.log('User Joined Room: ' + room);
  });

  socket.on('new message', (newMessageReceived) => {
    var chat = newMessageReceived.chat;
    if (!chat.users) {
      return console.log('chat.users not defined');
    }

    chat.users.forEach((user) => {
      if (user._id == newMessageReceived.sender._id) return;

      socket.in(user._id).emit('message received', newMessageReceived);
    });
  });

  socket.on('typing', (room) => {
    socket.in(room).emit('typing');
  });
  socket.on('stop typing', (room) => {
    socket.in(room).emit('stop typing');
  });

  socket.off('setup', () => {
    console.log('USER DISCONNECTED');
    socket.leave(userData.id);
  });
});
