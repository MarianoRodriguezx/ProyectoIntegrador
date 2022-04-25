import Route from '@ioc:Adonis/Core/Route'

Route.group(()=>{

    Route.resource('sensores', 'SensoresController').apiOnly()
    Route.get('indexP', 'SensoresController.indexP')

}).namespace('App/Controllers/Http/Raspeberry').prefix('api/v1').middleware(['auth'])