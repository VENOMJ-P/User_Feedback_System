import express from "express"
import cors from "cors"

import {PORT} from "./configs/server.config.js"
import connectDB from "./configs/database.config.js";
import APIRoutes from "./routers/index.routes.js";


const app=express();

app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
app.use(express.json())
app.use("/api",APIRoutes)


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
    connectDB();
})