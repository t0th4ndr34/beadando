'use strict'

const Schema = use('Schema')

class MatracsSchema extends Schema {

  up () {
    this.create('matracs', (table) => {
      table.increments()
      table.string('name', 50).notNullable()
      table.integer('amount')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('category_id').unsigned().references('id').inTable('categories')
      table.integer('type_id').unsigned().references('id').inTable('types')
      table.timestamps()
    })
  }

  down () {
    this.drop('matracs')
  }

}

module.exports = MatracsSchema
