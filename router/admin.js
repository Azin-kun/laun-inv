const express = require("express")
const app = express()
const md5 = require("md5")

const admin = require("../models/index").admin

const multer = require("multer")
const path = require("path")
const fs = require("fs")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./image")
    },
    filename: (req, file, cb) => {
        cb(null, "image-" + Date.now() + path.extname(file.originalname))
    }
}) 

const upload = multer({storage:storage})

app.use(express.urlencoded({extended:true}))


app.get("/",async(req, res) => {
    admin.findAll({
        include:["outlet"]
    })
    .then(result => {
        res.json(result)
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})


app.post("/", upload.single("image") , async(req, res) => {
    let data = {
        nama: req.body.nama,
        image: req.file.filename,
        username: req.body.username,
        password: md5(req.body.password),
        no_telp: req.body.no_telp,
        level: req.body.level,
        id_outlet: req.body.id_outlet
    }


    admin.create(data)
    .then(result => {
        res.json({
            message: "data telah di masukan",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})


app.put("/",upload.single("image") ,async(req, res) => {
    let data = {
        nama: req.body.nama,
        image: req.file.filename,
        username: req.body.username,
        password: md5(req.body.password),
        no_telp: req.body.no_telp,
        level: req.body.level,
        id_outlet: req.body.id_outlet
    }
        
    let param = {
        id_admin: req.body.id_admin
    }

    if (req.file) {
        let oldadmin = await admin.findOne({where: param})
        let oldImage = oldadmin.image


        //delete file lama
        let pathfile = path.join(__dirname,"../image",oldImage)
        fs.unlink(pathfile, error => console.log(error))


        data.image = req.file.filename
    }

    admin.update(data,{where : param})
    .then(result => {
        res.json({
            message: "data telah di update",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})


app.delete("/:id_admin", async(req, res) => {
    let id_admin = req.params.id_admin
    let perameter = {
        id_admin: id_admin
    }


    let oldadmin = await admin.findOne({where: perameter})
    let oldImage = oldadmin.image


    //delete file lama
    let pathfile = path.join(__dirname,"../image",oldImage)
    fs.unlink(pathfile, error => console.log(error))

    // data.image = req.file.filename

    admin.destroy({where : perameter})
    .then(result => {
        res.json({
            message: "data telah di hapus",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})


app.post("/login", async (req,res) => {
    let params = {
        username: req.body.username,
        password: md5(req.body.password)
    }


    let result = await admin.findOne({where: params})
    if(result){
        let token = jwt.sign({ sub: result.id, level: result.level }, SECRET_KEY)
        res.json({
            logged: true,
            data: result,
            token: token
        })
    }else{
        res.json({
            logged: false,
            message: "Invalid username or password",
            data: result
        })
    }
})


module.exports = app
