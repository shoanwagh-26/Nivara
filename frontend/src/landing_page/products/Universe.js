import React from 'react';
import { useNavigate } from 'react-router-dom';

function Universe() {
    const navigate = useNavigate();

    return ( 
        <div className='container'>
            <div className='row text-center'>
                <h1 className='mt-5 border-top'>The Nivara Universe</h1>
                <p className='mt-2'>
                Extend your trading and investment experience    even further with our partner platforms.
                </p>

                <div className='col-4 p-3 mt-2'>

                    <img src='media/smallcaseLogo.png'
                    className="img-fluid " 
                    style={{ width: "70%", marginBottom: "10px" }}
                    />
                    <p className='text-small text-muted'>
                        Thematic investment platform
                    </p>

                    <img src='media/zerodhaFundhouse.png' 
                    className="img-fluid"
                    style={{ width: "65%", marginTop: "40px", marginBottom: "10px" }}
                    />
                    <p className='text-small text-muted'>
                       Asset management
                    </p>

                </div>

                 <div className='col-4 p-3 mt-2'>

                    <img src='media/streakLogo.png' 
                    className="img-fluid"
                    style={{ width: "50%", marginBottom: "10px" }}
                    />
                    <p className='text-small text-muted'>
                       Algo & startegy platform
                    </p>

                    <img src='media/goldenpiLogo.png' 
                    className="img-fluid "
                    style={{ width: "55%", marginTop: "40px", marginBottom: "10px" }}
                    />
                    <p className='text-small text-muted'>
                       Bonds trading platform
                    </p>                    

                </div>

                 <div className='col-4 p-3 mt-2'>

                    <img src='media/sensibullLogo.svg '
                    className="img-fluid"
                     style={{ width: "65%", marginBottom: "10px" }}
                    />
                    <p className='text-small text-muted'>
                        Options trading platform
                    </p>

                    <img src='media/dittoLogo.png'
                    className="img-fluid"
                    style={{ width: "60%", marginTop: "40px", marginBottom: "10px" }}
                    />
                    <p className='text-small text-muted'>
                        Insurance
                    </p>

                </div>

                <button className='p-2 btn btn-primary fs-5 mt-3 mb-5'style={{width:"20%", margin:"0 auto" }}
                onClick={() => navigate("/signup")}> 
                Sign up Now 
                </button>

            </div>
        </div>
     );
}

export default Universe;