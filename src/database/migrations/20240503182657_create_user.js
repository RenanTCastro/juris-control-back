exports.up = function (knex) {
    return knex.schema.createTable("users", (table) => {
      table.increments("user_id").primary().notNullable().increment;
      table.string("email").unique().notNullable();
      table.string("senha").notNullable();
      table.string("nome");
      table.string("apelido");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
  };
  
  exports.down = (knex) => knex.schema.dropTable("users");