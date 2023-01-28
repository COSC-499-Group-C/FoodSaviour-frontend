import './css/App.css';
import Login from "./Login";

function App() {
  return (
    <div className="">
      <header className="App-header">
        <h1 className="">Food Saviour</h1>
        <img src={"/images/logo.png"} className="App-logo" alt="logo" />
        <div className = "account-btn">
          <a href="/Login" className="btn btn-home btn-primary">Login or Register</a>
        </div>
      </header>
    </div >

  );
}
export default App;
