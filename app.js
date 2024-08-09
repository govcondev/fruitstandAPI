const express = require('express');
const app = express();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Fruit Stand Inventory API',
      version: '1.0.0',
    },
  },
  apis: ['app.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

const fruits = [
  {
    id: 1,
    name: 'Apple',
    quantity: 100,
  },
  {
    id: 2,
    name: 'Banana',
    quantity: 150,
  },
];

/**
 * @swagger
 * /fruits:
 *   get:
 *     description: Get all fruits
 *     responses:
 *       200:
 *         description: Success
 */
app.get('/fruits', (req, res) => {
  res.json(fruits);
});

/**
 * @swagger
 * /fruit:
 *   post:
 *     description: Add a new fruit
 *     parameters:
 *     - name: name
 *       description: Fruit name
 *       in: body
 *       required: true
 *       type: string
 *     - name: quantity
 *       description: Quantity of the fruit
 *       in: body
 *       required: true
 *       type: integer
 *     responses:
 *       200:
 *         description: Success
 */
app.post('/fruit', (req, res) => {
  const { name, quantity } = req.body;
  const newFruit = {
    id: fruits.length + 1,
    name,
    quantity,
  };
  fruits.push(newFruit);
  res.json(newFruit);
});

/**
 * @swagger
 * /fruit/{id}:
 *   get:
 *     description: Get a fruit by ID
 *     parameters:
 *     - name: id
 *       description: Fruit ID
 *       in: path
 *       required: true
 *       type: integer
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Fruit not found
 */
app.get('/fruit/:id', (req, res) => {
  const fruitId = parseInt(req.params.id, 10);
  const fruit = fruits.find((f) => f.id === fruitId);
  if (fruit) {
    res.json(fruit);
  } else {
    res.status(404).send('Fruit not found');
  }
});

app.listen(3000, () => {
  console.log('Fruit Stand Inventory API is running on port 3000');
});
