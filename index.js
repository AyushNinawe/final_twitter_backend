import express from "express";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js"
import databaseConnection from "./config/database.js";
import cookieParser from "cookie-parser";
import tweetRoute from "./routes/tweetRoute.js"
import cors from "cors";

dotenv.config({
    path:".env"
})
databaseConnection();
const app =express();
const corsOptions={
    origin:"http://localhost:3000",
    credentials:true
}
app.use(cors(corsOptions));
app.use(cookieParser()); // ✅ Middleware to read cookies
app.use(express.json()); // Parses JSON data
// app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data


// app.use((req,res,next));

app.use((req,res,next)=>{
    console.log("Request Cookies:",req.cookies);
    console.log("Request Headers:",req.headers.authorization);
    next();
})


app.use(express.urlencoded({
    extended:true
}));
app.listen(process.env.PORT,()=>{
    console.log(`server listen at port ${process.env.PORT}`);
})
app.get("/",(req,res)=>{
    res.send("welcome to the Api ");

});

app.use("/api/v1/user",userRoute);
app.use("/api/v1/tweet",tweetRoute);