import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserProvider';
import Alert from './Alert';
import { motion, AnimatePresence } from 'framer-motion';

const UserList = () => {
  const {
    name,
    setName,
    users,
    addUser,
    updateUser,
    deleteUser,
    teacherKey,
    alert,
    clearAlert
  } = useContext(UserContext);

  useEffect(() => {
    if (alert.show) {
      const timer = setTimeout(() => clearAlert(), 5000);
      return () => clearTimeout(timer);
    }
  }, [alert, clearAlert]);

  const handleAddUser = () => {
    if (name.trim() && name.length < 17) {
      addUser(name);
      setName('');
    }
  };

  const handleUpdateStatus = (user) => {
    if (teacherKey && user) {
      updateUser(user);
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <div className="App">
      <h1 className="mb-2">User List</h1>
      <div>
        <div className="join">
          <input
            type="text"
            className="input input-bordered join-item"
            value={name}
            onKeyDown={(e) => { if (e.key === 'Enter') handleAddUser() }}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
          <button onClick={handleAddUser} disabled={!name.trim() || name.length >= 17}
            className="btn join-item rounded-r-full">Add me</button>
        </div>
        {alert.show && (
          <Alert type={alert.type} color={alert.color} message={alert.message} />
        )}
      </div>

      <div className="md:px-4 py-4 w-full">
        <div className="shadow overflow-hidden rounded border-b border-gray-200">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm"></th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm"></th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {users.length < 1 ? (
                <tr className="bg-white">
                  <td className="text-left py-3 px-4">No users yet 😔</td>
                </tr>
              ) : (
                <AnimatePresence>
                  {users.map((user, index) => (
                    <motion.tr
                      key={user.id}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={rowVariants}
                      layout
                      className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                    >
                      <td className="w-4/5 text-left py-3 px-4">
                        <span onClick={() => handleUpdateStatus(user)}
                          className={teacherKey ? 'cursor-pointer' : 'cursor-default'}>
                          <span className="font-bold">{index + 1}&#41;</span> {user.name}
                        </span>
                      </td>
                      <td className="w-2/5 text-right py-3 px-4">
                        {user.status === 'pending' ? (
                          <span className="dot-flashing"></span>
                        ) : user.status === 'completed' ? (
                          <span>✅</span>
                        ) : null}
                      </td>
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
                    </motion.tr>
                  ))}
                </AnimatePresence>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;
