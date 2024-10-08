import logo from './logo.svg';
import './App.css';
import ContactTable from './ContactTable';
import CreateContact from './CreateContact';

function App() {
  return (
    <div className="App">
      <CreateContact />
      <ContactTable />
    </div>
  );
}

export default App;
