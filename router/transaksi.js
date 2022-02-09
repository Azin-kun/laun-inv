const express = require("express")
const app = express()
const moment = require("moment")

const transaksi = require("../models/index").transaksi

//generate resi
const generator = require('string-generator-js')
const options = {length:10}
const code = generator.generate(options)


//date 
const date = require('calcudate');
const dateNow = moment().format('YYYY-MM-DD HH:mm:ss')
const deadline = date.add(new Date()).days(10)

app.use(express.urlencoded({extended:true}))

app.get("/", async(req, res) => {
    transaksi.findAll({
        include: ["admin"]
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
        id_admin: req.body.id_admin,
        resi: code,
        nama_customer: req.body.nama_customer,
        tgl: dateNow,
        batas_waktu: deadline,
        tgl_bayar: req.body.tgl_bayar,
        status: req.body.status,
        dibayar: req.body.dibayar
    }


    transaksi.create(data)
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
        id_admin: req.body.id_admin,
        resi: code,
        nama_customer: req.body.nama_customer,
        tgl: dateNow,
        batas_waktu: deadline,
        tgl_bayar: req.body.tgl_bayar,
        status: req.body.status,
        dibayar: req.body.dibayar
    }
        
    let param = {
        id_transaksi: req.body.id_transaksi
    }


    transaksi.update(data,{where : param})
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


app.delete("/:id_transaksi", async(req, res) => {
    let id_transaksi = req.params.id_transaksi
    let perameter = {
        id_transaksi: id_transaksi
    }

    transaksi.destroy({where : perameter})
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
