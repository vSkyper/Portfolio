import { Home } from 'pages';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <Router basename={import.meta.env.PUBLIC_URL}>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </Router>
  );
}
