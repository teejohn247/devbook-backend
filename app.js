import express from 'express';
import Debug from 'debug';
import logger from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDb from './config/db';
import post from './controllers/post';
import likes from './controllers/likes';
import comments from './controllers/comments';
import commentLike from './controllers/commentLike';
import addFriend from './controllers/addFriend';
import confirmFriend from './controllers/confirmFriend';
import rejectFriend from './controllers/rejectFriend';
import story from './controllers/story';
import userRouter from './routes/user';
import online from './controllers/online';
import path from 'path';
import socketio from 'socket.io';
import http from 'http';
import addChat from './controllers/addChat';
import deletePost from './controllers/deletePost';

const pug = require('pug');
const siofu = require('socketio-file-upload')


const app = express();
dotenv.config();


app.use(express.static(path.join(__dirname, 'public copy/')));
app.set('view engine', pug);

app.use(logger('dev'));
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static(__dirname + '/public'));

app.use(cors());
app.options('*', cors());

const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
};
app.use(allowCrossDomain);


const port = process.env.PORT || 4000;
const debug = Debug('http');

connectDb();


app.get('/api/v1', (req, res) => {
  res.json({
    message: 'Welcome to DevBook API'
  });
});

app.use('/api/v1', userRouter);
// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "https://devbook-front.herokuapp.com",
    methods: ["GET", "POST"]
  }
});

var userlist = {}; // Array of users
var onlineUsers = []; // Array of users


io.on('connection', (socket) => {
  console.log('connected')
  const uploader = new siofu(socket);
  uploader.listen(socket);
  uploader.dir = "/srv/uploads";
  uploader.listen(socket);


  socket.on('connect', function (data, callback) {


    socket.user_id = data.user_id; // user_id to pass the user ID


    if (socket.user_id in userlist) {
      callback(false); // yup, the user has opened the tab, so do nothing
    } else {
      callback(true); // And here he's new
      userlist[socket.user_id] = data; // Figachit it in an array
      UpdateUserList(); // Updated list of online users
    }

  });

  console.log('made socket connection', socket.id);

  // Do something when a file is saved:
  uploader.on("saved", function (event) {
    console.log(event.file);
  });

  // Error handler:
  uploader.on("error", function (event) {
    console.log("Error from uploader", event);
  });

  socket.on('online_users', function (data) {
    onlineUsers.push(data.user_id)
    console.log({onlineUsers})
    console.log('The solution is: ', data);
    online(io, onlineUsers, data.user_id)
  })

  socket.on('post', function (data) {
    console.log('The solution is: ', data);
    post(io, data)
  });

  socket.on('post_with_images', function (data) {
    console.log('The solution is: ', data);
    post(io, data)
  })

  socket.on('like_post', function (data) {
    console.log('The solution is: ', data);
    likes(io, data)
  })

  socket.on('add_comment', function (data) {
    console.log('The solution is: ', data);
    comments(io, data)
  })

  socket.on('comment_like', function (data) {
    console.log('The solution is: ', data);
    commentLike(io, data)
  })

  socket.on('add_friend', function (data) {
    console.log('The solution is: ', data);
    addFriend(io, data)
  })

  socket.on('confirm_friend', function (data) {
    console.log('The solution is: ', data);
    confirmFriend(io, data)
  })

  socket.on('reject_friend', function (data) {
    console.log('The solution is: ', data);
    rejectFriend(io, data)
  })

  socket.on('story', function (data) {
    console.log('The solution is: ', data);
    story(io, data)
  })

  socket.on('chat', function (data) {
    console.log('The solution is: ', data);
    addChat(io, data)
  })

  socket.on('delete_post', function (data) {
    console.log('The solution is: ', data);
    deletePost(io, data)
  })




  var user_disconnected;
  var user_group_id;
  var current_time;



  socket.on('handle_disconnection', function (data) {
    // console.log(data);
    user_disconnected = data.user_id;
    user_group_id = data.group_id;
    current_time = data.time;

    console.log(data);
    io.sockets.emit('handle_disconnection', {
      user_id: user_disconnected,
      group_id: user_group_id,
      date: current_time,
    })

  });


  socket.on('disconnect', function () {
    console.log('disconnect');
    console.log(socket.id);
    console.log(user_disconnected);
    console.log(Date.now());

    io.sockets.emit('handle_disconnection', {
      user_id: user_disconnected,
      group_id: user_group_id,
      date: current_time,
    })
    delete userlist[socket.user_id];
    // Here some magic to the users list online the client didn't blink, for example when they go to the site links
    setTimeout(function () {
      UpdateUserList();
    }, 1000);
  })
})

  function UpdateUserList() {
    io.sockets.emit('updateusers', userlist);
  }


  server.listen(process.env.PORT || 4000, () => console.log(`Server has started.`));

  //  app.listen(port, () => {
  //     console.log(`Server running on port ${port}`)
  // })



  export default app;