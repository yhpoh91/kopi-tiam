import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import helmet from 'helmet';

import KopiId from 'kopi-id';
import config from './config';
import router from './routes';
import errorHandler from './services/errorHandler';

const environment = process.env.NODE_ENV || 'development';
const listenIp = '0.0.0.0';
const listenPort = process.env.PORT || 8080;

// KopiID (OpenID Connect)
const kopiId = KopiId(config);

// Application
const app = express();

app.set('trust proxy', true);
app.set('view engine', 'jade');

app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, _, next) => {
  req.kopiId = kopiId;
  next();
});

app.get('/sinkhole', (req, res) => res.json(req.query));

app.use('/', express.static('public'));
app.use('/api', router);
app.use('/oidc', kopiId.express);
app.use(errorHandler.handleError);

// Server
const httpServer = http.createServer(app);
httpServer.listen(listenPort, listenIp, () => console.log(`Server (${environment}) listening on ${listenIp}:${listenPort}`));
