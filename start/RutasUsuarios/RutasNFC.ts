import Route from '@ioc:Adonis/Core/Route'

Route.group(()=>{
    Route.resource('user_nfc', 'UserNfcsController')
    Route.post('verify_nfc', 'UserNfcsController.VerifyPermisy')
    
}).namespace('App/Controllers/Http/Usuarios').prefix('api/v1')