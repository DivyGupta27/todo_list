const { default: mongoose } = require("mongoose");
require('dotenv').config()

let  startdb=()=>{mongoose.connect(process.env.MY_DB)
.then((result)=>{
    console.log('Database connected')
})
.catch((error)=>{
    console.log('Error detected',error)
})
}
module.exports=startdb
