const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const massive = require('massive');
dotenv.config(); // -> to make .env available to you

let connection_string = process.env.CONNECTION_STRING; //I called it to a variable
const API = 3000;
const app = express();
app.use(bodyParser.json());
app.use(cors());

massive(connection_string).then((db) => {
    app.set('db', db);
});


app.post('/api/products', (req, res) => {
    // let { product_id,  } = req.body;
    let product = [2, 'Grefindor', 'anothor-house', 600, 'src=sdsdsdsdsdsdsds'];
    app.get('db').create_products(product).then((respond) => {
        res.send(respond);
    })
});

app.get('/api/product/:id', (req, res) => {
    let { id } = req.params;
    app.get('db').read_product(id).then((response) => {
        res.send(response);
    });
});

app.get('/api/products', (req, res) => {
    app.get('db').read_products().then((respond) => {
        res.send(respond)
    })
});

app.put('/api/product/:id', (req, res) => {
    let { id } = req.params;
    let { desc } = req.query;
    app.get('db').update_product([desc, id]).then((response) => {
        console.log(response)
    })
});

app.delete('/api/product/:id', (req, res) => {
    let { id } = req.params;
    console.log(id)
    app.get('db').delete_product([id]).then((respond) => {
        res.send(respond)
    });
})


app.listen(API, () => console.log(`Listening on port ${3000}`));