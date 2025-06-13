import express from 'express';
import userRoutes from '@/modules/user/user.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';

const app = express();

app.use(express.json());
app.use('/api/v1/users', userRoutes);

// Swagger route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;