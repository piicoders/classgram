import { useParams } from '@redwoodjs/router'

import ActivitiesCell from 'src/components/Activity/ActivitiesCell'
const ActivitiesPage = () => {
  const { classId } = useParams()
  return <ActivitiesCell classId={classId} />
}

export default ActivitiesPage
