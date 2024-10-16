import '../css/index.css'
import { useEffect } from 'react';
import UserList from './UserList/UserList';

function App() {
  useEffect(() => {
    const img = new Image();
    img.src = "https://images.pexels.com/photos/8386750/pexels-photo-8386750.jpeg";
  }, []);

  return (
    <>
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
    </>
  )
}

export default App
