/**
 * type Stock = {
 *  id: Int;
 *  symbol: String;
 *  price: Double;
 * }
 * 
 */


const stocks = new Map([
    [ 1, { id: 1, symbol:'Apple' , price: 100.7 } ],
    [ 2, { id: 2, symbol:'Google' , price: 200.7 } ],
    [ 3, { id: 3, symbol:'Microsoft' , price: 90.7 } ],
    [ 4, { id: 4, symbol:'IBM' , price: 300.7 } ],
    [ 5, { id: 5, symbol:'Spotify' , price: 500.7 } ],
    [ 6, { id: 6, symbol:'Twitter' , price: 300.7 } ],
])

module.exports = {
    //getStocks :: [Stock]
    getStocks(){
        return Array.from(stocks.values());
    },
    
    //updateStock :: Int -> Double -> Stock 
    updateStock(id,priceDif) {
        const stockToUpdate = stocks.get(id);
        const stockUpdated = {
            ...stockToUpdate,
            price: ((stockToUpdate.price + priceDif) < 0)? 0 : (stockToUpdate.price + priceDif) 
        };
        stocks.set(id,stockUpdated);
        return stockUpdated;
    }
}    
