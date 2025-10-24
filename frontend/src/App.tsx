import { useState } from 'react'
import TextInput from './components/TextInput'
import ResultCard from './components/ResultCard'
import Header from './components/Header'

function App() {
  const [result, setResult] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')

  const handleGenerate = async (text: string, maxTokens: number) => {
    setLoading(true)
    setError('')
    setResult('')

    try {
      const response = await fetch('http://localhost:8000/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          max_new_tokens: maxTokens,
          do_sample: false,
        }),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()
      setResult(data.generated_text)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <TextInput onGenerate={handleGenerate} loading={loading} />
        {error && (
          <div className="mt-6 p-4 bg-red-900/20 border border-red-500/50 rounded-lg">
            <p className="text-red-200 text-sm font-medium">Error: {error}</p>
          </div>
        )}
        {result && <ResultCard result={result} />}
      </main>
    </div>
  )
}

export default App
