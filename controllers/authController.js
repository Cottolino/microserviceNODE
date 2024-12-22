require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
//export DEBUG=app:generale
const debugGenerale = require('debug')('app:generale');
const { MongoClient, ObjectId } = require('mongodb');

const URLMongo = 'mongodb+srv://giuseppe2:db_123@cluster0.8p51urq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';


const client = new MongoClient(URLMongo || process.env.DB_URI);
var db = {};
var collection = {};

const JWT_SECRET_VAR = 'mysecretkey';


async function login(req, res) {
    client.connect();
    db = client.db('e-commerce');
    collection = db.collection('users');

    const { username, password } = req.body;
        console.log(req.body);
        debugGenerale('Login');
        debugGenerale('Login attempt for user = %s', username);
        debugGenerale('Password = %s', password);
        try{
            const user = await collection.findOne({username: username});
            if(user)
            {
                const isPasswordCorrect = await bcrypt.compare(password, user.password);
                if(isPasswordCorrect)
                {
                    // const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET_VAR, { expiresIn: '1h' });
                    
                    debugGenerale('Token = %s', token);
                    debugGenerale('Login successful');

                    return res.json({ token: token, username: user.username, id: user._id });
                    // res.send('Login successful');
                }
                else
                {
                    debugGenerale('Login failed');
                    // return res.send('Login failed');
                    return res.json({
                        message: 'Login failed',
                    });
                }
            }
            else
            {
                // return res.send('No User Found');
                return res.json({
                    message: 'No User Found',
                });
            }
        }catch(err){
            console.log(err);
        }
}
async function register(req, res) {
    client.connect();
    db = client.db('e-commerce');
    collection = db.collection('users');

    console.log(req.body);
        const { username, password } = req.body;
        debugGenerale('Register');
        debugGenerale('Register attempt for user = %s', username);
        debugGenerale('Password = %s', password);
        const user = await collection.findOne({username: username});
        if(!user)
        {
            const hashedPassword = await bcrypt.hash(password, 10);
            const result = await collection.insertOne({username: username, password: hashedPassword});
            console.log(result);
            debugGenerale('User registered successfully');
            return res.json({
                message: 'User registered successfully',
            });
        }
        else
        {
            debugGenerale('User already exists');
            return res.json({
                message: 'User already exists',
            });
        }
}

module.exports = { login, register };