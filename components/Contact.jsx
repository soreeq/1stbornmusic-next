'use client';
import { useState } from 'react';
import { IconIG, IconMail, IconThreads } from './Icons';

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div className="contact-layout">
      <div className="contact-left">
        <div className="contact-title">Get In<br />Touch</div>
        <div className="contact-sub">
          Custom beats, collab inquiries, sync licensing, or you just got something to spit — hit me up. If the bars are real, we'll make it work.
        </div>
        <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { icon: <IconIG />,      label: 'Instagram', val: '@1st_born313',        href: 'https://www.instagram.com/1st_born313' },
            { icon: <IconThreads />, label: 'Threads',   val: '@1st_born313',        href: 'https://www.threads.com/@1st_born313' },
            { icon: <IconMail />,    label: 'Email',     val: 'alivestalive@gmail.com', href: 'mailto:alivestalive@gmail.com' },
          ].map(item => (
            <a key={item.label} href={item.href} target="_blank" rel="noopener" className="contact-item">
              <div className="contact-item-icon">{item.icon}</div>
              <div>
                <div className="contact-item-label">{item.label}</div>
                <div className="contact-item-val">{item.val}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
      <div className="contact-right">
        {sent ? (
          <div style={{ textAlign: 'center', padding: 40 }}>
            <div style={{ fontSize: 48, marginBottom: 16, color: 'var(--accent)' }}>✓</div>
            <div style={{ fontFamily: "'UnifrakturMaguntia',serif", fontSize: 32, letterSpacing: '0.04em' }}>Message Sent</div>
            <div style={{ color: 'var(--muted)', marginTop: 8, fontSize: 13 }}>I'll get back to you within 48 hours.</div>
            <button className="btn btn-outline" style={{ marginTop: 24 }} onClick={() => setSent(false)}>Send Another</button>
          </div>
        ) : (
          <>
            <div style={{ fontFamily: "'UnifrakturMaguntia',serif", fontSize: 24, letterSpacing: '0.06em', marginBottom: 24 }}>Send a Message</div>
            <div className="form-group">
              <label className="form-label">Your Name</label>
              <input className="form-input" placeholder="First Last" />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input className="form-input" type="email" placeholder="you@example.com" />
            </div>
            <div className="form-group">
              <label className="form-label">Subject</label>
              <select className="form-input">
                <option>Custom Beat Inquiry</option>
                <option>Collab Request</option>
                <option>Licensing Question</option>
                <option>General</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea className="form-input" placeholder="Tell me about your project..." />
            </div>
            <button className="btn btn-accent" style={{ width: '100%', marginTop: 8 }} onClick={() => setSent(true)}>Send Message</button>
          </>
        )}
      </div>
    </div>
  );
}