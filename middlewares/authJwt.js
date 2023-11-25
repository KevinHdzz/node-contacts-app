import jwt from 'jsonwebtoken';
import config from "../config.js"
import pool from '../config/database.js';

const verifyToken = async (req, res, next) => {
   try {
      const token = req.headers["x-access-token"]

      if (!token)
         return res.status(403).json({ message: "No token provided" })

      const decoded = jwt.verify(token, config.SECRET_KEY)
      req.userId = decoded.id;

      const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [req.userId])

      if (rows.length === 0)
         return res.status(404).json({ message: "User not found" })

      next()
   } catch (error) {
      return res.status(500).json({ message: "Anauthorized" })
   }
}

export { verifyToken }
