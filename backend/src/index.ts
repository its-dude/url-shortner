import express from "express";
import { authRouter } from "./routes/auth.routes";
import { usersRouter } from "./routes/users.routes";
import { urlsRouter } from "./routes/urls.routes";

const app = express();



app.use(express.json())
app.use('/auth',authRouter)
app.use('/users', usersRouter)
app.use('/urls', urlsRouter)

app.get('/health', (_, res)=> {
    res.json({
        "message": "Health is fine."
    })
})

app.listen(3000, ()=>{
    console.log("server is running on port 3000");
})
