import Route from '@ioc:Adonis/Core/Route'

Route.group(()=>{

    Route.resource('zone', 'ZonasController')
    
}).namespace('App/Controllers/Http/ArduinoPorts').prefix('api/v1').middleware(['auth'])