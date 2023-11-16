import Rotas from './routes'
import AuthProvider  from './Contexts/AuthContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import './App.scss'

function App() {
  return (
      <AuthProvider>
    <div className='container-fluid'>
      <Rotas />
      <ToastContainer autoClose={500}
/>    </div>
      </AuthProvider>
  );
}

export default App;
