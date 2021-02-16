const pagarme = require('pagarme');

async function generateHash({ 
  card_expiration_date, 
  card_number, 
  card_cvv, 
  card_holder_name 
}) {
  const pagarMeClient = await pagarme.client.connect({ encryption_key: process.env.PAGARME_KEY });
  const cardHash = await pagarMeClient.security.encrypt({ card_expiration_date, card_number, card_cvv, card_holder_name });
  return cardHash;
}

module.exports = generateHash;