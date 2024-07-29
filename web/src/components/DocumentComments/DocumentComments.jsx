const DocumentComments = ({ comments }) => {
  return (
    <div>
      {comments.length ? (
        <>
          <hr id="comments" className="my-16 border-gray-300" />
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            <span className="border-l-4 border-blue-500 pl-2">Comentários</span>
          </h2>
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="mb-4 rounded-lg bg-white p-6 shadow-md"
            >
              <h1 className="mb-4 text-2xl font-bold text-gray-900">
                {comment.user.name}:
              </h1>
              <p>{comment.content}</p>
            </div>
          ))}
        </>
      ) : (
        ''
      )}
    </div>
  )
}

export default DocumentComments
