const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const router = require('../routers/main');

// import './passport';

// import routers from '../routers';

const app = express();

// const RedisStore = redisStore(session);

// const redisClient = redis.createClient();

// const sessionMiddleware = session({
//     store: new RedisStore({ client: redisClient }),
//     secret: 'affsafasafs',
//     resave: true,
//     rolling: true,
//     saveUninitialized: false,
//     cookie: {
//         path: '/',
//         maxAge: 60 * 60 * 1000,
//         httpOnly: false,
//     },
// });


// app.use(cors({
//     origin: '*',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
//     credentials: true,
// }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(sessionMiddleware);
// app.use(passport.initialize());
// app.use(passport.session());

// console.log(router);

app.use('/', router);

// app.use('/admin', routers.admin);

// app.use('/events', routers.events);

// app.use('/auth', routers.auth);

// app.use('/user', routers.user);

// app.use('/teams', routers.teams);

// app.use('/projects', routers.projects);

// app.use('/notifications', routers.notifications);

// app.use('/portfolio', routers.portfolio);

// app.use('/profile', routers.profile);

// app.use('/postal', routers.postal);

app.listen(8000);
