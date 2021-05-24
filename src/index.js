// https://docs.microsoft.com/en-us/azure/cognitive-services/translator/quickstart-translator?tabs=nodejs

import dotenv from 'dotenv';
import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const ENDPOINT = 'https://api.cognitive.microsofttranslator.com';
const SUBSCRIPTION_KEY = process.env.TRANSLATOR_KEY;
const LOCATION = process.env.TRANSLATOR_LOCATION;

const TRANSLATOR_URL = new URL('translate', ENDPOINT);
TRANSLATOR_URL.search = new URLSearchParams({
  'api-version': '3.0',
  from: 'en',
  to: ['fr-CA', 'fr-FR', 'es', 'es-MX'],
});

(async function () {
  const data = [
    {
      text: 'Hello World!',
    },
    {
      text: 'Thank you, Amelia',
    },
    {
      text: 'Thank you, {{NAME}}',
    },
  ];

  const result = await translate(data);

  console.log(JSON.stringify(result, null, 2));
  console.log(TRANSLATOR_URL.toString());
})();

async function translate(data) {
  const response = await fetch(TRANSLATOR_URL, {
    method: 'post',
    headers: {
      'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY,
      'Ocp-Apim-Subscription-Region': LOCATION,
      'Content-Type': 'application/json',
      'X-ClientTraceId': uuidv4().toString(),
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}
