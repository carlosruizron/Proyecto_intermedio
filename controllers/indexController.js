const connection = require("../config/db");
class IndexController {
    viewHome = (req, res) => {
        let sql = `select * from chef`;
        connection.query(sql, (error, result) => {
            if (error) throw error;
            res.render("index", {result}); 
        })
    }
}






module.exports = new IndexController();