import axios from "axios"
import { Observable } from "rxjs";
import networkService from "../network/networkService";
import { UrlConfig } from "../network/urlstore";

    const createQueryParams = params => 
      Object.keys(params)
            .map(k => `${k}=${encodeURI(params[k])}`)
            .join('&');
            
export const AddCategory = (queryParams) => {
    let url = UrlConfig.AddCategory()+"admin/categories";
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


export const DeleteCategory = (categoryId) => {
    // create instance of UrlConfig
    const urls = UrlConfig.AddCategory()+"admin/categories";

    // use backticks for template literal
    let url = `${urls}/${categoryId}`;
    console.log("This is",url);
    

    return new Observable((subscriber) => {
        networkService.delete(url,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("token")
            }
        }).then(
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


export const fetchCategories = (queryParams) => {
 let url = UrlConfig.AddCategory()+"categories";
 console.log("queryaoarms",queryParams);
 
 if(queryParams&&queryParams?.length>0)
 url=url+"?"+createQueryParams(queryParams[0])
 console.log("This is",url);
 
    return new Observable((subscriber) => {
        networkService.get(url,queryParams,{
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

