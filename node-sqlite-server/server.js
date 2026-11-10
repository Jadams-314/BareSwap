import express from 'express';
import { DatabaseSync } from 'node:sqlite';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'node:child_process'; // Built-in Node.js module to execute Java commands
import java from 'java';
// Tells the server where it is located on the computer
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;


app.use(express.json());

// Enables Cross-Origin Resource Sharing. Different ports can communicate
app.use(cors());

// Express.static exposes the folders to the browser
app.use(express.static(path.join(__dirname, 'public')));
app.use('/stylesheets', express.static(path.join(__dirname, 'stylesheets')));
app.use('/javascript', express.static(path.join(__dirname, 'javascript')));
app.use('/images', express.static(path.join(__dirname, 'images')));

// node:sqlite syntax
const db = new DatabaseSync(path.join(__dirname, 'store.db'));


db.exec(`
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT
  );
`);
//db.exec(`
//  CREATE TABLE IF NOT EXISTS users (
//    id INTEGER PRIMARY KEY AUTOINCREMENT,
//    name TEXT NOT NULL,
//    BearID REAL NOT NULL,
//   password TEXT
//  );
//`);

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
app.get('/javatest', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'javatest.html'));
});
app.get('/FrontEndTest', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'FrontEndTest.html'));
});
app.get('/userauthentication', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'userauthentication.html'));
});
// --- SQLite Database API Routes ---
app.get('/items', (req, res) => {
  try {
    const stmt = db.prepare('SELECT * FROM items');
    const items = stmt.all();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/users', (req, res) => {
  try {
    const stmt = db.prepare('SELECT * FROM users');
    const users = stmt.all();
    res.json(users);
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
app.post('/users', (req, res) => {
  try {
    const { name, price, description } = req.body;
    if (!name || price === undefined) {
      return res.status(400).json({ error: 'Name and price are required' });
    }

    const stmt = db.prepare('INSERT INTO users (name, password, BearID) VALUES (?, ?, ?)');
    const result = stmt.run(name, price, description || null);
    
    res.status(201).json({ 
      message: 'User created successfully', 
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

app.delete('/users:id', (req, res) => {
  const userId = req.params.id;
  try {
    const stmt = db.prepare('DELETE FROM users WHERE id = ?');
    const result = stmt.run(userId);

    if (result.changes === 0) {
      return res.status(404).json({ error: "user not found" });
    }

    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Database failure", details: err.message });
  }
});
app.get('/api/javatest', (req, res) => {
    exec('java bareswap', (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ error: 'Java Execution Failed', details: stderr });
        }
        res.json({ output: stdout.trim() });
    });
});
app.get('/api/FrontEndTest', (req, res) => {
    exec('java bareswap', (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ error: 'Java Execution Failed', details: stderr });
        }
        res.json({ output: stdout.trim() });
    });
});
app.get('/api/userauthentication', (req, res) => {
    exec('java bareswap', (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ error: 'Java Execution Failed', details: stderr });
        }
        res.json({ output: stdout.trim() });
    });
});
app.get('/run-java', (req, res) => {
    
    //exec('java HelloWorld', (error, stdout, stderr) => {
    exec('java FrontEndTest', (error, stdout, stderr) => {
    //exec('java Database', (error, stdout, stderr) => {
        if (error) {
            return res.json({ output: `Error: ${stderr || error.message}` });
        }
        
        res.json({ output: stdout.trim() });
    });
});




java.classpath.push('.'); 
java.classpath.push('./sqlite-jdbc-3.45.1.0.jar'); 


const Database = java.import('Database');

function run() {
  try {
    
    const dbInstance = Database.productionSync();

  
    console.log("Connecting to SQLite via Java class...");
    const connection = dbInstance.getConnectionSync();
    console.log("Successfully obtained Java Connection Object!");

    
    const stmt = connection.createStatementSync();
    
    
    stmt.executeSync("CREATE TABLE IF NOT EXISTS test_node (id INTEGER PRIMARY KEY, name TEXT)");
    stmt.executeSync("INSERT INTO test_node (name) VALUES ('Hello from Node!')");
    
    const resultSet = stmt.executeQuerySync("SELECT * FROM test_node");
    while (resultSet.nextSync()) {
      console.log(`Row Found -> ID: ${resultSet.getIntSync(1)}, Name: ${resultSet.getStringSync(2)}`);
    }

  
    resultSet.closeSync();
    stmt.closeSync();
    connection.closeSync();

  } catch (err) {
    console.error("An error occurred bridging Node and Java:", err);
  }
}

run();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
