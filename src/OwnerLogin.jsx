import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { supabase } from './supabaseClient';

export default function OwnerLogin() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl mb-4">Sign in with ZAPT</h2>
      <a
        href="https://www.zapt.ai"
        target="_blank"
        rel="noopener noreferrer"
        className="mb-4 text-blue-500 underline"
      >
        Visit ZAPT
      </a>
      <Auth
        supabaseClient={supabase}
        providers={['google', 'facebook', 'apple']}
        appearance={{ theme: 'default' }}
        socialLayout="horizontal"
      />
    </div>
  );
}