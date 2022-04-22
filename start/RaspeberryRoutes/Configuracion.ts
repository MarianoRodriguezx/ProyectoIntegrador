import Route from '@ioc:Adonis/Core/Route'

Route.group(()=>{

    Route.resource('configuracion', 'ConfiguracionsController')
    Route.get('indexExtendido', 'ConfiguracionsController.indexExtendido')

}).namespace('App/Controllers/Http/Raspeberry').prefix('api/v1').middleware(['auth'])