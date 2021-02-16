const express = require('express');
const helmet = require('helmet');
const dotenv = require('dotenv');

const getCreditCard = require('./util/getCreditCard');
const generateHash = require('./util/generatehash');

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(helmet());
app.use(express.json());

app.get('/', async (_, res) => {
  const creditCard = await getCreditCard();
  const creditCardHash = await generateHash({
    card_holder_name: process.env.YOUR_NAME,
    card_cvv: creditCard.cardSecurityCode,
    card_number: creditCard.cardNumber,
    card_expiration_date: creditCard.cardExpirationDate
  });

  res.send(creditCardHash);
});

app.get('/credit-card', async (_, res) => {
  res.send(await getCreditCard());
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});
