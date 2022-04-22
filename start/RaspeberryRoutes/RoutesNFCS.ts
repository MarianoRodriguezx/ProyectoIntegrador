import Route from '@ioc:Adonis/Core/Route'

Route.group(()=>{

    Route.resource('nfc', 'NfcsController')

}).namespace('App/Controllers/Http/Raspeberry').prefix('api/v1')//.middleware(['auth'])