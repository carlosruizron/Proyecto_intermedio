const connection = require("../config/db");
const sha1 = require("sha1");

class ChefController {
    // nos muestra el formulario de registro
    viewForm = (req, res) => {
        res.render('register');
    }

    //Para registrarnos 
    registerChef = (req, res) => {
        let {name, surname, phone, email, password} = req.body;
        let encryptedPassword = sha1(password);
        let sql =`insert into chef (name, surname, phone, email, password) values ('${name}', '${surname}', '${phone}', '${email}', '${encryptedPassword}')`;
        connection.query(sql, (error, result) => {
            if(error) throw error;
            res.render("login", {result: ""});
        })
    }

    // Nos muestra el formulario para logearnos
    viewFormLogin = (req, res) => {
        res.render("login", {result: ""});
    }

    // Nos logeamos
    login = (req, res) => {
        let {email, password} = req.body;
        let encryptedPassword = sha1(password);
        let sql = `select chef_id from chef where email = '${email}' and password = '${encryptedPassword}'`;
        connection.query(sql, (error, result) => {
            if(error) throw error;
            if(result.length == 0){
                res.render("login", {result: "Los datos introducidos son incorrectos"});
            }
            else{
                res.redirect(`/chef/oneUser/${result[0].chef_id}`);
            }
        })
    }

    // Nos muestra la vista un chef
    viewOneUser = (req,res) => {
        let id = req.params.chef_id;
        let sql = `select * from chef where chef_id = ${id}`;
        let sql2 = `select * from plate where chef_id = ${id}`;
        connection.query(sql, (error, result) => {
            if (error) throw error;
            connection.query(sql2, (error, result2) => {
                if (error) throw error;
                res.render("oneUser", {result, result2});
            })
            
        })
    }

    // Nos muestra el cocinero sin poder editar ni nada
    viewOneChef = (req,res) => {
        let id = req.params.chef_id;
        let sql = `select * from chef where chef_id = ${id}`;
        let sql2 = `select * from plate where chef_id = ${id}`;
        connection.query(sql, (error, result) => {
            if (error) throw error;
            connection.query(sql2, (error, result2) => {
                if (error) throw error;
                res.render("oneChef", {result, result2});
            })
            
        })
    }


    // Nos enseña la vista para editar el chef
    viewEditForm = (req, res) => {
        let id = req.params.chef_id;
        let sql = `select * from chef where chef_id = ${id}`;
        connection.query(sql, (error, result) => {
            if (error) throw error;
            res.render("editChef", {result});
        })
    }

    // Guarda los cambios producidos del chef
    saveChanges = (req, res) => {
        let id = req.params.chef_id;
        let {name, surname, phone,  email, history_description, password} = req.body;
        let sql = `update chef set name = '${name}', surname = '${surname}', phone = '${phone}', email = '${email}', history_description = '${history_description}'`;
        if ( password != ""){
            let encryptedPassword = sha1(password);
            sql += `, password = '${encryptedPassword}'`;
        }
        if ( req.file != null){
            let img = req.file.filename;
            sql += `,img = '${img}'`;
        }
        if (password != "" && req.file != null){
            let encryptedPassword = sha1(password);
            let img = req.file.filename;
            sql += `, password = '${encryptedPassword}', img = '${img}'`;
        }
        sql += `where chef_id = ${id}`;
        connection.query(sql, (error, result) => {
            if (error) throw error;
            res.redirect(`/chef/oneUser/${id}`);
        })
    }




}

module.exports = new ChefController();