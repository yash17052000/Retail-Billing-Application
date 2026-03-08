 import { Observable } from "rxjs";
import networkService from "../network/networkService";
import { UrlConfig } from "../network/urlstore";
const createQueryParams = params => 
      Object.keys(params)
            .map(k => `${k}=${encodeURI(params[k])}`)
            .join('&');
export const AddUser = (queryParams) => {
    let url = UrlConfig.AddCategory()+"admin/register";
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

export const DeleteUser = (id) => {
    // create instance of UrlConfig
    const urls = UrlConfig.AddCategory()+"admin/users/"+id;

    // use backticks for template literal

    

    return new Observable((subscriber) => {
        networkService.delete(urls,[],{
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

export const fetchUsers = (queryParams) => {
 let url = UrlConfig.AddCategory()+"admin/users";
 if(queryParams&&queryParams?.length>0)
 url=url+"?"+createQueryParams(queryParams[0]) 
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