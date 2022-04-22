import { Schema, model } from "@ioc:Mongoose"

export default model('sensores', new Schema(
    {
        nombre: String,
        pines: Array,
        efecto: Array,
        zona: String
    }
))