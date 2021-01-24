import  Knex from  'knex';

export async function up(Knex: Knex) {
    
    return Knex.schema.createTable('locations', table => {

        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('image').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.decimal('latitude').notNullable();
        table.decimal('longitude').notNullable();
        table.string('city').notNullable();
        table.string('uf').notNullable();

    });
}

export async function down(Knex: Knex) {

    return Knex.schema.dropTable('locations');
    
}