import React from 'react';

function Hero() {
    return ( 
        <section className='container-fluid' id='supportHero'>
            <div className='p-5' id='supportWrapper'>
                <h4 className='fs-2'>
                Support Portal
                </h4>
                <a href='' style={{textDecoration:"none", color:"white"}}>Track Tickets</a>
            </div>

            <div className='row p-5 m-3'>
                <div className='col-6 p-5'>
                    <h1 className='fs-4'>
                    Search for an answer or browse help topics to create a ticket
                    </h1>
                   <input className='mb-3 mt-3'
                   placeholder='Eg: how do i activate F&O, why is my order getting rejected.. '/>
                    <br/>
                   <a href='' style={{color:"white"}}>Track account opening</a> &nbsp;
                    <a href='' style={{color:"white"}}>Track segment activation</a>&nbsp;
                    <a href='' style={{color:"white"}}>Intraday margins</a>&nbsp;
                    <a href='' style={{color:"white"}}>Kite user manual</a>&nbsp;
                </div>

                <div className='col-6 p-5'>
                    <h1 className='fs-4'>
                    Featured
                    </h1>
                    <ol style={{lineHeight:"2.3em"}}>
                        <li> <a href='' style={{color:"white"}}>Current Takeovers and Delisting- August 2026 </a></li>
                        <li><a href='' style={{color:"white"}}>Latest Intraday leverages- MIS& CO</a></li>
                    </ol>
                </div>
            </div>
        </section>
     );
}

export default Hero; class name {
    constructor(parameters) {
        
    }
}