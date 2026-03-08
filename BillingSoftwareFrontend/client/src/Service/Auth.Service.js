 import { Observable } from "rxjs";
import networkService from "../network/networkService";
import { UrlConfig } from "../network/urlstore";
 const createQueryParams = params => 
      Object.keys(params)
            .map(k => `${k}=${encodeURI(params[k])}`)
            .join('&');
            
export const LoginAccount = (payload) => {
    let url = UrlConfig.AddCategory()+"login";

    
    return new Observable((subscriber) => {
        networkService.post(url, payload).then((res) => {
            if (res)
                subscriber.next(res);
            subscriber.complete();
        }, (error) => {
            subscriber.error(error);
        })
    })
}