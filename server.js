require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());

const usersRouters = require('./routes/users')

app.use('/users', usersRouters);

//-------------------------------
//Outra forma de fazer conexão com o db usando o mongoose
// mongoose.connect(process.env.DATABASE_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })

// const db = mongoose.connection
// db.on('error', err => console.error(err));
// db.once('open', () => console.log('connected to db'));
//-----------------------------------

connect()
async function connect()
{
    try
    {
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Connected to database')
    }
    catch(err)
    {
        console.error(' erro ao conecatar => '+ err.message)
    }
}
const PORT = 3000;
app.listen(PORT, () => console.log('listening on port', PORT))