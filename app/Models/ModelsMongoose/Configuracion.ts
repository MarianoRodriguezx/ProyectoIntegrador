import { Schema, model } from "@ioc:Mongoose"

export default model('configuracion', new Schema(
    {
        SensorID: String,
        Sensor: String,
        Unidad: String,
        Valor: Number,
        Fecha: Date
    }
))