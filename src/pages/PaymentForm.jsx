import { useState } from 'react'
import { INITIATE_PAYMENT_URL } from '../config'

const pageStyle = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'system-ui, sans-serif',
  background: '#f5f5f5',
  margin: 0,
}

const cardStyle = {
  background: '#fff',
  padding: '2rem',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  width: '100%',
  maxWidth: '400px',
}

const labelStyle = { display: 'block', marginBottom: '0.25rem', fontWeight: 500 }
const inputStyle = {
  width: '100%',
  padding: '0.5rem',
  marginBottom: '1rem',
  border: '1px solid #ccc',
  borderRadius: '4px',
  boxSizing: 'border-box',
}

export default function PaymentForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [amount, setAmount] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
	      const body = new URLSearchParams({
	        customer_name: name,
	        email,
	        amount,
	      })
      const res = await fetch(INITIATE_PAYMENT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message || data.exc || 'Payment initiation failed')
      }
      const redirectUrl = data.message?.redirect_url
      if (!redirectUrl) {
        throw new Error('No redirect URL in response')
      }
      window.location.href = redirectUrl
    } catch (err) {
      setError(err.message || 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <div style={pageStyle}>
      <form style={cardStyle} onSubmit={handleSubmit}>
        <h1 style={{ marginTop: 0, marginBottom: '1.5rem' }}>Pay with Hesabe</h1>
        <label style={labelStyle} htmlFor="name">
          Name
        </label>
        <input
          id="name"
          style={inputStyle}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label style={labelStyle} htmlFor="email">
          Email
        </label>
        <input
          id="email"
          style={inputStyle}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label style={labelStyle} htmlFor="amount">
          Amount (KWD)
        </label>
        <input
          id="amount"
          style={inputStyle}
          type="number"
          min="0.001"
          step="0.001"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        {error && (
          <p style={{ color: '#c00', marginBottom: '1rem', fontSize: '0.9rem' }}>
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '0.75rem',
            background: loading ? '#999' : '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Processing…' : 'Pay'}
        </button>
      </form>
    </div>
  )
}
