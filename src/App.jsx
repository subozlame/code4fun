import { useState } from 'react'
import Playground from './components/Playground';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold">
            Tailwind Playground
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <Playground />
      </main>
    </div>
  );
}

export default App;

