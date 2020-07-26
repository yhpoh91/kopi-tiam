import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import helmet from 'helmet';

import KopiId from 'kopi-id';
import config from './config';

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

app.use('/', express.static('public'));
app.get('/sinkhole', (req, res) => res.json(req.query));

// KopiID Routes
app.use('/oidc', kopiId.express);

// Login API Route
app.post('/login', (req, res) => {
  const { username, password, authenticationRequestId } = req.body;
  const isUserAuthenticated = (username === 'user' && password === 'pass');
  kopiId.handleAuthenticated(res, authenticationRequestId, 'uid', isUserAuthenticated, false);
});

// Consent API Route
app.post('/consent', (req, res) => {
  const { authorizationRequestId, isConsentGivenAllow } = req.body;
  kopiId.handleAuthorized(res, authorizationRequestId, isConsentGivenAllow, false);
});

// Server
const httpServer = http.createServer(app);
httpServer.listen(listenPort, listenIp, () => console.log(`Server (${environment}) listening on ${listenIp}:${listenPort}`));
