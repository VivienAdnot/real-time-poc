import React from 'react';
import Stocks from './stocks/stocks.component';
import { getStocks } from './services/stocks.service';

class App extends React.Component {
    state = {
        stocks: []
    }
    
    getUpdates(){
        const evtSource = new EventSource('http://localhost:46300/events');
        evtSource.onmessage = (message) => {
            const stockToUpdate = JSON.parse(message.data);
            const allStocks = this.state.stocks;
            allStocks[stockToUpdate.id -1] = stockToUpdate;
            this.setState({stocks: allStocks})
        };        
    }

    componentDidMount() {
        getStocks().subscribe(
            (data) => this.setState({stocks: data})
        );
        this.getUpdates();
    }

    render() {
        return (
            <Stocks stocks= {this.state.stocks}></Stocks>
         );
    }
}

export default App;