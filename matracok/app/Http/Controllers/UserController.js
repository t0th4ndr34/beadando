'use strict'

const Validator = use('Validator')
const User = use('App/Model/User')
const Hash = use('Hash')

class UserController {
    * register (req, res) {
        yield res.sendView('register')
    }

    * login (req, res) {
        yield res.sendView('login')
    }

    * doRegister (req, res) {
        const userData = req.all()

        const rules = {
            'email': 'required|email',
            'name': 'required',
            'password': 'required|min:4',
            'password_again': 'required|same:password'
        }

        const validation = yield Validator.validateAll(userData, rules)

        if (validation.fails()) {
            yield req
                .withOut('password', 'password_again')
                .andWith({ errors: validation.messages() })
                .flash()

            res.redirect('/register')
            return
        }

        const user = new User
        user.username = userData.name
        user.email = userData.email
        user.password = yield Hash.make(userData.password)

        yield user.save()
        yield req.auth.login(user)

        res.redirect('/')
    }

    * doLogin (req, res) {
        const email = req.input('email')
        const password = req.input('password')

        try {
            yield req.auth.attempt(email, password)
            res.redirect('/')
        } catch (ex) {
            yield req
                .with({ error: 'Rossz belépési adatok.' })
                .flash()
            
            res.redirect('/login')
        }
    }

    * doLogout (req, res) {
        yield req.auth.logout() 

        res.redirect('/')
    }

    * ajaxLogin (req,res) {
        const email = req.input('email')
        const password = req.input('password')

        try {
            yield req.auth.attempt(email, password)
            res.ok({ success: true })
        } catch (ex) {
            res.ok({ success: false })
        }
    }

    * ajaxLogout (req,res) {
        yield req.auth.logout()

        res.ok({ success: true })
    }

}

module.exports = UserController
