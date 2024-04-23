import { useQuery, gql } from '@redwoodjs/web'
import { Form } from '@redwoodjs/forms'


import { useAuth } from 'src/auth'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useEffect, useState } from 'react'


const ActivityReview = ({documentId}) => {
  const [countErrors, setCountErrors] = useState('')


  const CountErrorsByCriterion = gql`
    query CountErrorsByCriterion($documentId: Int!) {
      countErrorsByCriterion(documentId: $documentId) {
        criterionName
        errorCount
      }
    }
  `
  const UpdateDocumentMark = gql`
  mutation UpdateDocumentMarkMutation($mark: Int!, $documentId: Int!) {
    updateMarkByDocumentId(mark: $mark, id: $documentId) {
      id
    }
  }
`

  const { loading, error, data } = useQuery(CountErrorsByCriterion, {
    variables: { documentId }
  })

   useEffect(() => {
     if (!loading && !error && data && data.countErrorsByCriterion) {
      console.log(data.countErrorsByCriterion)
      setCountErrors(data.countErrorsByCriterion)
     } else if (error) {
       console.error('Erro:', error)
     }
   }, [loading, error, countErrors])

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <Form >

      </Form>
    </div>
  )
}

export default ActivityReview
