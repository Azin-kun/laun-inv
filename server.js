const express = require("express")
const cors = require("cors")

const app = express()
app.use(cors())

let owner = require("./router/owner")
let outlet = require("./router/outlet")
let admin = require("./router/admin")
let transaksi = require("./router/transaksi")
let paket = require("./router/paket")
let auth = require("./router/auth")

app.use("/laundry/owner", owner)
app.use("/laundry/outlet", outlet)
app.use("/laundry/admin", admin)
app.use("/laundry/transaksi", transaksi)
app.use("/laundry/paket", paket)
app.use("/laundry/auth", auth)

app.use(express.static(__dirname))

app.listen(2000, ()=> {
console.log(`server berjalan di port 2000`)
})
