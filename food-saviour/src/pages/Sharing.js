import React from 'react';
import '../css/sharing.css';
import Navbar from "../components/Navbar.js";

function Sharing() {
    return (
        <div className='blue vh-100 overflow-auto'>
            <Navbar></Navbar>
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

            {/* <div className="left">
                <input type="text" name="search" id="search" />
                <button className="btn btn-sm">Search</button>
            </div> */}
            {/* </nav> */}
            <section className='d-flex flex-wrap justify-content-center'>
                <div className="bg-white w-25 p-4 m-3 rounded-4">
                    <div className=""></div>
                    <div>
                        <h1 className="fw-bold fs-4">Waste category</h1>
                        <div>
                            <input type="checkbox" /> Produce
                        </div>
                        <div>
                            <input type="checkbox" /> Frozen food
                        </div>
                        <div>
                            <input type="checkbox" /> Imperishable
                        </div>
                    </div>
                </div>
                <div className="bg-white w-25 p-4 m-3 rounded-4">
                    <div className="org-logo"></div>
                    <div>
                        <h1 className="fw-bold fs-4">Organizations</h1>
                        {/* <img className='d-flex justify-content-center m-0' src='/images/logo.png' height="50px" /> */}
                        <div>
                                <input type="checkbox" /> UBC
                        </div>
                        <div>
                                <input type="checkbox" /> Farmer's market
                        </div>
                        <div>
                            <input type="checkbox" /> Food bank
                        </div>
                    </div>
                </div>
                <div className="bg-white w-25 p-4 m-3 rounded-4">
                    <div className="org-logo"></div>
                    <div>
                        <h1 className="fw-bold fs-4">Roles</h1>
                        <div>
                            <input type="checkbox" /> Manager
                        </div>
                        <div>
                            <input type="checkbox" /> Volunteers
                        </div>
                        <div>
                            <input type="checkbox" /> Supervisor
                        </div>
                    </div>
                </div>
                <div className="bg-white w-25 p-4 m-3 rounded-4">
                    <div className=""></div>
                    <div>
                        <h1 className="fw-bold fs-4">Waste category</h1>
                        <div>
                            <input type="checkbox" /> Produce
                        </div>
                        <div>
                            <input type="checkbox" /> Frozen food
                        </div>
                        <div>
                            <input type="checkbox" /> Imperishable
                        </div>
                    </div>
                </div>
                <div className='w-75 justify-content-center d-flex btn text-white bg-dark'>Generate data</div>
            </section>
            <section className='d-flex flex-wrap justify-content-center'>
                <div className="bg-white w-75 p-4 m-3 rounded-4">
                    <div className="org-logo"></div>
                    <div>
                        <h1 className="fw-bold fs-4">Generated graphs</h1>
                        <p className="">Generate graphs here from tracker</p>
                        <img src='/images/sample_graph.png' height="200px" />
                    </div>
                </div>
                {/* <div className="bg-white w-75 p-4 m-3 rounded-4">
                    <div className="org-logo"></div>
                    <div>
                        <h1 className="fw-bold fs-4">Discussion board</h1>
                        <p className="">Jane: Hello</p>
                        <p className="">John: Hello</p>
                    </div>
                </div> */}

                <footer className="footer">
                    <p className="text-footer">
                    </p>
                </footer>
            </section >
        </div>
    )
}
export default Sharing;
