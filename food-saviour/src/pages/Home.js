import '../css/App.css';

function Home() {
    return (
        <div className="homepage">
            <header className="App-header">
                <h1 className="">Food Saviour</h1>
                <img src={"/images/logo.png"} className="App-logo" alt="logo"/>
                <div className="account-btn">
                    <a href="/login" className="btn btn-home btn-primary">Login or Register</a>
                </div>
            </header>
        </div>

    );
}

export default Home;
