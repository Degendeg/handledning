const UserRemovalCell = ({ teacherKey, deleteUser, user }) => {
  return (
    <>
      {teacherKey === import.meta.env.VITE_TEACHER_KEY ? (
        <td className="text-right py-3 px-4">
          <button
            className="btn btn-circle btn-outline btn-xs align-bottom"
            onClick={() => deleteUser(user.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </td>
      ) : (
        <td className="text-right py-3 px-4"></td>
      )}
    </>
  )
}
export default UserRemovalCell