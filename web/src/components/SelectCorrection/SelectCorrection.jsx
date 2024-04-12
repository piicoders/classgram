import { useEffect, useState } from 'react'

import { toast } from '@redwoodjs/web/toast'

const SelectCorrection = () => {
  const [selection, setSelection] = useState(null)
  const [position, setPosition] = useState(null)

  function onSelectStart() {
    setSelection(undefined)
  }

  function onSelectEnd() {
    const activeSelection = document.getSelection()
    const text = activeSelection?.toString()

    if (!activeSelection || !text) {
      setSelection(undefined)
      return
    }

    setSelection(text)

    const rect = activeSelection.getRangeAt(0).getBoundingClientRect()

    setPosition({
      x: rect.left + rect.width / 2 - 80 / 2,
      y: rect.top + window.scrollY - 30,
      width: rect.width,
      height: rect.height,
    })

    toast('Share this snippet!', {
      action: {
        label: 'Tweet',
        onClick: () => onShare(text),
      },
    })
  }

  useEffect(() => {
    document.addEventListener('selectstart', onSelectStart)
    document.addEventListener('mouseup', onSelectEnd)
    return () => {
      document.removeEventListener('selectstart', onSelectStart)
      document.removeEventListener('mouseup', onSelectEnd)
    }
  }, [])

  function onShare(text) {
    const textToShare = text || selection
    if (!textToShare) return
    const message = [
      `"${encodeURIComponent(textToShare)}"`,
      encodeURIComponent(window.location.href),
    ].join('%0A%0A')
    const url = `https://twitter.com/intent/tweet?text=${message}`
    window.open(url, 'share-twitter', 'width=550, height=550')
  }

  return (
    <div>
      {selection && position && (
        <p
          className="
            absolute -top-2 left-0 m-0 h-[30px] rounded bg-black text-white
            after:absolute after:left-1/2 after:top-full after:h-0 after:w-0 after:-translate-x-2 after:rotate-180 after:border-x-[6px] after:border-b-[8px] after:border-x-transparent after:border-b-black
          "
          style={{
            transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          }}
        >
          <button
            className="flex h-full w-full items-center justify-between px-2"
            onClick={() => onShare()}
          >
            <span id="share" className="text-xs">
              Corrigir
            </span>
          </button>
        </p>
      )}
    </div>
  )
}

export default SelectCorrection
