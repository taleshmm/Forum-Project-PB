import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateTopics from './pages/CreateTopics';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="create" element={<CreateTopics />} />
      </Routes>
    </Router>
  );
}

export default App;
