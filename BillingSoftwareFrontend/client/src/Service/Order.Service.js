 import { Observable } from "rxjs";
import networkService from "../network/networkService";
import { UrlConfig } from "../network/urlstore";
const createQueryParams = params => 
      Object.keys(params)
            .map(k => `${k}=${encodeURI(params[k])}`)
            .join('&');
export const creatOrder = (queryParams) => {
    let url = UrlConfig.AddCategory()+"orders";
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

export const DeleteOrder = (id) => {
    // create instance of UrlConfig
    const urls = UrlConfig.AddCategory()+"orders"+id;

    // use backticks for template literal
    let url = `${urls}/${categoryId}`;
    console.log("This is",url);
    

    return new Observable((subscriber) => {
        networkService.delete(url).then(
            (res) => {
                if (res) subscriber.next(res);
                subscriber.complete();
            },
            (error) => {
                subscriber.error(error);
            }
        );
    });
};

export const fetchLatestOrder = (queryParams) => {
 let url = UrlConfig.AddCategory()+"orders/latest";
 if(queryParams&&queryParams.length>0){
    url=url+"?"+createQueryParams(queryParams[0])
 }
 
    return new Observable((subscriber) => {
        networkService.get(url,[],{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("token")
            }
        }).then((res) => {
            subscriber.next(res),
                subscriber.complete
        },
            (error) => {
                subscriber.error(error)
            })
    })
}