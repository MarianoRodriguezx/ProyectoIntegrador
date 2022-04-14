import Route from '@ioc:Adonis/Core/Route'

Route.group(()=>{

    Route.resource('roles', 'RolesController')

    Route.get('desactivarRol/:id', 'RolesController.desactivar')
    Route.get('activarRol/:id', 'RolesController.activar')

}).namespace('App/Controllers/Http/Usuarios').prefix('api/v1')