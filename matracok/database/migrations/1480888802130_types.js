'use strict'

const Schema = use('Schema')

class TypesSchema extends Schema {

  up () {
    this.create('types', (table) => {
      table.increments()
      table.string('name', 30).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('types')
  }

}

module.exports = TypesSchema