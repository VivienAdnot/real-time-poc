// @flow
import React from 'react';
import type { Stock } from '../models/stock.model';
import './stock.component.css';

type Props = {
    stock: Stock;
}

class StockComp extends React.Component<Props, void> {
    render() {
        return (
           <div className="stock">
              <span className="symbol">{this.props.stock.symbol}</span>
              <span className="price">{this.props.stock.price.toFixed(2)}</span>
           </div>
        );
     }            
}

export default StockComp