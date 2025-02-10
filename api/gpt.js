import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.VITE_PUBLIC_SENTRY_DSN,
  environment: process.env.VITE_PUBLIC_APP_ENV,
  initialScope: {
    tags: {
      type: 'backend',
      projectId: process.env.VITE_PUBLIC_APP_ID
    }
  }
});

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }
    const { prompt } = JSON.parse(req.body);
    if (!prompt) {
      res.status(400).json({ error: 'Missing prompt' });
      return;
    }
    console.log('GPT API endpoint received prompt:', prompt);
    const apiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GPT_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1000
      })
    });
    const data = await apiResponse.json();
    if (!apiResponse.ok) {
      throw new Error(data.error.message || 'GPT API error');
    }
    const content = data.choices[0].message.content;
    res.status(200).json({ html: content });
  } catch (error) {
    console.error('GPT API Error:', error);
    Sentry.captureException(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}