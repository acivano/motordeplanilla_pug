const express = require('express')

const app = express()
app.use(express.urlencoded({extended: true}))



//const { engine } = require('express-handlebars')
//import { engine } from 'express-handlebars';


app.set('views', './views')
app.set('view engine', 'pug')



const Containter = require('./container/container')

const ProductContainer = new Containter()

app.get('/', (req,res) => {
    const productos = ProductContainer.getAll()
    res.render('formulario', { })
})

app.get('/api/productos', (req,res) => {
    const productos = ProductContainer.getAll()
    res.render('productos', { productos})
})

app.get('/api/productos/:id', (req,res) => {
    res.json(ProductContainer.getById(parseInt(req.params.id)))
}) 

app.post('/api/productos', (req,res) => {
    ProductContainer.save(req.body)
    res.redirect('/')
})

app.put('/api/productos/:id', (req,res) => {

    res.json(ProductContainer.modifById(req.params.id, req.body) )
})

app.delete('/api/productos/:id', (req,res) => {
    res.json(ProductContainer.deleteById(req.params.id))
})


app.use(express.static('public'))

/* ------------------------------------------------------ */
/* Server Listen */
const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))