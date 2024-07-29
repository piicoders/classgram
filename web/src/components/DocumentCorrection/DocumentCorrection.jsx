const DocumentCorrection = ({ corrections }) => {
  const getSeverityText = (severity) => {
    const severityMap = {
      G: 'Bom',
      N: 'Neutro',
      B: 'Ruim',
    }
    return severityMap[severity] || ''
  }

  return (
    <div>
      {corrections.length ? (
        <>
          <hr id="corrections" className="my-16 border-gray-300" />
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            <span className="border-l-4 border-blue-500 pl-2">Correção</span>
          </h2>

          {corrections.map((correction) => (
            <div
              key={correction.id}
              className="mb-4 rounded-lg bg-white p-6 shadow-md"
            >
              <p>
                <span className="font-bold">Trecho:</span> {correction.text}
              </p>
              <p>
                <span className="font-bold">Descrição:</span>{' '}
                {correction.description}
              </p>
              {correction.correct && (
                <p>
                  <span className="font-bold">Correção:</span>{' '}
                  {correction.correct}
                </p>
              )}
              <p>
                <span className="font-bold">Severidade:</span>{' '}
                {getSeverityText(correction.severity)}
              </p>
            </div>
          ))}
        </>
      ) : (
        ''
      )}
    </div>
  )
}

export default DocumentCorrection
