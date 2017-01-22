'use strict'

const Lucid = use('Lucid')

class Matrac extends Lucid {
    
    category () {
        return this.belongsTo('App/Model/Category')
    }
    
    type () {
        return this.belongsTo('App/Model/Type')
    }

}

module.exports = Matrac
