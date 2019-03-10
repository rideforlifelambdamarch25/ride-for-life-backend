
exports.up = function(knex, Promise) {
    return knex.schema.createTable('rides', tbl => {
        tbl.increments('ride_id');



        tbl.integer('user_id').unsigned();
        tbl.foreign('user_id').references('user_id').on('users')

        tbl.integer('driver_id').unsigned();
        tbl.foreign('driver_id').references('drivers').on('drivers')

        tbl.timestamp('created_at')


  
  
  
  
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("rides");
};
