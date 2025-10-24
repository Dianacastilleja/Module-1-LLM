import { FC } from 'react'

const Header: FC = () => {
  return (
    <header className="border-b border-slate-700 bg-slate-800/50 backdrop-blur">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">✨</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">LLM Text Generator</h1>
            <p className="text-sm text-slate-400">Powered by GPT-2</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
