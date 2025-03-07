import express from "express"
import cookieParser from "cookie-parser";
import cors from  "cors"
import dotenv from "dotenv"
import mongooseDB from "./utils/db.js"
import userRoute from "./routes/user.route.js"
import companyRoute from "./routes/company.route.js"
import jobRoute from "./routes/job.route.js"
import applicationRoute from "./routes/application.route.js"
import path from "path";
dotenv.config({})


const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

const _dirname = path.resolve(); 
const corsOptions = {
    origin:'https://jobfolio-kdgz.onrender.com',
    // origin:'http://localhost:5173',
    credentials:true
};
app.use(cors(corsOptions));

 
const PORT =process.env.PORT || 3000;

//apis
app.use("/api/v1/user",userRoute)
app.use("/api/v1/company",companyRoute)
app.use("/api/v1/job",jobRoute)
app.use("/api/v1/application",applicationRoute)


// development code 
app.use(express.static(path.join(_dirname, "/frontend/dist")));

app.get('*',(req,res)=>{
    res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"))
})

app.listen(PORT ,()=>{
    mongooseDB();
    console.log(`Server running at post ${PORT}`)
})