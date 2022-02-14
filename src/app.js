const express = require('express');
const path= require("path");
const bcrypt=require("bcryptjs");
require("./db/conn");
const app=express();

const {Register,Student, password}=require("./models/regforms");

const port=process.env.PORT || 3000;

const static_path=path.join(__dirname,"../public");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set("view engine","hbs");
app.use(express.static(static_path));

app.get("/", (req,res) => {

    res.render("index");
});

app.get("/regform",(req,res)=>{
  res.render("regform");
});



app.get("/semester",(req,res)=>{
  res.render("login");
});

app.post("/regform",async (req,res)=>{
      try{
         const registerStudent= new Register(req.body);
            
            const registered=await registerStudent.save();
             res.render("index");

      }catch(error){
        res.sendStatus(400).send(error);
            }
});


app.post("/login",async(req,res)=>{
     try{
            
            const userid=req.body.username;
            const password=req.body.password;

           const user=await Register.findOne({userid});

           const isMatch= await bcrypt.compare(password,user.password);

           if(isMatch){
              res.render("semester");
           }else{
             res.send("invalid username or password");
           }



     }catch(error){
       res.sendStatus(400).send("invalid user");
     }
});

app.post("/semester",async(req,res)=>{
  try{
          
          const studentSemReg=new Student(req.body);
          const studentSemRegi=studentSemReg.save();
           res.render("index");

  }catch(error){
    res.sendStatus(400).send(error);
  }
});


app.listen(port, () =>{
  console.log(`server running at port ${port}`);
});


















