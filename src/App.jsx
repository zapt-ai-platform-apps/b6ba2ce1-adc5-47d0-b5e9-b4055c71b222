import React, { useState, useEffect } from 'react';
import Editor from './Editor';
import OwnerLogin from './OwnerLogin';
import { supabase, recordLogin } from './supabaseClient';
import * as Sentry from '@sentry/browser';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error('Error fetching user:', error);
        Sentry.captureException(error);
      }
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event);
      setUser(session?.user || null);
      if (event === 'SIGNED_IN' && session?.user?.email) {
        recordLogin(session.user.email, import.meta.env.VITE_PUBLIC_APP_ENV).catch((error) => {
          console.error('Failed to record login:', error);
          Sentry.captureException(error);
        });
      }
    });

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  if (!user) {
    return <OwnerLogin />;
  }

  if (user.email !== import.meta.env.VITE_PUBLIC_OWNER_EMAIL) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-500">Unauthorized Access: You are not the owner.</p>
        <button
          onClick={() => supabase.auth.signOut()}
          className="cursor-pointer mt-4 px-4 py-2 bg-blue-500 text-white"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Editor />
      <div className="mt-auto p-4 text-center">
        <a
          href="https://www.zapt.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer underline"
        >
          Made on ZAPT
        </a>
      </div>
    </div>
  );
}