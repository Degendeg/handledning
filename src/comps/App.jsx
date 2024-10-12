import '../css/index.css'
import { UserContext } from '../context/UserProvider';
import { useContext, useEffect } from 'react';
import UserList from './UserList'

function App() {
  const { isLoading } = useContext(UserContext);

  useEffect(() => {
    const img = new Image();
    img.src = "https://images.pexels.com/photos/8386750/pexels-photo-8386750.jpeg";
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
          <div className="flex flex-col items-center max-w-sm mx-auto text-center">
            <div className="skeleton h-[36rem] w-96"></div>
          </div>
        </div>
      ) : (
        <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
          <div className="flex flex-col items-center max-w-sm mx-auto text-center">
            <div className="card bg-base-100 w-96 shadow-xl bg-zinc-700">
              <figure>
                <img
                  src="https://images.pexels.com/photos/8386750/pexels-photo-8386750.jpeg"
                  alt="Help" />
              </figure>
              <div className="card-body">
                <UserList />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default App
