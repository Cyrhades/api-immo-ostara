const db = require('../../app/database_sql.js');
 
module.exports = class UserRepository {
 
    selectAll(offset = 0, limit = 100) {
        return db.promise().execute(
           "SELECT * FROM users LIMIT ?, ?", 
           [offset, limit]
        ).then(result => result[0]);
    }

    countAll() {
        return db.promise().execute( "SELECT COUNT(*) AS nb FROM users").then(result => result[0][0].nb);
    }

    selectOneById(id) {
        return db.promise().execute("SELECT `id`, `firstname`, `lastname`, `email`, `date` FROM users WHERE id = ?", [id]).then(result => result[0]);
    }

    insert(entity) {
        return db.promise().execute( 
            "INSERT INTO `users` (`firstname`, `lastname`, `email`, `password`, `date`) VALUES (?, ?, ?, ?, now())", 
            [entity.firstname, entity.lastname, entity.email, entity.password]
        );
    }

    update(id, entity) {
        return db.promise().query("UPDATE `users` SET ? WHERE `id`=?", [entity, id]);
    }

    delete(id) {
        return db.promise().execute("DELETE FROM `users` WHERE `id`=?", [id]);
    }
}