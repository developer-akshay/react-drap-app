import './App.css';
import Headers from './components/header';
import HomePage from './components/home';

function App() {
  return (
   <div className="grid grid-rows-1">
     <header className='bg-white px-12 shadow-md py-2 sticky top-0 z-index'>
         <Headers/>
     </header>
      <div className="container px-20 py-10">
           <HomePage/>
       </div> 
    </div>
  );
}

export default App;
