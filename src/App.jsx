import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateTopics from './pages/CreateTopics';
import ReadTopics from './pages/ReadTopics';
import ReadTopicById from './pages/ReadTopicById';
import FaqPage from './pages/FaqPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="create" element={<CreateTopics />} />
        <Route path="topics" element={<ReadTopics />} />
        <Route path="topics/:id" element={<ReadTopicById />} />
        <Route path="faq" element={<FaqPage />} />
      </Routes>
    </Router>
  );
}

export default App;
