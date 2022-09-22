const knex = require("knex")

const MainDB = knex({
     client: 'mysql',
     connection: {
          host : process.env.MYSQL_HOST|| 'localhost',
          port : 3306,
          user :  process.env.MYSQL_USER ||'root',
          password : process.env.MYSQL_PASSWORD|| '',
          database : 'twitterapp',
          ssl:{rejectUnauthorized:true}
     }
});
const LikeDB = knex({
     client: 'mysql',
     connection: {
          host : 'localhost',
          port : 3306,
          user : 'root',
          password : '',
          database : 'twitterapplikes'
     }
});
const RetweetDB = knex({
     client: 'mysql',
     connection: {
          host : 'localhost',
          port : 3306,
          user : 'root',
          password : '',
          database : 'twitterappretweets'
     }
});
const CommentsDB = knex({
     client: 'mysql',
     connection: {
          host : 'localhost',
          port : 3306,
          user : 'root',
          password : '',
          database : 'twitterappcomments'
     }
});

export { MainDB , LikeDB, CommentsDB, RetweetDB}

