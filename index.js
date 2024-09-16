import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import { createServer } from 'http';
import cors from 'cors';
import routes from './src/routes/routesCalls.routes';
import swaggerDocs from './src/swagger';

const app = express();
//require('./src/services/auth');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.get('/home', (req, res) => {
    res.status(200).send('WELCOME!');
  });
app.use(routes);
const port = process.env.PORT || 3000;
const httpServer = createServer(app);

const users = {};

httpServer.listen(port, () => { console.log(`app is running on http://localhost:${port}`); });

export default app;