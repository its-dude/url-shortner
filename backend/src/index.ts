import express from "express";
const app = express();

app.get('/health', (_, res)=> {
    res.json({
        "message": "Health is fine."
    })
})

app.listen(3000, ()=>{
    console.log("server is running on port 3000");
})