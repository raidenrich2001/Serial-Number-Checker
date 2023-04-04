import './App.css';
import {Routes, Route} from 'react-router-dom';
import Index from './components/Index';

function App() {
  return (
    <>
      <Routes>
          <Route path='/' element={<Index></Index>}></Route>
      </Routes>
    </>
  );
}

export default App;
