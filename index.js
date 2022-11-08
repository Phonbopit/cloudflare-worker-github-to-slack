function hexToBytes(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let c = 0; c < hex.length; c += 2) {
    bytes[c / 2] = parseInt(hex.substr(c, 2), 16);
  }

  return bytes.buffer;
}

async function handlePostRequest(request) {
  const { headers } = request;
  const contentType = headers.get('content-type') || '';

  if (!contentType.includes('application/json')) {
    return new Response('Only JSON');
  }

  const body = await request.json();

  // verify that a request come from github
  // otherwise return 403

  let encoder = new TextEncoder();

  const signatureStr = headers.get('X-Hub-Signature-256')?.substring(7); // remove sha256= prefix
  const signature = hexToBytes(signatureStr);
  const bodyText = JSON.stringify(body);

  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(GITHUB_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  );

  const verified = await crypto.subtle.verify('HMAC', key, signature, encoder.encode(bodyText));

  if (!verified) {
    return new Response('Invalid signature', { status: 403 });
  }

  const slackMessage = {
    text: `Your message`
  };

  await fetch(SLACK_WEBHOOK_URL, {
    method: 'POST',
    body: JSON.stringify(slackMessage)
  });

  return new Response('OK');
}

addEventListener('fetch', (event) => {
  try {
    const request = event.request;
    if (request.method.toUpperCase() === 'POST')
      return event.respondWith(handlePostRequest(request));
    return event.respondWith(fetch(request));
  } catch (e) {
    return event.respondWith(new Response('Error thrown ' + e.message));
  }
});
