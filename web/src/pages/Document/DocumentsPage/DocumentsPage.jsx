import { useParams } from '@redwoodjs/router'

import DocumentsCell from 'src/components/Document/DocumentsCell'

const DocumentsPage = () => {
  const { activityId } = useParams()
  return <DocumentsCell activityId={activityId} />
}

export default DocumentsPage
