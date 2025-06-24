import express from 'express';
import userRoutes from '@/modules/user/user.routes';
import authRoutes from '@/modules/auth/auth.routes';
import linkRoutes from '@/modules/link/link.routes';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './docs/swaggerConfig';
import { errorMiddleware } from './middlewares/error.middleware';


const app = express();

app.use(express.json());
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/links', linkRoutes);

app.use(errorMiddleware);

// Swagger route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;