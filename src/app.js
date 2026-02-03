import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import usersRouter from './users/users.controller.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocumentation from './swagger/swagger.json' with { type: 'json' };
import './config/database.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocumentation));
app.use('/users', usersRouter);

// Solo iniciar el servidor si no estamos en modo test
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}

export default app;
