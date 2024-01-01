import fs from 'node:fs/promises';

import bodyParser from 'body-parser';
import express from 'express';
import multer from 'multer';

const app = express();

app.use(bodyParser.json()); 
app.use(express.static('public'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// UPLOADING IMAGE
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})
const upload = multer({ storage: storage })

app.post('/image', upload.single('file'), function (req, res) {
  res.json({})
})
/////////////////////

app.get('/products', async (req, res) => {
  const meals = await fs.readFile('./data/available-meals.json', 'utf8');
  res.json(JSON.parse(meals));
});

app.get('/orders', async (req, res) => {
  const orders = await fs.readFile('./data/orders.json', 'utf8');
  res.json(JSON.parse(orders));
});

app.post('/orders', async (req, res) => {
  const orderData = req.body.order;

  if (orderData === null || orderData.items === null ) {
    return res
      .status(400)
      .json({ message: 'Missing data.' });
  }

  if (
    orderData.customer.email === null ||
    !orderData.customer.email.includes('@') ||
    orderData.customer.name === null ||
    orderData.customer.name.trim() === '' ||
    orderData.customer.street === null ||
    orderData.customer.street.trim() === '' ||
    orderData.customer['postal-code'] === null ||
    orderData.customer['postal-code'].trim() === '' ||
    orderData.customer.city === null ||
    orderData.customer.city.trim() === ''
  ) {
    return res.status(400).json({
      message:
        'Missing data: Email, name, street, postal code or city is missing.',
    });
  }

  const orders = await fs.readFile('./data/orders.json', 'utf8');
  const allOrders = JSON.parse(orders);

  const newOrder = {
    ...orderData,
    id: allOrders.length + 1,
  };  
 
  allOrders.unshift(newOrder);
  await fs.writeFile('./data/orders.json', JSON.stringify(allOrders));
  res.status(201).json({ message: 'Order created!' });
});


app.post('/products', async (req, res) => {
  const productData = req.body;

  const products = await fs.readFile('./data/available-meals.json', 'utf8');
  const allProducts = JSON.parse(products);
  const imagePath = productData.name.replace(/\s+/g, "-").toLowerCase()
  const newProduct = {
    id: allProducts.length + 1,
    ...productData,
    image: `images/${imagePath}.jpg`
  };  
 
  allProducts.push(newProduct);
  await fs.writeFile('./data/available-meals.json', JSON.stringify(allProducts));
  res.status(201).json({ message: 'New product added!' });
});



app.use((req, res) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: 'Not found' });
});

app.listen(3000);
