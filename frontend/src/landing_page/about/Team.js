import React from 'react';

function Team() {
    return ( 
        <div className='container'>
            <div className='row p-3 mt-4  border-top'>
                <h1 className='text-center '>
                    People
                </h1>
            </div>

            <div className='row p-3 text-muted'
            style={{lineHeight:"1.8", fontSize:"1.2em"}} 
            >
                <div className='col-6 p-3 text-center'>
                   <img src='media/owner_pfp.png' 
                    className="img-fluid"
                    style={{borderRadius:"100%", width:"50%"}}
                   />
                   <h4 className='mt-5'>Shoan Wagh</h4>
                   <h6 className='mt-3'>Creator, Product Lead</h6>
                </div>

                <div className='col-6 p-3'>
                   <p>
                    Shoan founded this platform to build a simple and technology-driven trading experience, with the goal of making investing easier and more accessible for modern investors. He built the platform from the ground up, combining a clean interface with modern web technologies.
                    </p> 
                    <p>
                    Today, the platform focuses on delivering a seamless experience for exploring markets, understanding investments and managing financial products. Shoan continues to explore new ideas and technologies while improving the platform and its overall user experience.
                    </p> 
                    <p>
                    Playing cricket is his zen. 
                    </p>
                    <p>
                    Connect on &nbsp;
                    <a href='https://github.com/shoanwagh-26' 
                    style={{textDecoration:"none"}}>
                    GitHub
                    </a> / &nbsp;
                    <a href='linkedin.com/in/shoanwagh' 
                    style={{textDecoration:"none"}}>
                     LinkedIn
                    </a>
                    </p>
                </div>
            </div>
        </div>
     );
}

export default Team;
