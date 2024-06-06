const { Pool } = require("pg");
const { config } = require("dotenv");

config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const getUsers = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM users");
    res.status(200).json(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    res.json(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createUsers = async (req, res) => {
  const { name, email } = req.body;
  try {
    const response = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2)",
      [name, email]
    );
    console.log(response);
    res.json({
      message: "User Added Successfully",
      body: {
        user: { name, email },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await pool.query("DELETE FROM users WHERE id = $1", [id]);
    console.log(response);
    res.json(`User ${id} deleted successfully`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const { name, email } = req.body;
  try {
    const response = await pool.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3",
      [name, email, id]
    );
    console.log(response);
    res.json("User Updated");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUsers,
  deleteUser,
  updateUser,
};
