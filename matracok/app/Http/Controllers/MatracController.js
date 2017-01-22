'use strict'

const Category = use('App/Model/Category')
const Type = use('App/Model/Type')
const Matrac = use('App/Model/Matrac')
const Validator = use('Validator')

class MatracController {

    * main (req, res) {
        const categories = yield Category.all()

        for (const category of categories) {
            const topMatrac = yield category.matrac().limit(3).fetch()
            category.topMatrac = topMatrac.toJSON()
        }

        yield res.sendView('main', {
            categories: categories.toJSON()
        })
    }

    * matracok (req, res) {
        const categories = yield Category.all()

        for (const category of categories) {
            const allMatrac = yield category.matrac().fetch()
            category.allMatrac = allMatrac.toJSON()
        }

        yield res.sendView('matracok', {
            categories: categories.toJSON()
        })
    }

    * create (req, res) {
        const categories = yield Category.all()
        const types = yield Type.all()

        yield res.sendView('matracCreate', {
            categories: categories.toJSON(),
            types: types.toJSON()
        })
    }

    * doCreate (req, res) {
        const matracData = req.all()

        const rules = {
            'name': 'required|min:3',
            'amount': 'required',
        }

        const validation = yield Validator.validateAll(matracData, rules)
        if (validation.fails()) {
            yield req
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash()

            res.redirect('/matrac/create')
            return
        }

        const matrac = new Matrac()
        matrac.name = matracData.name
        matrac.user_id = 1
        matrac.category_id = matracData.category
        matrac.type_id = matracData.type
        matrac.amount = matracData.amount


        yield matrac.save()

        res.redirect(`/matrac/${matrac.id}`)
    } 

    * show (req, res) {
        const matrac = yield Matrac.find(req.param('id'))
        yield matrac.related('category').load()
        yield matrac.related('type').load()

        yield res.sendView('matrac', {
            matrac: matrac.toJSON()
        })
    }

    * edit (req, res) {
        const matrac = yield Matrac.find(req.param('id'))
        const categories = yield Category.all()
        const types = yield Type.all()

        yield res.sendView('matracEdit', {
            matrac: matrac.toJSON(),
            categories: categories.toJSON(),
            types: types.toJSON()
        })
    }

    * doEdit (req, res) {
        const matrac = yield Matrac.find(req.param('id'))

        if (matrac === null) {
            res.notFound('Sajnálom a matrac nem található.')
            return
        }

        const matracData = req.all()

        const rules = {
            'name': 'required|min:3',
            'amount': 'required',
        }

        const validation = yield Validator.validateAll(matracData, rules)
        if (validation.fails()) {
            yield req
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash()

            res.redirect(`/matrac/${matrac.id}/edit`)
            return
        }

        matrac.name = matracData.name
        matrac.category_id = matracData.category
        matrac.type_id = matracData.type
        matrac.amount = matracData.amount

        yield matrac.save() 

        res.redirect(`/matrac/${matrac.id}`)
    }

    * doDelete (req, res) {
        const matrac = yield Matrac.find(req.param('id'))

        yield matrac.delete()

        res.redirect('/')
    }

    * ajaxDelete (req, res) {
        const matrac = yield Matrac.find(req.param('id'))

        yield matrac.delete()

        res.ok({ success: true })
    }
    
    * ajaxCreate (req, res) {
        const matracData = req.all()

        const rules = {
            'name': 'required|min:3',
            'amount': 'required',
        }

        const validation = yield Validator.validateAll(matracData, rules)
        if (validation.fails()) {
            yield req
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash()

            res.ok({ success: false })
            //return
        }

        const matrac = new Matrac()
        matrac.name = matracData.name
        matrac.user_id = 1
        matrac.category_id = matracData.category
        matrac.type_id = matracData.type
        matrac.amount = matracData.amount


        yield matrac.save()

        res.ok({ success: true })
    }
   
}

module.exports = MatracController