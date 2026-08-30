import React from 'react';

function Awards() {
    return ( 
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-6 p-5'>
                    <img src='media\largestBroker.svg' alt='Broker Image' className='' />
                </div>

                <div className='col-6 p-5 mt-5'>
                    <h1>Largest stock broker in India</h1>
                    <p>2+ million Nivara clients contribute to over 15% of all retailer order
                    order volumes in India daily by trading and investing in:
                    </p>
                    <div className='row mt-5'>
                        <div className='col-6'>
                            <ul>
                                <li>
                                    <p>Future and Options</p>
                                </li>
                                <li>
                                    <p>Commodity derivatives</p>
                                </li>
                                <li>
                                    <p>Currency derivatives</p>
                                </li>    
                            </ul>
                        </div>
                        <div className='col-6'>
                             <ul> 
                                <li>
                                    <p>Stocks &IPOs</p>
                                </li>
                                <li>
                                    <p>Direct mutual funds</p>
                                </li>
                                <li>
                                    <p>Bonds and Goverment security</p>
                                </li>
                            </ul>
                        </div>
                    </div> 
                    <img src='media\pressLogos.png' style={{width:"90%"}} />
                </div>
            </div>
        </div>
     );
}

export default Awards;
