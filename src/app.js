import express from 'express';
import usersRouter from './users/users.controller.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocumentation from './swagger/swagger.json' with { type: 'json' };

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocumentation));
app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
