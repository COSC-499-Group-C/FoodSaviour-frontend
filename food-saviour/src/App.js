import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="">Food Saviour</h1>
        <p></p>
        <div className = "account-btn">
          <a href="/login" className="btn btn-home btn-primary">Login</a>
          <a href="/register" className="register-btn btn btn-home btn-primary">Register</a>
          <p>hello</p>
        </div>
      </header>
    </div >

  // <div class="center center-text">
      // {/* <img src="../static/Project/foodsaviour.png" alt="FoodSaviour Logo" class="img-lg"> */}
  // </div>

  );
}

export default App;
