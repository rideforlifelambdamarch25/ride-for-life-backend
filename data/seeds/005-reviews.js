exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("reviews")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("reviews").insert([
        {
          review_content:
            "Id est prima erant nobis. Ut odio alia mediocritatem mel. Cum quis assum id. At mel prima labore, no hendrerit liberavisse vim.",
          rating: 3,
          user_id: 2,
          driver_id: 1
        },
        {
          review_content:
            "Id est prima erant nobis. Ut odio alia mediocritatem mel. Cum quis assum id. At mel prima labore, no hendrerit liberavisse vim.",
          rating: 4,
          user_id: 3,
          driver_id: 2
        },
        {
          review_content:
            "Id est prima erant nobis. Ut odio alia mediocritatem mel. Cum quis assum id. At mel prima labore, no hendrerit liberavisse vim.",
          rating: 5,
          user_id: 3,
          driver_id: 5
        },
        {
          review_content:
            "Id est prima erant nobis. Ut odio alia mediocritatem mel. Cum quis assum id. At mel prima labore, no hendrerit liberavisse vim.",
          rating: 2,
          user_id: 1,
          driver_id: 3
        },
        {
          review_content:
            "Id est prima erant nobis. Ut odio alia mediocritatem mel. Cum quis assum id. At mel prima labore, no hendrerit liberavisse vim.",
          rating: 5,
          user_id: 4,
          driver_id: 1
        },
        {
          review_content:
            "Id est prima erant nobis. Ut odio alia mediocritatem mel. Cum quis assum id. At mel prima labore, no hendrerit liberavisse vim.",
          rating: 4,
          user_id: 2,
          driver_id: 4
        }
      ]);
    });
};
