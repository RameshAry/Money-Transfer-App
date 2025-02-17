import express from 'express';
import authRoutes from './auth.route';
import userRoutes from './user.route';
import customerRoutes from './customer.route';

const router = express.Router();

// mount auth routes at /auth
router.use('/auths', authRoutes);

// mount user routes at /users
router.use('/users', userRoutes);

// mount customers routes at /customers
router.use('/customers', customerRoutes);

export default router;
