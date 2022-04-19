import Route from '@ioc:Adonis/Core/Route'

Route.group(()=>{

    Route.resource('arduinoPorts', 'ArduinoPortsController')
    
}).namespace('App/Controllers/Http/ArduinoPorts').prefix('api/v1')