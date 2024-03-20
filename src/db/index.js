import mongoose from "mongoose"
import { DB_NAME } from "../constant.js  "

const connecDB = async () =>{
    try {
      const connectionInstance =   await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`/n MongoDB connected !! DB HOST : ${connectionInstance.connection.host}`)
    //    console.log(connectionInstance) //Just for checking purpose
    } catch (error) {
        console.log("MONGODB connection error",error)
        process.exit(1)
    }
}

export default connecDB