import { Schema, model } from "@ioc:Mongoose"

export default model('zones', new Schema(
    {
        name: String
    }
))