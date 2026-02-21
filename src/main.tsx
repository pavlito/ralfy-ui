import React from 'react'
import ReactDOM from 'react-dom/client'
import './tokens/tokens.css'

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <h1 className="text-3xl font-bold">Ralfy-UI</h1>
      <p className="text-muted-foreground mt-2">Design system components</p>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
