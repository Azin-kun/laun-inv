const express = require("express")
const app = express()


const outlet = require("../models/index").outlet


app.use(express.urlencoded({extended:true}))

//verify token
// const verifyToken = require("./verifytoken")
// app.use(verifyToken)

app.get("/", async(req, res) => {
    outlet.findAll()
    .then(result => {
        res.json(result)
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})


app.post("/", async(req, res) => {
    //tampung data request
    let data = {
        id_owner: req.body.id_owner,
        nama_outlet: req.body.nama_outlet,
        alamat: req.body.alamat
    }


    outlet.create(data)
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

app.put("/", async(req, res) => {
    //tampung data request
    let data = {
        id_owner: req.body.id_owner,
        nama_outlet: req.body.nama_outlet,
        alamat: req.body.alamat
    }
        
    let param = {
        id_outlet: req.body.id_outlet
    }


    outlet.update(data,{where : param})
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


app.delete("/:id_outlet", async(req, res) => {
    let id_outlet = req.params.id_outlet
    let perameter = {
        id_outlet: id_outlet
    }


    outlet.destroy({where : perameter})
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


module.exports = app
