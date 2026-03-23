import jwt from 'jsonwebtoken';

/**
 * Middleware que verifica la existencia y validez del JWT en el header Authorization.
 * Espera el formato: Authorization: Bearer <token>
 */
export const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // disponible en los controladores como req.user
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
