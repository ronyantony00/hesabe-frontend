import { useSearchParams } from 'react-router-dom'

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
  maxWidth: '400px',
  textAlign: 'center',
}

export default function PaymentResult({ variant }) {
  const [searchParams] = useSearchParams()
  const paymentId = searchParams.get('payment_id')
  const success = variant === 'success'

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={{ marginTop: 0, color: success ? '#16a34a' : '#dc2626' }}>
          {success ? 'Payment successful' : 'Payment failed'}
        </h1>
        <p style={{ margin: '1rem 0', color: '#444' }}>
          {success
            ? 'Thank you. Your payment has been processed.'
            : 'Your payment could not be completed.'}
        </p>
        {paymentId ? (
          <p style={{ fontSize: '0.9rem', color: '#666' }}>
            Payment ID: <strong>{paymentId}</strong>
          </p>
        ) : (
          <p style={{ fontSize: '0.9rem', color: '#888' }}>No payment ID provided.</p>
        )}
        <a
          href="/"
          style={{
            display: 'inline-block',
            marginTop: '1.5rem',
            color: '#2563eb',
            textDecoration: 'none',
          }}
        >
          Back to payment form
        </a>
      </div>
    </div>
  )
}
