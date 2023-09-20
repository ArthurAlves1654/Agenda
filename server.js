require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.CONECTIONSTRING, {useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => {
    app.emit('Conectei à base de dados')
    app.emit('Pronto')
   }).catch(e => console.log(e));

const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')
const routes = require('./routes')
const path = require('path')
const helmet = require('helmet')
const csrf = require('csurf')
const {middlewareGlobal, checkCsrfErro, csrfMiddleware} = require('./src/middlewares/middleware')

app.use(helmet())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'public')))

const sessionOptions = session({
    secret: 'fmgflmxdgffdd3r qwf qwer ()',
    store: MongoStore.create({mongoUrl: process.env.CONECTIONSTRING}),
    resave: false,
    saveUnitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOlly: true
    }
})

app.use(sessionOptions);
app.use(flash())

app.set('views', path.resolve(__dirname, 'src', 'views'))
app.set('views engine', 'ejs')
// Nossos proprios middleware
app.use(csrf());
app.use(middlewareGlobal)
app.use(checkCsrfErro)
app.use(csrfMiddleware)
app.use(routes)
app.on('Pronto', () => {
    app.listen(3000, () => {

        console.log('Acessar http://localhost:3000')
        console.log('Servidor executando na porta 3000')
    })
})
// Para q ocorra um erro no site deve coloca-lo numa porta q não tem coisas padrão nelas, ex: 3000, 3333 etc
 // para colocar a porta

/* para executar o terminal 
     Executar pelo node: node server.js
     Executar no terminal externo prompt de comandos
*/
