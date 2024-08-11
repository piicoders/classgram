import { useState, useEffect } from 'react'

import { XIcon } from '@heroicons/react/solid'

import GeminiCorrection from '../GeminiCorrection/GeminiCorrection'

const AutomaticCorrectionModal = ({
  isOpen,
  onClose,
  initialTheme,
  initialText,
}) => {
  const [activeTab, setActiveTab] = useState(null)
  const [theme, setTheme] = useState('')
  const [text, setText] = useState('')
  const [image, setImage] = useState(null)
  const [useImage, setUseImage] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  useEffect(() => {
    if (initialTheme) {
      setTheme(initialTheme)
    }
    if (initialText) {
      setText(initialText)
    }
  }, [initialTheme, initialText])

  const handleTabClick = (tab) => {
    if ((theme && text) || (theme && image)) {
      setActiveTab(tab)
    } else {
      alert(
        'Por favor, preencha o tema e o texto da redação ou carregue uma imagem.'
      )
    }
  }

  const handleImageChange = (e) => {
    setImage(e.target.files[0])
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative max-h-[80vh] w-3/4 overflow-y-auto rounded-lg bg-white p-6 shadow-lg">
        <button
          className="absolute right-2 top-2 text-gray-600 hover:text-gray-800 focus:outline-none"
          onClick={onClose}
        >
          <XIcon className="h-6 w-6" />
        </button>
        <h2 className="mb-4 text-lg font-bold">Correção Automática</h2>
        <div className="mb-4">
          <label className="mb-2 block">Tema da Redação:</label>
          <input
            type="text"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="rw-input"
            disabled={!!initialTheme}
          />
        </div>
        <div className="mb-4">
          {/*<button
            onClick={() => setUseImage(!useImage)}
            className="rw-button mb-4"
          >
            {useImage ? 'Usar Texto' : 'Usar Imagem'}
          </button>*/}
          {useImage ? (
            <div>
              <label className="mb-2 block">Carregar imagem da redação:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="rw-input"
              />
            </div>
          ) : (
            <div>
              <label className="mb-2 block">Texto da Redação:</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="rw-input"
                rows="4"
                disabled={!!initialText}
              />
            </div>
          )}
        </div>
        <div className="mb-4">
          <button
            onClick={() => handleTabClick('gemini')}
            className={`rw-button mr-2 ${
              activeTab === 'gemini' ? 'bg-customGreen' : 'bg-gray-200'
            }`}
          >
            Utilizar Gemini
          </button>
          <button
            onClick={() => handleTabClick('gpt')}
            className={`rw-button ${
              activeTab === 'gpt' ? 'bg-customGreen' : 'bg-gray-200'
            }`}
          >
            Utilizar GPT
          </button>
        </div>
        {activeTab === 'gemini' && (
          <GeminiCorrection text={text} theme={theme} image={image} />
        )}
        {activeTab === 'gpt' && (
          <div>
            <p>Conteúdo para utilizar GPT.</p>
            {/* Adicione o conteúdo específico para GPT aqui */}
          </div>
        )}
        <button
          onClick={onClose}
          className="rw-button bg-customGreen hover:bg-customGreen-light mt-4 text-gray-200"
        >
          Fechar
        </button>
      </div>
    </div>
  )
}

export default AutomaticCorrectionModal
