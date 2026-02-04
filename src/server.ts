import 'reflect-metadata'
import express from 'express';
import './database';


const app = express();

app.get("/users", (req, res) =>{
    return res.json({ message: "Hello World" });
})

app.post("/", (req, res) =>{
    return res.json({ message: "ebaaaaaaaa" });
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});