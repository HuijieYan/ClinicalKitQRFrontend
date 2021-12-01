import './App.css';
import IndexMain from './IndexMain';
import MenuBar from './MenuBar';
import './Sidebar.css';

function App() {

  return (
    <div className="App" id = "app">
      <MenuBar/>
      <div id = "content">
        <IndexMain />
      </div>
    </div>
  );
}



export default App;
