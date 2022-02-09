const express = require("express")
const app = express()

const paket = require("../models/index").paket

app.use(express.urlencoded({extended:true}))

app.get("/", async(req, res) => {
    paket.findAll()
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
        jenis: req.body.jenis,
        harga: req.body.harga
    }


    paket.create(data)
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
        jenis: req.body.jenis,
        harga: req.body.harga
    }
        
    let param = {
        id_paket: req.body.id_paket
    }


    paket.update(data,{where : param})
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


app.delete("/:id_paket", async(req, res) => {
    let id_paket = req.params.id_paket
    let perameter = {
        id_paket: id_paket
    }


    paket.destroy({where : perameter})
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
