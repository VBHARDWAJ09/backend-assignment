const express = require('express')
const env = require('./config/envConfig')
const userRoutes = require('./routes/userRoutes')
const booksRoutes = require('./routes/booksRoutes')
const recordRoutes = require('./routes/recordsRoutes')
const connect = require('./config/db')

const app = express()
const port = env.PORT
app.use(express.json())
connect()

app.get('/', (req, res) => {
    res.json({ msg: `Welcome to api server at ${port}` })
});

app.use('/api', userRoutes)
app.use('/api', booksRoutes)
app.use('/api', recordRoutes)

app.listen(port, () => {
    console.log(`server is running ${port}`);
})
