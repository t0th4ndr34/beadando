'use strict'

const Lucid = use('Lucid')

class Category extends Lucid {
  
  matrac () {
    return this.hasMany('App/Model/Matrac')
  }
  
}

module.exports = Category
