const express = require('express');
const productRouter = require('./routes/productRoutes');

const app = express();
app.use(express.json());

app.use('/api/products', productRouter);

app.listen(3000, function () {
  console.log('Node server running http://localhost:3000');
});
