import React, { useState } from 'react'

const Document = ({ document }) => {
  const [selectedText, setSelectedText] = useState('')
  const [comments, setComments] = useState([])

  const handleTextSelect = () => {
    const selection = window.getSelection()
    const selectedText = selection.toString()
    setSelectedText(selectedText)
  }

  const handleCommentSubmit = async (comment) => {
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: selectedText, comment }),
      })

      if (!response.ok) {
        throw new Error('Failed to add comment')
      }

      const data = await response.json()
      setComments([...comments, data])
    } catch (error) {
      console.error('Error adding comment:', error.message)
    }
  }
  return (
    <div className="mx-auto mt-8 max-w-6xl px-8">
      <div className="overflow-hidden rounded-lg bg-white shadow-lg">
        <div className="flex items-center justify-between px-10 py-0">
          <div className="flex flex-col">
            <h2 className="mb-2 text-3xl font-semibold text-blue-800">
              {document.activity.name}
            </h2>
            <p className="mb-4 text-lg text-gray-600">
              {document.activity.description}
            </p>
          </div>
        </div>
        <div className="border-t border-gray-200 bg-gray-100 px-8 py-4"></div>
        <div className="px-8 py-4">
          <h3 className="mb-2 text-2xl font-semibold text-gray-800">
            Entregue por: {document.student.name}
          </h3>
          <p className="mb-2 text-sm text-gray-600">
            Entregue em: {new Date(document.handed).getDate()}/
            {new Date(document.handed).getMonth() + 1}/
            {new Date(document.handed).getFullYear()} -{' '}
            {new Date(document.handed).getHours()}:
            {new Date(document.handed).getMinutes()}
          </p>
          <div onMouseUp={handleTextSelect}>
            <p className="text-base">{document.content}</p>
          </div>
        </div>
        <div className="border-t border-gray-200 bg-gray-100 px-8 py-4"></div>
        {selectedText && (
          <div className="px-8 py-4">
            <h2>Texto Selecionado</h2>
            <p>{selectedText}</p>
            <CommentForm onSubmit={handleCommentSubmit} />
          </div>
        )}
        <div className="px-8 py-4">
          <h2>Comentários</h2>
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>{comment.text}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function CommentForm({ onSubmit }) {
  const [comment, setComment] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(comment)
    setComment('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Adicionar Comentário:
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </label>
      <button type="submit">Adicionar</button>
    </form>
  )
}

export default Document
