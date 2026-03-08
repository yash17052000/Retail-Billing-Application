 import { Observable } from "rxjs";
import networkService from "../network/networkService";
import { UrlConfig } from "../network/urlstore";
const createQueryParams = params => 
      Object.keys(params)
            .map(k => `${k}=${encodeURI(params[k])}`)
            .join('&');
export const AddItems = (queryParams) => {
    let url = UrlConfig.AddCategory()+"admin/items";
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

export const DeleteItems = (categoryId) => {
    // create instance of UrlConfig
    const urls = UrlConfig.AddCategory()+"admin/items";

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

export const fetchItems = (queryParams) => {
 let url = UrlConfig.AddCategory()+"items";
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