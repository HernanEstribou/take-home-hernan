import express from 'express';
import jwt from 'jsonwebtoken';
import * as authService from './auth.service.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: 'Ingrese usuario y contraseña',
    });
  }

  const user = await authService.validateUser(email, password);

  if (!user) {
    return res.status(401).json({
      error: 'Credenciales inválidas',
    });
  }

  const payload = { id: user.id, email: user.email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

  return res.status(200).json({ token });
});

export default router;
