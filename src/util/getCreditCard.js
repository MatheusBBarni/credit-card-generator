const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const baseUrl = 'https://www.4devs.com.br';

async function getCreditCard () {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setRequestInterception(true);

  page.once("request", interceptedRequest => {
    interceptedRequest.continue({
      method: "POST",
      postData: "acao=gerar_cc&pontuacao=S&bandeira=master",
      headers: {
        ...interceptedRequest.headers(),
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
  });

  const response = await page.goto(`${baseUrl}/ferramentas_online.php`);
  const html = await response.text();

  await browser.close();

  const $ = cheerio.load(html);

  const cardNumber = $('div#cartao_numero').text();
  const cardExpirationDate = $('div#data_validade').text();
  const cardSecurityCode = $('div#codigo_seguranca').text();

  return {
    cardNumber,
    cardExpirationDate,
    cardSecurityCode
  };
}

module.exports = getCreditCard;