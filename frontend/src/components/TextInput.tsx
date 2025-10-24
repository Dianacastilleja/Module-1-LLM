import { FC, useState } from 'react'

interface TextInputProps {
  onGenerate: (text: string, maxTokens: number) => void
  loading: boolean
}

const TextInput: FC<TextInputProps> = ({ onGenerate, loading }) => {
  const [inputText, setInputText] = useState('')
  const [maxTokens, setMaxTokens] = useState(150)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputText.trim()) {
      onGenerate(inputText, maxTokens)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Enter your text to continue:
        </label>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type something to generate text..."
          disabled={loading}
          className="w-full h-32 px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition disabled:opacity-50"
        />
      </div>

      <div className="flex items-end justify-between gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Max Tokens: <span className="text-cyan-400">{maxTokens}</span>
          </label>
          <input
            type="range"
            min="50"
            max="500"
            value={maxTokens}
            onChange={(e) => setMaxTokens(parseInt(e.target.value))}
            disabled={loading}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400 disabled:opacity-50"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>50</span>
            <span>500</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !inputText.trim()}
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-400 hover:to-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </span>
          ) : (
            'Generate Text'
          )}
        </button>
      </div>
    </form>
  )
}

export default TextInput
