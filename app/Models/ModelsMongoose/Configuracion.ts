import { Schema, model } from "@ioc:Mongoose"

export default model('configuracion', new Schema(
    {
        SensorID: String,
        Sensor: String,
        Unidad: String,
        Valor: String,
        Fecha: Date
    },
    {
        versionKey: false
    }
))