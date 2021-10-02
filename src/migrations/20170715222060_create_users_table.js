/**
 * Create users table.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary().unsigned();
    table.string('first_name').notNullable();
    table.string('middle_name').nullable();
    table.string('last_name').notNullable();
    table.string('image').nullable();
    table.string('email').notNullable().unique('cus_email');
    table.string('address').notNullable();
    table.string('password').notNullable();
    table.string('phone').notNullable().unique('cus_phone');
    table.timestamp('dob').notNullable();
    table.string('amount').defaultTo(0);
    table.string('total_sent').defaultTo(0);
    table.string('total_recieve').defaultTo(0);
    table.string('status').notNullable().defaultTo(0);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    //table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').nullable();
  });
};

/**
 * Drop users table.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
