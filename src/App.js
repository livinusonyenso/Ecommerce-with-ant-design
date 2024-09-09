import {}  from 'antd'
import './App.css';
import AppFooter from './components/Footer';
import PageContent from './components/PageContent';
import AppHeader from './components/Header';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className='App'> 
    <BrowserRouter>
      <AppHeader />
      <PageContent />
      <AppFooter />
      </BrowserRouter>
    </div>
  );
}






export default App;
