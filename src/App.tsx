import React from 'react'
import TinyURL from './components/TinyUrl'

const App: React.FC = () => {
  return (
    <div>
      <h1 className="mt-5 text-2xl  font-medium">URL Shortener</h1>
      <TinyURL />
    </div>
  )
}

export default App
