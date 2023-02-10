import React from 'react';
import '../css/sharing.css';

function Sharing() {
    return (
        <div className='blue vh-100 overflow-auto'>
            <div className='text-center'>
                <img src='/images/logo.png' height="80px" />
                <h1 className='fs-1 text-center mt-1 fw-bold text-white'>Sharing</h1>
                <p className='text-center text-white'>Have items to share? Need items? You've found the right place!</p>
            </div>
            {/* <nav className="">
                <ul className="nav-list">
                    <div className="logo">
                        <img src={'/images/logo.png'} height={"100px"} />
                    </div>
                    <li><a href="#"></a></li>
                    <li><a href="#"></a></li>
                    <li><a href="#"></a></li>
                    <li><a href='#'></a></li>
                </ul> */}

            <div className="left">
                <input type="text" name="search" id="search" />
                <button className="btn btn-sm">Search</button>
            </div>
            {/* </nav> */}
            <section className='d-flex flex-wrap justify-content-center'>
                <div className="bg-white w-25 p-4 m-3 rounded-4">
                    <div className="org-logo"></div>
                    <div>
                        <h1 className="fw-bold fs-4">UBC</h1>
                        <p className="">Contact info</p>
                    </div>
                </div>
                <div className="bg-white w-25 p-4 m-3 rounded-4">
                    <div className="org-logo"></div>
                    <div>
                        <h1 className="fw-bold fs-4">Food Saviour</h1>
                        <img className = 'd-flex justify-content-center m-0' src='/images/logo.png' height="50px" />
                        <p className="">Contact info</p>
                        <p className="">Email</p>
                        <p className="">Phone number (optional)</p>
                    </div>
                </div>
                <div className="bg-white w-25 p-4 m-3 rounded-4">
                    <div className="org-logo"></div>
                    <div>
                        <h1 className="fw-bold fs-4">Farmer's Market</h1>
                        <p className="">Contact info</p>
                    </div>
                </div>
                <div className="bg-white w-25 p-4 m-3 rounded-4">
                    <div className="org-logo"></div>
                    <div>
                        <h1 className="fw-bold fs-4">Organization name</h1>
                        <p className="">Contact info</p>
                    </div>
                </div>
                <div className="bg-white w-25 p-4 m-3 rounded-4">
                    <div className="org-logo"></div>
                    <div>
                        <h1 className="fw-bold fs-4">Organization name</h1>
                        <p className="">Contact info</p>
                    </div>
                </div>
                <div className="bg-white w-25 p-4 m-3 rounded-4">
                    <div className="org-logo"></div>
                    <div>
                        <h1 className="fw-bold fs-4">Farmer's Market</h1>
                        <p className="">Contact info</p>
                    </div>
                </div>
                <div className="bg-white w-25 p-4 m-3 rounded-4">
                    <div className="org-logo"></div>
                    <div>
                        <h1 className="fw-bold fs-4">Farmer's Market</h1>
                        <p className="">Contact info</p>
                    </div>
                </div>
                <div className="bg-white w-25 p-4 m-3 rounded-4">
                    <div className="org-logo"></div>
                    <div>
                        <h1 className="fw-bold fs-4">Farmer's Market</h1>
                        <p className="">Contact info</p>
                    </div>
                </div>
                <div className="bg-white w-25 p-4 m-3 rounded-4">
                    <div className="org-logo"></div>
                    <div>
                        <h1 className="fw-bold fs-4">Farmer's Market</h1>
                        <p className="">Contact info</p>
                    </div>
                </div>

                <footer className="footer">
                    <p className="text-footer">
                    </p>
                </footer>
            </section >
        </div>
    )
}
export default Sharing
