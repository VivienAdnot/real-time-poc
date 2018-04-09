// @flow
import React from 'react';
import type { Stock } from '../models/stock.model';
import StockComp from './stock.component';
import './stocks.component.css';

type Props = {
    stocks: Stock[];
};

class Stocks extends React.Component<Props, void> {
    render() {
        return <div className="stocks">
                <div className="header"><span className="symbol">Entity</span><span className="price">Price</span></div>
                {
                    this.props
                        .stocks
                        .map( stock => (
                            <StockComp stock = {stock} ></StockComp>
                        ))
                }
                </div>;
     }            
}

export default Stocks