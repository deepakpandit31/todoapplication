require('dotenv').config();

//importing express
const express =require('express');
const cors = require("cors");
const app=express();
//routes importing
const todoRoutes = require("./routes/todoRoutes.js");
// database connection
const DbConnection = require('./config/db.js');

// port no where backend will run
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/todos",todoRoutes);

app.get('/',(req,res)=>{
    res.send("todo application is running ");
});
//databse connection

DbConnection();
//server runing
app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})
