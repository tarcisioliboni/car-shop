import express from 'express';
import 'express-async-errors';
import CarRouter from './routes/CarRoute';
import MotorcycleRouter from './routes/MotorcycleRoute';
import errorHandler from './middlewares/error';

const app = express();
app.use(express.json());
app.use('/cars', CarRouter);
app.use('/motorcycles', MotorcycleRouter);
app.use(errorHandler);

export default app;
