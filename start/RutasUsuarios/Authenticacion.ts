import Route from '@ioc:Adonis/Core/Route'

Route.group(()=>{

    Route.post('register', 'AuthController.registro')
    Route.post('login', 'AuthController.login')

}).namespace('App/Controllers/Http/Usuarios').prefix('auth/v1')

//------------------------------------------------------------------------//

Route.group(()=>{

    //Route.resource('users', )

    
    Route.put('actualizarRol', 'AuthController.actualizarRol')
    Route.resource('user', 'AuthController')
    Route.get('userData', 'AuthController.userData')
    Route.get('logout', 'AuthController.logout')
    Route.get('users', 'AuthController.usersData')

}).namespace('App/Controllers/Http/Usuarios').prefix('auth/v1').middleware(['auth'])