'use client';
import { useState } from 'react';

export default function VaultCodeForm({ onUnlocked }) {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState('idle'); // idle | checking | denied

  const submit = async (e) => {
    e.preventDefault();
    if (!code.trim() || status === 'checking') return;
    setStatus('checking');
    try {
      const res = await fetch('/api/vault', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      if (res.ok) {
        onUnlocked();
        return;
      }
    } catch {}
    setStatus('denied');
    setCode('');
  };

  return (
    <form className={`vault-code-form${status === 'denied' ? ' denied' : ''}`} onSubmit={submit}>
      <input
        className="vault-code-input"
        placeholder="ENTER ACCESS CODE"
        value={code}
        maxLength={24}
        autoComplete="off"
        spellCheck={false}
        onChange={e => { setCode(e.target.value.toUpperCase()); if (status === 'denied') setStatus('idle'); }}
        onAnimationEnd={e => e.currentTarget.parentElement.classList.remove('denied')}
      />
      <button className="vault-code-btn" type="submit" disabled={status === 'checking'}>
        {status === 'checking' ? 'CHECKING…' : 'UNLOCK'}
      </button>
      {status === 'denied' && <div className="vault-code-error">WRONG CODE — THE DOOR STAYS SHUT</div>}
    </form>
  );
}
