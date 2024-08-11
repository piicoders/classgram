import React, { useEffect, useState } from 'react'

import { useQuery } from '@redwoodjs/web'

import DocumentComments from '../DocumentComments/DocumentComments'
import DocumentCorrection from '../DocumentCorrection/DocumentCorrection'
import DocumentMark from '../DocumentMark/DocumentMark'
import DocumentText from '../DocumentText/DocumentText'
import SidebarMenu from '../SidebarMenu/SidebarMenu'

const COMMENT_BY_DOCUMENT_ID = gql`
  query CommentByDocumentId($documentId: Int!) {
    commentByDocumentId(documentId: $documentId) {
      id
      user {
        name
      }
      content
    }
  }
`

const StudentDocument = ({ document, title, corrections }) => {
  const [comments, setComments] = useState([])
  const { loading, error, data } = useQuery(COMMENT_BY_DOCUMENT_ID, {
    variables: { documentId: parseInt(document.id) },
  })

  useEffect(() => {
    if (!loading && !error && data.commentByDocumentId) {
      setComments(data.commentByDocumentId)
    }
  }, [loading, error, data])

  return (
    <>
      <SidebarMenu />
      <DocumentText
        documentId={document.id}
        title={title}
        corrections={corrections}
        content={document.content}
        handed={document.handed}
      />
      <DocumentMark
        mark={document.mark}
        subFactorsMark={JSON.parse(document.subFactorsMark)}
      />
      <DocumentCorrection corrections={corrections} />
      <DocumentComments comments={comments} />
    </>
  )
}

export default StudentDocument
