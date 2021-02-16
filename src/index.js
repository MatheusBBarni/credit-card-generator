// use puppeteer: https://stackoverflow.com/questions/47060534/how-do-post-request-in-puppeteer

const FormData = require('form-data');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const baseUrl = 'https://www.4devs.com.br';
const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_0_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36';

const params = new FormData();
params.append('acao', 'gerar_cc');
params.append('pontuacao', 'S');
params.append('bandeira', 'master');

(async () => {
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

  console.log('html', html);
  console.log('$', $);

  const numeroCartao = $('div#cartao_numero').text();
  const dataValidadeCartao = $('div#data_validade').text();
  const codigoSegurancaCartao = $('div#codigo_seguranca').text();

  console.log('cartao', {
    numeroCartao,
    dataValidadeCartao,
    codigoSegurancaCartao
  });

})();

