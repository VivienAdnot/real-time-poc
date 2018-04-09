import { map, catchError } from 'rxjs/operators' 
const RxHR = require('@akanass/rx-http-request').RxHR;

export function getStocks() {
    return RxHR.get('http://localhost:46300/stocks')
               .pipe(
                    map((data) => {
                    if(data.response.statusCode === 200)
                        return JSON.parse(data.response.body);
                    else
                        throw Error(data.response);
                    }),
                    catchError(err => console.err(err))
                )
}