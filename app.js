import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import 'express-async-errors';
import tweetsRoute from './router/tweets.js';
import authRoute from './router/auth.js';
import { config } from './config.js';
import { initSocket } from './connextion/socket.js';
import { db } from './data/db/database.js';

const app = express();

const corsOption = {
    origin: config.cors.allowedOrigin,
    optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(helmet());
app.use(cors(corsOption));
app.use(morgan('tiny'));

// app.use('/tweets', tweetsRoute);
// app.use('/auth', authRoute);

// // 파일경로가 없을때
// app.use((req, res, next) => {
//     res.sendStatus(404);
// });

// // 서버애러
// app.use((error, res, next) => {
//     console.error(error);
//     res.sendStatus(500);
// });

// db.getConnection().then((connection) =>
//     console.log(`Server is Started... ${new Date()}`)
// );

app.get('/', (req, res, next) => {
    res.end('Hello~');
});

app.listen(config.port.port);

// const server = app.listen(config.port.port);
// initSocket(server);
