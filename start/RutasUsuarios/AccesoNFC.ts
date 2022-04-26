import Route from '@ioc:Adonis/Core/Route'

Route.group(()=> {

    Route.resource('accesoNFC', 'AccesoNfcsController')
    Route.get('cambiarEstado', 'AccesoNfcsController.cambiarEstado')
    
})