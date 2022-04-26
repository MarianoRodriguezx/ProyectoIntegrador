import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AccesoNfcs extends BaseSchema {
  protected tableName = 'acceso_nfcs'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('usuario_id').unsigned().references('id').inTable('users')
      table.string('nfc').notNullable().unique()
      table.string('estado').notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
