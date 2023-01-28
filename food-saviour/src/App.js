import logo from './images/logo.png'
import './css/App.css';

function App() {
  return (
    <div className="">
      <header className="App-header">
        <h1 className="">Food Saviour</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <div className = "account-btn">
          <a href="/login" className="btn btn-home btn-primary">Login</a>
          <a href="/register" className="register-btn btn btn-home btn-primary">Register</a>
        </div>
      </header>
    </div >

  );
}
export default App;
