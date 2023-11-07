const express = require('express')
const env = require('./config/envConfig')
const userRoutes = require('./routes/userRoutes')

const app = express()
const port = env.PORT || 9000
app.use(express.json())

app.get('/', (req, res) => {
    res.json({ msg: `Welcome to api server at ${port}` })
});

app.use('/api', userRoutes)

app.listen(port, () => {
    console.log(`server is running ${port}`);
})
