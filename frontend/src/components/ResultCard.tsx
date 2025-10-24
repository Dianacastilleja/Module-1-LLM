import { FC } from 'react'

interface ResultCardProps {
  result: string
}

const ResultCard: FC<ResultCardProps> = ({ result }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(result)
  }

  return (
    <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <span className="text-green-400">✓</span>
            Generated Text
          </h2>
          <button
            onClick={handleCopy}
            className="text-slate-400 hover:text-slate-200 transition text-sm font-medium px-3 py-1 hover:bg-slate-600/50 rounded"
          >
            Copy
          </button>
        </div>
        <div className="prose prose-invert max-w-none">
          <p className="text-slate-200 leading-relaxed whitespace-pre-wrap break-words">
            {result}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ResultCard
