'use strict'

const Lucid = use('Lucid')

class Type extends Lucid {
    
    matracs () {
        return this.hasMany('App/Model/Matrac')
    }
    
}

module.exports = Type
