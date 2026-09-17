import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowRight, LockKeyhole, Send, Search, Radio, Target, Users, BarChart3, MessageSquare, ScanSearch, Lightbulb, FileText, Handshake, Database } from 'lucide-react';
import './styles.css';

const INTELLIGENCE_ENDPOINT = 'https://alagbara-intelligence.vercel.app/api/intelligence-request';

const pulses = [
  { type: 'CAPITAL MARKETS', title: 'Dangote IPO', text: 'A live capital-market event is generating new participation, access and intelligence questions.', age: 'LIVE' },
  { type: 'TRADE', title: 'Benin–Nigeria trade flows', text: 'Cross-border signals can reveal openings for manufacturers, distributors and service providers.', age: 'TODAY' },
  { type: 'HORECA', title: 'Cotonou hospitality supply', text: 'Commercial movement across venues and suppliers creates a changing opportunity map.', age: 'TODAY' },
];

const steps = [
  ['YOU ASK', 'Share your question', MessageSquare],
  ['SCOUT', 'We find the signals', ScanSearch],
  ['PULSE', 'We structure what changed', Radio],
  ['ANA', "We identify what's possible", Lightbulb],
  ['RESPONSE', 'You get decision-grade intelligence', FileText],
  ['ENGAGE', 'We help you move', Handshake],
  ['MEMORY', 'The system gets smarter', Database],
];

function App() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [form, setForm] = useState({ question: '', market: '', decision: '', useful: '' });

  const update = (key) => (e) => setForm((current) => ({ ...current, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.question.trim() || submitting) return;
    setSubmitting(true);
    setError('');
    try {
      const response = await fetch(INTELLIGENCE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Intelligence request failed');
      setResult(data);
      setSent(true);
    } catch (err) {
      setError(err.message || 'Could not reach the BIG Intelligence Desk.');
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setSent(false);
    setResult(null);
    setError('');
  };

  return (
    <main>
      <header className="nav">
        <div className="brand"><strong>BIG</strong><span>CONSULTING</span><small>INTELLIGENCE · ACCESS · IMPACT</small></div>
        <nav><a className="active" href="#pulse">Pulse</a><a href="#services">Services</a><a href="#how">How it works</a><a href="#about">About</a></nav>
        <div className="nav-actions"><button className="icon-btn" aria-label="Search"><Search size={19}/></button><button className="ghost">Sign in</button><button className="gold" onClick={() => document.getElementById('ask').scrollIntoView({ behavior: 'smooth' })}>Ask BIG <ArrowRight size={16}/></button></div>
      </header>

      <section className="hero" id="ask">
        <div className="hero-bg"><div className="orb orb-a"/><div className="orb orb-b"/><div className="africa-grid"/></div>
        <div className="hero-copy">
          <p className="eyebrow">AFRICA TODAY · OPPORTUNITIES TOMORROW</p>
          <h1>See what's happening.<br/><em>Move before it's obvious.</em></h1>
          <p className="lead">BIG Consulting turns real-world signals into clarity, opportunity and action for businesses, investors and institutions across Africa and beyond.</p>
          <div className="proofs">
            {[[Radio,'REAL-TIME','INTELLIGENCE'],[BarChart3,'MARKET','ACCESS'],[Users,'COMMERCIAL','OPPORTUNITIES'],[Target,'ACTIONABLE','INSIGHTS']].map(([Icon,a,b]) => <div className="proof" key={a}><span><Icon size={21}/></span><b>{a}</b><b>{b}</b></div>)}
          </div>
        </div>

        <form className="ask" onSubmit={submit}>
          {!sent ? <>
            <div className="ask-head"><h2>ASK <span>BIG</span></h2><div>REAL QUESTIONS.<br/>REAL INTELLIGENCE.<br/>REAL OPPORTUNITIES.</div></div>
            <p className="ask-intro">Something changed. Something may now be possible.<br/>Tell us what you're trying to understand.</p>
            <label>What are you trying to understand? <i>*</i><textarea value={form.question} onChange={update('question')} placeholder="e.g. market entry, investment, regulation, competitor, partnership..." required /></label>
            <label>Market / company / sector<input value={form.market} onChange={update('market')} placeholder="e.g. Nigeria, Dangote, HORECA, Pharmaceuticals..." /></label>
            <label>What decision or opportunity is involved?<input value={form.decision} onChange={update('decision')} placeholder="e.g. should we enter, can we participate, where are the opportunities..." /></label>
            <label>What would make this intelligence useful to you?<input value={form.useful} onChange={update('useful')} placeholder="e.g. market map, partner list, risk analysis, next steps..." /></label>
            {error && <div className="privacy" role="alert">{error}</div>}
            <button className="submit" type="submit" disabled={submitting}><Send size={17}/>{submitting ? 'PROCESSING INTELLIGENCE…' : 'SEND INTELLIGENCE REQUEST'}</button>
            <div className="privacy"><LockKeyhole size={14}/> Your information is confidential. We use it to deliver relevant intelligence.</div>
          </> : <div className="received">
            <div className="received-icon"><Send size={23}/></div>
            <h2>REQUEST RECEIVED</h2>
            <p>Your question entered the BIG Intelligence Desk and was processed by ALAGBARA.</p>
            <div className="pipeline"><span>SCOUT</span><ArrowRight/><span>PULSE</span><ArrowRight/><span>ANA</span></div>
            {result?.intelligence && <div className="intelligence-result">
              <div className="result-label">PULSE</div><p>{result.intelligence.pulse}</p>
              <div className="result-label">ANALYSIS</div><p>{result.intelligence.analysis}</p>
              <div className="result-label">NEXT STEP</div><p>{result.intelligence.recommendation}</p>
              <div className="result-meta">Confidence: {result.intelligence.confidence} · Request: {result.request_id}</div>
            </div>}
            <p className="muted">The request is persisted in the BIG Intelligence Desk for subsequent engagement and memory.</p>
            <button className="ghost dark" type="button" onClick={reset}>Submit another question</button>
          </div>}
        </form>
      </section>

      <section className="pulse-section" id="pulse">
        <div className="section-head"><div><h2><span className="wave">∿</span> LIVE PULSE</h2><p>What's changing. What it means. What becomes possible.</p></div><a href="#ask">View all <ArrowRight size={16}/></a></div>
        <div className="pulse-grid">{pulses.map((p) => <article className="pulse-card" key={p.title}><div className="pulse-meta"><span>{p.type}</span><small>{p.age}</small></div><h3>{p.title}</h3><p>{p.text}</p><button onClick={() => document.getElementById('ask').scrollIntoView({ behavior: 'smooth' })}>Read Pulse <ArrowRight size={15}/></button></article>)}</div>
      </section>

      <section className="how" id="how"><div className="how-top"><div><p className="section-kicker">HOW IT WORKS</p><h2>From question to opportunity.</h2></div><p>Our intelligence process turns real-world signals into commercial outcomes, powered by <strong>ALAGBARA.</strong></p><a href="#ask">The ALAGBARA Advantage <ArrowRight size={15}/></a></div>
        <div className="steps">{steps.map(([name, desc, Icon], i) => <React.Fragment key={name}><div className="step"><span className="step-no">{i + 1}</span><Icon size={21}/><strong>{name}</strong><small>{desc}</small></div>{i < steps.length - 1 && <ArrowRight className="step-arrow" size={18}/>}</React.Fragment>)}</div>
      </section>

      <footer><div className="footer-brand"><strong>BIG</strong> <span>CONSULTING</span></div><p>INTELLIGENCE FOR A MORE PROSPEROUS AFRICA</p><div className="footer-links"><a>Privacy</a><a>Terms</a><a href="#ask">Contact</a></div></footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
