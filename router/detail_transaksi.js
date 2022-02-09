const express = require("express")
const app = express()

const detail_transaksi = require("../models/index").detail_transaksi

app.use(express.urlencoded({extended:true}))

app.get("/", async(req, res) => {
    detail_transaksi.findAll({
        include: ["transaksi","paket"]
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


app.post("/", async(req, res) => {
    //tampung data request
    let data = {
        id_transaksi: req.body.id_transaksi,
        id_paket: req.body.id_paket,
        qty: req.body.qty,
        count: req.body.count
    }


    detail_transaksi.create(data)
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
        id_transaksi: req.body.id_transaksi,
        id_paket: req.body.id_paket,
        qty: req.body.qty,
        count: req.body.count
    }
        
    let param = {
        id_detail_transaksi: req.body.id_detail_transaksi
    }


    detail_transaksi.update(data,{where : param})
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


app.delete("/:id_detail_transaksi", async(req, res) => {
    let id_detail_transaksi = req.params.id_detail_transaksi
    let perameter = {
        id_detail_transaksi: id_detail_transaksi
    }


    detail_transaksi.destroy({where : perameter})
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
