import React, { useState } from 'react';
import { generateWebsite } from './gptService';
import * as Sentry from '@sentry/browser';

export default function Editor() {
  const [prompt, setPrompt] = useState('');
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setErrorMsg('');
    setPreview('');
    console.log('Submitting prompt to GPT:', prompt);
    try {
      const result = await generateWebsite(prompt);
      setPreview(result.html);
      console.log('Received website preview from GPT');
    } catch (error) {
      console.error('Error generating website:', error);
      Sentry.captureException(error);
      setErrorMsg('Failed to generate website. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col p-4 flex-grow">
      <h1 className="text-3xl mb-4">Natural Language Website Editor</h1>
      <textarea
        className="w-full p-2 border rounded box-border"
        rows="6"
        placeholder="Type your website instructions here..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      ></textarea>
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="cursor-pointer mt-4 px-4 py-2 bg-blue-500 text-white disabled:opacity-50"
      >
        {loading ? 'Generating...' : 'Generate Website'}
      </button>
      {errorMsg && <p className="mt-4 text-red-500">{errorMsg}</p>}
      {preview && (
        <div className="mt-6 p-4 border rounded bg-gray-50" dangerouslySetInnerHTML={{ __html: preview }}></div>
      )}
    </div>
  );
}