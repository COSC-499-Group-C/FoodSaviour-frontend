import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
// import './css/sharing.css';

function Sharing() {
    return (
        <div>
            <div>
                <h1 className = "fs-1">Test Sharing</h1>
                <p>Have items to share? Need items? You've found the right place!</p>
            </div>
            <nav className="">
                <ul className="nav-list">
                    <div className="logo">
                        <img src={'././public/images/logo.png'} height={"100px"} />
                    </div>
                    {/* <li><a href="#"></a></li>
                    <li><a href="#"></a></li>
                    <li><a href="#"></a></li>
                    <li><a href='#'></a></li> */}
                </ul>

                <div className="rightNav">
                    <input type="text" name="search" id="search" />
                    <button className="btn btn-sm">Search</button>
                </div>
            </nav>

            <section className="section">
                <div className="box-main">
                    <div className="org-logo"></div>
                    <div>
                        <h1 className="">Organization name</h1>
                        <p className="">Contact info</p>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="box-main">
                    <div className="org-logo"></div>
                    <div>
                        <h1 className="text-big">Organization name</h1>
                        <p className="text-small">Contact info</p>
                    </div>
                </div>
            </section>
            
            <footer classNameName="footer">
                <p classNameName="text-footer">
                </p>
            </footer>
        </div>
    )
}
export default Sharing
