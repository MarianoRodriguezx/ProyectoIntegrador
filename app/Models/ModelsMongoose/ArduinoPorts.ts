import { Schema, model } from "@ioc:Mongoose"

export default model('Ports', new Schema(
    {
        board: Number,
        BCM: String,
        Usado: Boolean
    }
))