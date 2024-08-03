import React from 'react';
import Home from './components/Home';
import bg from './assets/background.png'; 

function App() {
  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: `url(${bg})` }}>
      <div className="bg-white bg-opacity-20 p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <Home />
      </div>
    </div>
  );
}

export default App;
