const connection = require("../config/db");
const sha1 = require("sha1");

class PlateController{

    viewForm = (req, res) => {
        let sql = `select name, chef_id from chef`;
        connection.query(sql, (error, result) => {
            if (error) throw error;
            res.render("addPlate", {result});
        })
        
    }

    registerplate = (req, res) => {
        let {chef_name, plate_name, plate_description} = req.body;
        let sql = `insert into plate (plate_name, plate_description, chef_id) values ('${plate_name}', '${plate_description}', '${chef_name}')`;
        if ( req.file != null){
            let image = req.file.filename;
            sql = `insert into plate (plate_name, plate_description, plate_img, chef_id) values ('${plate_name}', '${plate_description}', '${image}', '${chef_name}')`;
        }
        connection.query(sql, (error, result) => {
            if (error) throw error;
            res.redirect(`/chef/oneChef/${chef_name}`);
        })

    
    }

    viewEditForm = (req, res) => {
        let plate_id = req.params.plate_id;
        let sql = `select * from plate where plate_id = ${plate_id}`;
        connection.query(sql, (error, result) => {
            if (error) throw error;
            res.render("editPlate", {result});
        })

    }
    

    saveChanges = (req, res) => {
        let {chef_id, plate_id} = req.params;
        let {plate_name, plate_description} = req.body;
        let sql = `update plate set plate_name = '${plate_name}', plate_description = '${plate_description}' where plate_id = ${plate_id}`;
        connection.query(sql, (error, result) => {
            if (error) throw error;
            res.redirect(`/chef/oneChef/${chef_id}`)
        })
    }

    deletePlate = (req, res) => {
        let {plate_id, chef_id} = req.params;
        let sql = `delete from plate where plate_id = ${plate_id}`;
        connection.query(sql , (error, result) => {
            if (error) throw error;
            res.redirect(`/chef/oneChef/${chef_id}`);
        })
    }
    

}






module.exports = new PlateController();