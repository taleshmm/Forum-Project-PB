import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateTopics from './pages/CreateTopics';
import ReadTopics from './pages/ReadTopics';
import ReadTopicById from './pages/ReadTopicById';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="create" element={<CreateTopics />} />
        <Route path="topics" element={<ReadTopics />} />
        <Route path="topics/:id" element={<ReadTopicById />} />
      </Routes>
    </Router>
  );
}

export default App;
