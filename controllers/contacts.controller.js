import pool from '../config/database.js'

const get = async (req, res) => {
   try {
      const { id } = req.params
      const [rows] = await pool.query('SELECT * FROM contacts WHERE id = ?', [id])

      if (rows.length === 0)
         return res.status(404).json({
            message: 'Contact Not Found'
         })

      res.json(rows[0])

   } catch (error) {
      res.status(500).json({
         message: "Something went wrong"
      })
   }
}

const getAll = async (req, res) => {
   try {
      const [rows] = await pool.query('SELECT * FROM contacts')
      res.json(rows)
   } catch (error) {
      res.status(500).json({
         message: "Something went wrong"
      })
   }
}

const create = async (req, res) => {
   const { name, email, phone } = req.body

   try {
      const [row] = await pool.query(
         'INSERT INTO contacts (name, email, phone) VALUES (?, ?, ?)', [name, email, phone]
      )

      res.status(200).json({
         id: row.insertId,
         name,
         email,
         phone
      });
   } catch (error) {
      res.status(500).json({
         message: "Something went wrong"
      })
   }
}

const update = async (req, res) => {
   const id = req.params.id
   const { name, email, phone } = req.body

   try {
      const result = await pool.query(
         'UPDATE contacts SET name = ?, email = ?, phone = ? WHERE id = ?',
         [name, email, phone, id]
      )

      if (result[0].affectedRows === 0)
         return res.status(404).json({ message: 'Contact not found' })

      const [rows] = await pool.query('SELECT * FROM contacts WHERE id = ?', [id])

      res.json(rows[0])
   } catch (error) {
      res.status(500).json({
         message: "Something went wrong"
      })
   }
}

const remove = async (req, res) => {
   try {
      const [result, _] = await pool.query('DELETE FROM contacts WHERE id =?', [req.params.id])

      if (result.affectedRows === 0)
         return res.status(404).json({
            message: 'Contact Not Found'
         })

      // 204: Everything is OK but nothing is returned
      res.sendStatus(204)
   } catch (error) {
      res.status(500).json({
         message: "Something went wrong"
      })
   }
}

export {
   get,
   getAll,
   create,
   update,
   remove
}
