'strict';

const FormData = require('form-data');
const axios = require('axios');
const cheerio = require('cheerio');

// use puppeteer: https://stackoverflow.com/questions/47060534/how-do-post-request-in-puppeteer

const baseUrl = 'https://www.4devs.com.br';
const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_0_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36';
const Headers = { 
  'User-Agent': userAgent,
  'Content-Type': 'multipart/form-data;',
  'Accept': '*/*',
  'origin': 'https://www.4devs.com.br'
};

const params = new FormData();
params.append('acao', 'gerar_cc');
params.append('pontuacao', 'S');
params.append('bandeira', 'master');

const getHtml = async () => {
  const forDevResponse = await axios.post(`${baseUrl}/ferramentas_online.php`, params, { Headers });
  console.log(forDevResponse);
};

function main() {
  getHtml();
}

main();