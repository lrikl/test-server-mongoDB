import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import User from './users.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let dbUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/test-mongo-users';
if (dbUrl.startsWith('"')) {
    dbUrl = dbUrl.slice(1, -1);
}

mongoose.connect(dbUrl);

mongoose.connection.on('error', () => {
    console.error('Failed to connect to mongo');
});

mongoose.connection.once('open', () => {
    console.log('Connected to mongodb: ' + dbUrl);
});

const app = express();

app.use(express.static(path.resolve(__dirname, '../build')));
app.use(express.json());

app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    }
    catch (error) {
        console.log('Error getting users', error);
        res.status(500).send('Error getting users');
    }
});

app.post('/users', async (req, res) => {
    try {
        const { name, phone, email, message } = req.body;

        const existingUser = await User.findOne({
            $or: [{ email }, { phone }]
        });

        if (existingUser) {
            return res.status(400).json({
                error: `Помилка: ${
                    existingUser.email === email ? 'email' : 'phone'
                } вже використовується!`
            });
        }

        const newUser = new User({ name, phone, email, message });
        const userDB = await newUser.save();
        
        console.log('User is added', userDB.id);
        res.status(201).json({ id: userDB.id, message: `${name} доданий!` });

    } catch (error) {
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0]; 
            return res.status(400).json({ error: `Помилка: ${field} вже використовується!` });
        }

        res.status(500).json({ error: 'Помилка сервера' });
    }
});

const port = process.env.PORT || 5555;
const host = process.env.HOST || 'localhost';
app.listen(port, host, () => {
    console.log('Server is started at ' + host + ':' + port);
});