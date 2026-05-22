import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler } from './middlewares/errorHandler';
import { requestLogger } from './middlewares/requestLogger';
import routes from './modules';

const app = express();

// Security & parsing
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(requestLogger);

// All API routes
app.use('/api/v1', routes);

// Health check
app.get('/health', (_, res) => res.status(200).send('OK'));

// Global error handler
app.use(errorHandler);

export default app;
