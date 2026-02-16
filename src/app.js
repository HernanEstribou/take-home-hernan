import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import usersRouter from './users/users.controller.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocumentation from './swagger/swagger.json' with { type: 'json' };
import './config/database.js';

const app = express();
const port = process.env.PORT || 3000;

// Trust proxy - required for Heroku to detect HTTPS correctly
app.set('trust proxy', 1);

app.use(express.json());
app.use(cors());

// Swagger setup with dynamic scheme detection
app.use('/api-docs', swaggerUi.serve, (req, res, next) => {
  const protocol = req.protocol; // 'http' or 'https'
  const swaggerDoc = { ...swaggerDocumentation };

  // Set schemes based on protocol: current protocol first
  swaggerDoc.schemes =
    protocol === 'https' ? ['https', 'http'] : ['http', 'https'];

  swaggerUi.setup(swaggerDoc)(req, res, next);
});

app.use('/users', usersRouter);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}

export default app;
