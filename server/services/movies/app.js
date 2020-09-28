const express = require('express');
const app = express();
const routes = require('./routes');
const PORT = process.env.PORT || 4009

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen( PORT, () => {
    console.log(`server running on PORT: ${PORT}`);
})