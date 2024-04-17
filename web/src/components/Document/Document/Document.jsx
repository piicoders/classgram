import { useQuery, gql } from '@redwoodjs/web'
import { useState } from 'react'

import SelectCorrection from 'src/components/SelectCorrection'

const CORRECTIONS_BY_DOCUMENT_ID = gql`
  query CorrectionsByDocumentId($documentId: Int!) {
    correctionsByDocumentId(documentId: $documentId) {
      id
      text
      description
      correct
      severity
      subfactor {
        id
      }
    }
  }
`

const formatDate = (date) => {
  const options = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }
  return new Date(date).toLocaleDateString('pt-BR', options)
}
const MousePopup = ({ content, position, severity }) => {
  const getBorderColor = (severity) => {
    switch (severity) {
      case 'G':
        return 'border-4 border-green-500';
      case 'N':
        return 'border-4 border-gray-500';
      case 'B':
        return 'border-4 border-red-500';
      default:
        return 'border-4 border-gray-500';
    }
  };

  const borderColor = getBorderColor(severity);

  return (
    <div className={`fixed bg-white p-2 border ${borderColor}`} style={{ top: position.y, left: position.x }}>
      {content}
    </div>
  );
};

const Document = ({ document }) => {
  const { loading, error, data } = useQuery(CORRECTIONS_BY_DOCUMENT_ID, {
    variables: { documentId: document.id },
  })
  const [showPopup, setShowPopup] = useState(false);
  const [severity, setSeverity] = useState('');
  const [popupContent, setPopupContent] = useState('');
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

  const handleMouseOver = (event) => {
    const target = event.target;
    if (target.tagName === 'SPAN' && target.dataset.text) {
      const id = target.dataset.id;
      const description = target.dataset.description || 'Descrição não disponível';
      // Você pode usar o ID para fazer uma consulta posterior
      const position = { x: event.clientX, y: event.clientY };
      const correction = target.dataset.correction
      console.log(correction)
      setPopupContent(
        <div>
          <p>
            <strong>Descrição:</strong> {target.dataset.description}
          </p>
          {correction != null && (
            <p>
              <strong>Correção:</strong> {correction}
            </p>
          )}
        </div>
      );
      setPopupPosition(position);
      setShowPopup(true);
      setSeverity(target.dataset.severity)

    }
  };
  const handleMouseOut = () => {
    setShowPopup(false);
  };


  const correctionsData =
    !loading && !error && data
      ? data.correctionsByDocumentId.map((correction) => ({
          text: correction.text,
          id: correction.id,
          severity: correction.severity,
          description: correction.description,
          correct: correction.correct
        }))
      : []


  const highlightCorrections = (content, corrections) => {
    corrections.forEach((correction) => {
      let color = '';
      switch (correction.severity) {
        case 'G':
          color = '#2E8B57';
          break;
        case 'N':
          color = '#D3D3D3';
          break;
        case 'B':
          color = '#CD5C5C';
          break;
        default:
          color = 'inherit';
      }
      const markStart = `<mark style="background-color: ${color};">`;
      const markEnd = '</mark>';
      const regex = new RegExp(correction.text, 'gi');
      content = content.replace(regex, (match) => `${markStart}<span data-id="${correction.id}" data-text="${correction.text}" data-correction="${correction.correct}" data-description="${correction.description}">${match}</span>${markEnd}`);
    });
    return content;
  };


  const highlightedContent = highlightCorrections(
    document.content,
    correctionsData
  )

  return (
    <div className="mx-auto mt-8 max-w-6xl px-8" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      {showPopup && <MousePopup content={popupContent} position={popupPosition} severity={severity}/>}
      <SelectCorrection
        documentId={document.id}
        promptId={document.activity.promptId}
      />
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
            {formatDate(document.handed)}
          </p>
          <p className="mb-2 text-sm text-gray-600"></p>
          <p
            id="documentContent"
            className="text-base"
            dangerouslySetInnerHTML={{ __html: highlightedContent }}
          ></p>
        </div>
      </div>
    </div>
  )
}

export default Document
