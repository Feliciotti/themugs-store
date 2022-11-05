//------------------- dependencies -------------------
import 'dotenv/config';
import path from 'path'
import express from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import exphbs from 'express-handlebars';
import cookieParser from 'cookie-parser';
import { createServer } from 'http'
import { Server as IOServer } from 'socket.io'


// js files
import {
    log,
    home,
    chat,
    cart,
    order,
    profile,
    products
} from './routes/index.js';
import './routes/middleware/passport/local.js'
import './db/mongoose.js'
import { createRoles } from './libs/rolesSetup.js'
import sockets from './libs/websockets.server.js'

//------------------- server settings -------------------
//initialization
const app = express();
createRoles()
// websockets
const httpServer = createServer(app)
const io = new IOServer(httpServer)
sockets(io)

//Session settings
app.use(cookieParser());
app.use(session({
    store: MongoStore.create({ mongoUrl: process.env.MONGO_DB_URI }),
    secret: 'byAntionioBanderas',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 100000
    }
}))

//passport
app.use(passport.initialize());
app.use(passport.session());

// template
app.set('views', path.join(path.dirname(''), 'views'));
app.set('view engine', '.hbs');
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    extname: 'hbs'
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

//folder to store public files (avatars  // websocket client)
app.use(express.static(path.resolve('public')));

//------------------- Routes -------------------
app.use(
    log,
    home,
    cart,
    chat,
    order,
    products,
    profile
);

// ------------------- PORT -------------------
const PORT = process.env.PORT || 4000

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor http esuchando en el puerto ${server.address().port}`)
});
server.on("error", error => console.log(`Error en el servidor ${error}`));