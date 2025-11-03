import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Requests from './components/Requests'
import Services from './components/Services'
import Layout from './components/Layout'
import AnimationWrapper from './components/AnimationWrapper'
import './index.css'

function App() {
  return (
    <Router>
      <Layout>
        <AnimationWrapper>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/services" element={<Services />} />
          </Routes>
        </AnimationWrapper>
      </Layout>
    </Router>
  )
}

export default App