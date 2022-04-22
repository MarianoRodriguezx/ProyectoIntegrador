import Route from '@ioc:Adonis/Core/Route'

Route.group(()=>{

    Route.resource('sensores', 'SensoresController')

}).namespace('App/Controllers/Http/Raspeberry').prefix('api/v1')