import logo from './logo.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './style/variable.scss'
import Header from './component/Header'
import Travel from './component/Travel'
import Collect from './component/Collect'

function App() {
  return (
    <>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Travel />} />
          <Route path="/favorite" element={<Collect />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
