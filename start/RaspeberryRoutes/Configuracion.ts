import Route from '@ioc:Adonis/Core/Route'

Route.group(()=>{

    Route.resource('configuracion', 'ConfiguracionsController')
    Route.get('indexExtendido', 'ConfiguracionsController.indexExtendido')
    Route.get('indexReducido', 'ConfiguracionsController.indexReducido')

}).namespace('App/Controllers/Http/Raspeberry').prefix('api/v1').middleware(['auth'])