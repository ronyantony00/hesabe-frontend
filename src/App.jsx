import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PaymentForm from './pages/PaymentForm'
import PaymentResult from './pages/PaymentResult'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaymentForm />} />
        <Route path="/success" element={<PaymentResult variant="success" />} />
        <Route path="/failure" element={<PaymentResult variant="failure" />} />
      </Routes>
    </BrowserRouter>
  )
}
