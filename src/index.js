// https://docs.microsoft.com/en-us/azure/cognitive-services/translator/quickstart-translator?tabs=nodejs

import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';

const subscriptionKey = 'YOUR-SUBSCRIPTION-KEY';
const endpoint = 'https://api.cognitive.microsofttranslator.com';

// Add your location, also known as region. The default is global.
// This is required if using a Cognitive Services resource.
const location = 'YOUR_RESOURCE_LOCATION';

async function main() {
  const url = new URL('translate', endpoint);
  url.search = new URLSearchParams({
    'api-version': '3.0',
    from: 'en',
    to: ['fr-CA', 'fr-FR', 'es', 'es-MX'],
  });

  console.log(url.toString());

  const data = [
    {
      text: 'Hello World!',
    },
  ];

  const response = await fetch(url, {
    method: 'post',
    headers: {
      'Ocp-Apim-Subscription-Key': subscriptionKey,
      'Ocp-Apim-Subscription-Region': location,
      'Content-Type': 'application/json',
      'X-ClientTraceId': uuidv4().toString(),
    },
    body: JSON.stringify(data),
    responseType: 'json',
  });

  console.log(response.status, response.statusText);

  const result = await response.json();

  console.log(JSON.stringify(result, null, 2));
}

main();
