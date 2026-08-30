import React from 'react';

function Hero() {
    return ( 
        <div className='container'>

            <div className='row p-5 border-bottom text-center'>
                <h1>Pricing</h1>
                <h3 className='text-muted mt-3 fs-5'>
                    Free equity investments and flat ₹20 traday and F&O trades.
                </h3>
            </div>

            <div className='row p-5 mt-3'>
                <div className='col-4 p-4'>
                    <img src='media/pricingEquity.svg' />
                    <h2 >Free equity delivery</h2>
                    <p>
                    All equity delivery investments (NSE, BSE),
                    are absoluetly free- ₹0 brokerage.
                    </p>
                </div>

                <div className='col-4 p-4'>
                   <img src='media/intradayTrades.svg' />
                   <h2 >Intraday and F&O trades</h2>
                   <p>Flat Rs. 20 or 0.03% (whichever is lower)
                    per executed order on intraday trades across equity, currency, and commodity trades.
                   </p>
                </div>

                 <div className='col-4 p-4'>
                   <img src='media/pricingEquity.svg' />
                   <h2>Free equity delivery</h2>
                    <p>
                    All equity delivery investments (NSE, BSE),
                    are absoluetly free- ₹0 brokerage.
                    </p>
                </div>
            </div>
        </div>
     );
}

export default Hero;