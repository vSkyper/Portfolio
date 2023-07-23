import { Home, Project } from 'pages';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <Router basename={import.meta.env.PUBLIC_URL}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/project/:id' element={<Project />} />
      </Routes>
    </Router>
  );
}
