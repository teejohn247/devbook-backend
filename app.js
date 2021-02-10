import express from 'express';
import Debug from 'debug';
import logger from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDb from './config/db';
import userRouter from './routes/user';
import path from 'path';

const pug = require('pug');


// const _ = require('lodash');




const app = express();
dotenv.config();

// const application = express();
// app.use(express.json());

app.use(express.static(path.join(__dirname, 'public copy/')));
app.set('view engine', pug);

app.get('/',(req, res) => {
    res.render('index.pug');
});

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

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

export default app;