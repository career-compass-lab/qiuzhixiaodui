import { Routes, Route, Navigate } from 'react-router-dom'
import Portal from './pages/Portal'
import Survey from './pages/Survey'
import Result from './pages/Result'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/portal" replace />} />
        <Route path="/portal" element={<Portal />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </div>
  )
}

export default App
