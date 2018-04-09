const http = require('http');
const sys = require('util');
const fs = require('fs');
const { getStocks, updateStock } = require('./stocks/stocks.db');


http.createServer(function(req, res) {
    //debugHeaders(req);
    initStockEndpoint(req,res);
    initSSE(req,res);
}).listen(46300);
  
  function initSSE(req,res){
    if (req.headers.accept && req.headers.accept === 'text/event-stream') {
      if (req.url === '/events') {
        sendSSE(req, res);
      } else {
        res.writeHead(404);
        res.end();
      }
    }
  }

  function sendSSE(req, res) {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
    });
    res.write('\n');
    // Sends a SSE every 5 seconds on a single connection.
    setInterval(() => constructSSE(res), 2000);
  
    constructSSE(res);
  }

  function constructSSE(res) {
    const stocks = getStocks();
    const maxStocks = stocks.length;
    const stockToUpdateIndex = Math.floor(Math.random() * maxStocks);
    const stockToUpdate = stocks[stockToUpdateIndex];
    const randomPriceToUdpate = Math.random() * (100 + 100) - 100;
    updateStock(stockToUpdateIndex+1,randomPriceToUdpate);
    const stringToSend = JSON.stringify({...stockToUpdate, price: (stockToUpdate.price + randomPriceToUdpate)});
    res.write('id: ' + (new Date()).getTime().toString() + '\n');
    res.write('data: ' + stringToSend + '\n\n');
  }

  function initStockEndpoint(req,res){
    res.writeHead(200,{
      'Content-Type': 'application/json',
      'X-Frame-Options': 'ALLOWALL',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    });
    if(req.url === '/stocks'){
      res.write(JSON.stringify(getStocks()));
      res.end();
    }

  }

  function debugHeaders(req) {
    sys.puts('URL: ' + req.url);
    for (var key in req.headers) {
      sys.puts(key + ': ' + req.headers[key]);
    }
    sys.puts('\n\n');
  }