const express =require('express')
const app= express()
const cors = require('cors');
const connectDB=require('./database')
require('dotenv').config()
connectDB()

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.status(200).send('hello world')
})

app.use('/api/todos', require('./routes/router.todo'));

app.listen(process.env.PORT,()=>{
    console.log(`server started at http://localhost:${process.env.PORT}` )
})