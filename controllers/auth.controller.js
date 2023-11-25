import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/database.js';
import config from '../config.js';

const signup = async (req, res) => {
   const { username, password } = req.body;

   const [exists] = await pool.query('SELECT * FROM users WHERE username = ? LIMIT 1', [username])

   if (exists.length > 0)
      return res.status(400).json({
         message: 'Username already exists'
      })

   const salt = bcrypt.genSaltSync(10);
   const hash = bcrypt.hashSync(password, salt);

   const [result] = await pool.query('INSERT INTO users (username, password) VALUES(?, ?)', [username, hash])

   const token = jwt.sign({ id: result.insertId }, config.SECRET_KEY, {
      expiresIn: 86400 // 24 hours
   })

   res.status(200).json({ token })
}

const signin = async (req, res) => {
   const { username, password } = req.body

   const [rows] = await pool.query('SELECT * FROM users WHERE username = ? LIMIT 1', [username])

   if (rows.length === 0)
      return res.status(400).json({
         message: "User not found"
      })

   const matchPassword = await bcrypt.compare(password, rows[0].password)

   if (!matchPassword)
      return res.status(401).json({
         token: null,
         message: "Invalid password",
      })

   const token = jwt.sign({ id: rows[0].id }, config.SECRET_KEY, {
      expiresIn: 86400 // 24 hours
   })

   res.json({ token })
}

export { signup, signin }
