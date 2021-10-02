/**
 * Create customers table.
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
    table.string('email').notNullable().unique('cus_email');
    table.string('phone').notNullable().unique('cus_phone');
    table.string('password').notNullable();
    table.string('image').nullable();
    table.string('dob').notNullable();
    table.string('amount').default(0);
    table.string('total-sent').default(0);
    table.string('total_receive').default(0);
    table.string('status').notNullable().default('0');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').nullable();
  });
};

/**
 * Drop customers table.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
exports.down = function (knex) {
  return knex.schema.dropTable('customers');
};
