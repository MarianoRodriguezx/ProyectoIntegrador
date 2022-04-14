import Route from '@ioc:Adonis/Core/Route'

Route.group(()=>{

    Route.resource('roles', 'RolesController').apiOnly()

    Route.get('desactivarRol/:id', 'RolesController.desactivar')
    Route.get('activarRol/:id', 'RolesController.activar')

}).namespace('App/Controllers/Http/Usuarios').prefix('api/v1').middleware(['auth'])