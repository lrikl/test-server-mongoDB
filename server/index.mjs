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
        const { name, age, email } = req.body;
        const newUser = new User({
            name,
            age,
            email
        });
        const userDB = await newUser.save();
        console.log('User is added', userDB.id);
        res.send({id:userDB.id, message: name + ' is added'});
    }
    catch (error) {
        console.log('Error adding a user', error);
        res.status(500).send('Error addinga user');
    }
});

const port = process.env.PORT || 5555;
const host = process.env.HOST || 'localhost';
app.listen(port, host, () => {
    console.log('Server is started at ' + host + ':' + port);
});