import { Link, Route, Routes } from 'react-router-dom';
import './App.css'
// import RoutinePage from './RoutinePage'
// import AddProductPage from './AddProductPage'
// import AskDermatologistPage from './AskDermatologistPage'
// import DiaryPage from './DiaryPage'
// import ProductCard from './ProductCard'
import ChatPage from './pages/chatPage'

function App() {
  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-pink-50 to-purple-50'>
      <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="flex items-center space-x-2">
            <span className="text-xl font-semibold text-pink-600">Skincare Diary</span>
        </div>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button type="button" className="text-white bg-blue-100 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Get started</button>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a className='block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'>My Products</a>
            </li>
            <li>
              <a className='block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'>Reviews</a>
            </li>
            <li>
              <Link to="/chat" className='block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'>Chat</Link>
            </li>
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={
          <>
      <div className="bg-white rounded-lg shadow-md p-6 pt-52">
        <h2 className="text-xl font-medium text-purple-600 mb-4">Morning Routine</h2>
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ProductCard 
            name="Micellar Water" 
            imageUrl="/api/placeholder/200/200" 
            category="Makeup Remover"
          />
          <ProductCard 
            name="Retinol Treatment" 
            imageUrl="/api/placeholder/200/200" 
            category="Treatment"
          />
          <ProductCard 
            name="Night Cream" 
            imageUrl="/api/placeholder/200/200" 
            category="Moisturizer"
          />
        </div> */}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 pt-100">
        <h2 className="text-xl font-medium text-purple-600 mb-4">Evening Routine</h2>
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ProductCard 
            name="Micellar Water" 
            imageUrl="/api/placeholder/200/200" 
            category="Makeup Remover"
          />
          <ProductCard 
            name="Retinol Treatment" 
            imageUrl="/api/placeholder/200/200" 
            category="Treatment"
          />
          <ProductCard 
            name="Night Cream" 
            imageUrl="/api/placeholder/200/200" 
            category="Moisturizer"
          />
        </div> */}
      </div>
      </>
        } />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App
