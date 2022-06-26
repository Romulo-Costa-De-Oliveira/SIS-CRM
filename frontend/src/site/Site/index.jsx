import React from "react";
import Menu from '../../site/components/Menu';
import Banner from '../../site/components/Banner';
import Features from '../../site/components/Features';
import Customers from '../../site/components/Customers';
import Prices from '../../site/components/Prices';
import Footer from '../../site/components/Footer';

function Site() {
    return (
        <div>
            <Menu />
            <div>
                <Banner />
                <Features />
                <Customers />
                <Prices />
                <Footer />
            </div>
        </div>
    )
}

export default Site;