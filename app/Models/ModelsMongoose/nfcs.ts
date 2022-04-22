import { Schema, model } from "@ioc:Mongoose"

export default model('Nfcs', new Schema(
    {
        llave: String,
        f_reg: Date
    }
))