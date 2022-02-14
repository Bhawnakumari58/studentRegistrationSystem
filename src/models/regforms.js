const bcrypt = require("bcryptjs");
const mongoose=require("mongoose");




const regformschema= new mongoose.Schema({
    
    userid: { type : String } ,
    password:{ type : String},
    firstname: { type : String} ,
    middlename: { type : String} ,
    lastname :{ type : String},
    fathername :{ type : String},
    dateofbirth :{ type : Date},
    address :{ type : String},
    country :{ type : String},
    email :{ type : String},
    mobilenumber :{ type : Number},
    Gender :{ type : String},
    Degree :{ type : String}
})



const studentschema = new mongoose.Schema({

    deptname: { type: String },
    yrofadmsn: { type: Number },
    programme: { type: String },
    sem: { type: Number },
    regno: { type: String },
    fname: { type: String },
    lname: { type: String },
    email: { type: String },
    phone: { type: String },
    category: { type: String },
    amount: { type: Number },
    tno: { type: String },
    tdate: { type: Date },
    //fslip: { type:  Document}

});


regformschema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password= await bcrypt.hash(this.password,10);
        this.confirmpassword=undefined;
    }
    next();
})


const Register=new mongoose.model("Register",regformschema);

const Student=new mongoose.model("Student",studentschema);

module.exports={Register,Student};