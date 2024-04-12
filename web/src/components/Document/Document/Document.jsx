import SelectCorrection from 'src/components/SelectCorrection'

const Document = ({ document }) => {
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
          <SelectCorrection />
          <p className="text-base">{document.content}</p>
        </div>
      </div>
    </div>
  )
}

export default Document
