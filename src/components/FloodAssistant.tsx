import React, { useEffect, useRef, useState } from 'react';

type ChatMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export const FloodAssistant: React.FC = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const [showKeyModal, setShowKeyModal] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'system',
      content:
        'You are FloodAssistant, a helpful safety guide for flood preparedness and response in schools and communities. Provide clear, actionable guidance, cite standard best practices (NDMA/WHO where relevant), and keep answers concise with bullet points. Do not provide legal or medical advice; instead suggest consulting authorities when needed.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fromEnv = import.meta.env.VITE_GROQ_API_KEY as string | undefined;
    const fromStorage = localStorage.getItem('groq_api_key') || '';
    setApiKey(fromStorage || fromEnv || '');
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSaveKey = () => {
    localStorage.setItem('groq_api_key', apiKey);
    setShowKeyModal(false);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const nextMessages: ChatMessage[] = [...messages, { role: 'user', content: input.trim() }];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);
    try {
      // Prefer server proxy (no API key on client)
      const res = await fetch('http://localhost:5174/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // apiKey stays on server; send none here
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: nextMessages.map((m) => ({ role: m.role, content: m.content })),
          temperature: 0.3,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      const content: string = data.choices?.[0]?.message?.content ?? 'Sorry, I could not generate a response.';
      setMessages((prev) => [...prev, { role: 'assistant', content }]);
    } catch (err: unknown) {
      // Fallback to direct call if proxy not running and user provided apiKey
      if (apiKey) {
        try {
          const direct = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              model: 'llama-3.1-8b-instant',
              messages: nextMessages.map((m) => ({ role: m.role, content: m.content })),
              temperature: 0.3,
            }),
          });
          if (!direct.ok) throw new Error(await direct.text());
          const data = await direct.json();
          const content: string = data.choices?.[0]?.message?.content ?? 'Sorry, I could not generate a response.';
          setMessages((prev) => [...prev, { role: 'assistant', content }]);
        } catch (e: unknown) {
          const message = e instanceof Error ? e.message : String(e);
          setMessages((prev) => [
            ...prev,
            { role: 'assistant', content: `Assistant error. Make sure the proxy is running (npm run dev:full) or set a valid API key.\n${message}` },
          ]);
        }
      } else {
        const message = err instanceof Error ? err.message : String(err);
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: `Assistant error. Start the proxy with npm run dev:full or set an API key.\n${message}` },
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-4 flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-3 pr-1" style={{ maxHeight: 420 }}>
          {messages
            .filter((m) => m.role !== 'system')
            .map((m, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl ${
                  m.role === 'user' ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50 border border-gray-200'
                }`}
              >
                <div className="text-xs text-gray-500 mb-1">{m.role === 'user' ? 'You' : 'FloodAssistant'}</div>
                <div className="whitespace-pre-wrap text-gray-800">{m.content}</div>
              </div>
            ))}
          {loading && (
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-600 text-sm">Typing…</div>
          )}
          <div ref={endRef} />
        </div>
        <div className="mt-3 flex items-center space-x-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about floods: preparedness, evacuation, kits, alerts…"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
        <h3 className="font-semibold text-gray-900 mb-2">Settings</h3>
        <p className="text-sm text-gray-600 mb-3">Your API key is stored only in this browser.</p>
        <button
          onClick={() => setShowKeyModal(true)}
          className="w-full px-3 py-2 rounded-xl bg-gray-800 text-white"
        >
          Set API Key
        </button>
        <div className="text-xs text-gray-500 mt-3 break-all">
          Current: {apiKey ? `${apiKey.slice(0,4)}••••${apiKey.slice(-4)}` : 'Not set'}
        </div>
      </div>

      {showKeyModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h4 className="text-lg font-semibold mb-2">Enter Groq API Key</h4>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="gsk_..."
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <div className="mt-4 flex justify-end space-x-2">
              <button onClick={() => setShowKeyModal(false)} className="px-4 py-2 rounded-xl bg-gray-100">Cancel</button>
              <button onClick={handleSaveKey} className="px-4 py-2 rounded-xl bg-emerald-600 text-white">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


