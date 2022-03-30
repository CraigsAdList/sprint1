import { Routes, Route } from 'react-router'
import './App.css';
import FirstPage from './pages/FirstPage';
import MainNavigation from './pages/MainNavigation';
import SecondPage from './pages/SecondPage';
import ThirdPage from './pages/ThirdPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainNavigation />} />
        <Route path="/first" element={<FirstPage />} />
        <Route path="/second" element={<SecondPage />} />
        <Route path="/third" element={<ThirdPage />} />
      </Routes>
    </div>
  );
}

export default App;
