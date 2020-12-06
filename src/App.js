import './App.css';
import AddTeam from './component/AddTeam';
import Header from './component/Header';
import TeamList from './component/TeamList';



function App() {
  return (
    <div className="App">
      <Header />
      <AddTeam />
     
      <TeamList />

    </div>
  );
}

export default App;
