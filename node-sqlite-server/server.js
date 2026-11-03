import express from 'express';
import { DatabaseSync } from 'node:sqlite';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

//Tells the server where it is located on comuter
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

//Parses JSON
app.use(express.json());

//Enables Cross-Origin Resource Sharing. Different ports can communicate
app.use(cors());

//Express.static exposes the folders to the browser. without these lines files
//in the folders will not show in webbrowser. for example: comment out 'stylesheets' and the webpage loses css
//express.static allows for anything in the directory to be automatically grabbed.
//without express.static you would need to type out the manual root
app.use(express.static(path.join(__dirname, 'public')));
app.use('/stylesheets', express.static(path.join(__dirname, 'stylesheets')));
app.use('/javascript', express.static(path.join(__dirname, 'javascript')));
app.use('/images', express.static(path.join(__dirname, 'images')));

//node:sqlite syntax
//This is NOT asynchronous. For the scope of our project it is fine,
//but this is technically the performance bottleneck. Node.js runs on a single thread and
//the db will pause until the htread finishes.
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
