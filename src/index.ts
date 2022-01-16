import express, { Request, Response } from 'express';
import { AppRouter } from './AppRouter';
import './controllers/LoginController';
import './controllers/RootController';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['laskdjf'] }));
app.use(AppRouter.getInstance());

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
