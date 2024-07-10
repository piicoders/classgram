import { useQuery, gql } from '@redwoodjs/web'

import SelectCorrection from 'src/components/SelectCorrection'
import StudentDocument from 'src/components/StudentDocument'

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

const Document = ({ document }) => {
  const { loading, error, data, refetch } = useQuery(
    CORRECTIONS_BY_DOCUMENT_ID,
    {
      variables: { documentId: document.id },
    }
  )

  const correctionsData =
    !loading && !error && data
      ? data.correctionsByDocumentId.map((correction) => ({
          text: correction.text,
          id: correction.id,
          severity: correction.severity,
          description: correction.description,
          correct: correction.correct,
        }))
      : []

  const handleSubmission = async () => {
    await refetch({ documentId: document.id })
  }

  return (
    <div className="mx-auto mt-8 max-w-6xl px-8">
      <SelectCorrection
        documentId={document.id}
        promptId={document.activity.promptId}
        onCorrectionSubmission={handleSubmission}
      />

      <div
        id="activity"
        className="overflow-hidden rounded-lg bg-white shadow-lg"
      >
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
          <StudentDocument
            document={document}
            title={'Entregue por: ' + document.student.name}
            corrections={correctionsData}
          />
        </div>
      </div>
    </div>
  )
}

export default Document
