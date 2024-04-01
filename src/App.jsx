import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ReadTopics from './pages/ReadTopics';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="topics" element={<ReadTopics />} />
      </Routes>
    </Router>
  );
}

export default App;
