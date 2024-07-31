const DocumentMark = ({ mark, subFactorsMark }) => {
  return (
    <div>
      {mark != null ? (
        <>
          <hr id="mark" className="my-16 border-gray-300" />
          <div className="mb-4 text-gray-900">
            <h2 className="mb-2 text-3xl">
              <span className="border-l-4 border-blue-500 pl-2 font-bold">
                Nota: {mark}
              </span>
            </h2>
            <ul className="list-disc pl-8">
              {Object.entries(JSON.parse(subFactorsMark)).map(
                ([key, value]) => (
                  <li key={key} className="mb-2">
                    <span className="font-bold">{key}:</span> {value}
                  </li>
                )
              )}
            </ul>
          </div>
        </>
      ) : (
        ''
      )}
    </div>
  )
}

export default DocumentMark
