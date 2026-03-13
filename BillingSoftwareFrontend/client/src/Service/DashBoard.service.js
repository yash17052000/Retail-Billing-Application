 import { Observable } from "rxjs";
import networkService from "../network/networkService";
import { UrlConfig } from "../network/urlstore";
export const fetchAllDashBoardData = () => {
    let url = UrlConfig.AddCategory()+"dashboard";
    return new Observable((subscriber) => {
        networkService.get(url, [],{
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