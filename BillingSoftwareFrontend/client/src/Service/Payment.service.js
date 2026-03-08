 import { Observable } from "rxjs";
import networkService from "../network/networkService";
import { UrlConfig } from "../network/urlstore";
const createQueryParams = params => 
      Object.keys(params)
            .map(k => `${k}=${encodeURI(params[k])}`)
            .join('&');
export const createRazorPayOrder = (queryParams) => {
    let url = UrlConfig.AddCategory()+"payments/create-order";
    return new Observable((subscriber) => {
        networkService.post(url, queryParams,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("token")
            }
        }).then((res) => {
            if (res)
                subscriber.next(res);
            subscriber.complete();
        }, (error) => {
            subscriber.error(error);
        })
    })
}

export const verifyOrder = (paymentData) => {
    let url = UrlConfig.AddCategory()+"payments/verify";
    return new Observable((subscriber) => {
        networkService.post(url, paymentData,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("token")
            }
        }).then((res) => {
            if (res)
                subscriber.next(res);
            subscriber.complete();
        }, (error) => {
            subscriber.error(error);
        })
    })
}