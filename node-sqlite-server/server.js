import express from 'express';
import { DatabaseSync } from 'node:sqlite';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());


app.use(express.static(path.join(__dirname, 'public')));


app.use('/stylesheets', express.static(path.join(__dirname, 'stylesheets')));
app.use('/javascript', express.static(path.join(__dirname, 'javascript')));
app.use('/images', express.static(path.join(__dirname, 'images')));


const db = new DatabaseSync(path.join(__dirname, 'store.db'));


db.exec(`
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT
  );
`);


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/store', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'store.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

app.get('/list', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'list.html'));
});


app.get('/items', (req, res) => {
  try {
    const stmt = db.prepare('SELECT * FROM items');
    const items = stmt.all();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.post('/items', (req, res) => {
  try {
    const { name, price, description } = req.body;
    if (!name || price === undefined) {
      return res.status(400).json({ error: 'Name and price are required' });
    }

    const stmt = db.prepare('INSERT INTO items (name, price, description) VALUES (?, ?, ?)');
    const result = stmt.run(name, price, description || null);
    
    
    res.status(201).json({ 
      message: 'Item created successfully', 
      itemId: Number(result.lastInsertRowid) 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.delete('/items/:id', (req, res) => {
  const itemId = req.params.id;
  try {
    const stmt = db.prepare('DELETE FROM items WHERE id = ?');
    const result = stmt.run(itemId);

    
    if (result.changes === 0) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Database failure", details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
