'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')


Route.get('/', 'MatracController.main')
Route.get('/matracok', 'MatracController.matracok')
Route.get('/matrac/create', 'MatracController.create').middleware('auth')
Route.post('/matrac/create', 'MatracController.doCreate').middleware('auth')

Route.get('/matrac/:id', 'MatracController.show')
Route.get('/matrac/:id/edit', 'MatracController.edit')
Route.post('/matrac/:id/edit', 'MatracController.doEdit')
Route.post('/matrac/:id/delete', 'MatracController.doDelete')

Route.get('/register', 'UserController.register')
Route.post('/register', 'UserController.doRegister')

Route.get('/login', 'UserController.login')
Route.post('/login', 'UserController.doLogin')
Route.get('/logout', 'UserController.doLogout')

Route.group('ajax', function () {
    Route.post('/login', 'UserController.ajaxLogin')
    Route.get('/logout', 'UserController.ajaxLogout')
    Route.delete('/matrac/:id/delete', 'MatracController.ajaxDelete').middleware('auth')
    Route.post('/matrac/create', 'MatracController.ajaxCreate').middleware('auth')
}).prefix('/ajax')