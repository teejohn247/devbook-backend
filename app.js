import express from 'express';
import Debug from 'debug';
import logger from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDb from './config/db';
import post from './controllers/post';
import userRouter from './routes/user';
import path from 'path';
import socketio from 'socket.io';
import http from 'http';

const pug = require('pug');
const siofu = require('socketio-file-upload')


const app = express();
dotenv.config();


app.use(express.static(path.join(__dirname, 'public copy/')));
app.set('view engine', pug);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
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
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on('connect', (socket) => {
  console.log('connected')
  const uploader = new siofu(socket);
  uploader.listen(socket);
  uploader.dir = "/srv/uploads";
  uploader.listen(socket);

  // Do something when a file is saved:
  uploader.on("saved", function (event) {
    console.log(event.file);
  });

  // Error handler:
  uploader.on("error", function (event) {
    console.log("Error from uploader", event);
  });

  socket.on('post', function (data) {
    console.log('The solution is: ', data);
    post(io, data)
  });

  socket.on('post_with_images', function(data){
    console.log('The solution is: ', data);
    post(io, data)
  })

});


server.listen(process.env.PORT || 4000, () => console.log(`Server has started.`));

//  app.listen(port, () => {
//     console.log(`Server running on port ${port}`)
// })



export default app;