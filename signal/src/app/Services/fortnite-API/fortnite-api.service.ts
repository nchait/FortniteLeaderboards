import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class FortniteApiService {

  constructor( private http:Http) {
    
   }
   public callFortniteAPI(callback_fun, ID){
    console.log("Get request sent to: https://fortnite-public-api.theapinetwork.com/prod09/users/id?username="+encodeURI(ID))
    this.http.get("api/FortniteAPI/username/"+encodeURI(ID))    
        .subscribe(
          (data: any) => 
            {
              // get the overall metadata on the username including database id and platforms
              var res = JSON.parse(data._body)
              var stats = [
                {object: null},
                {object: null},
                {object: null}
              ]
              try{
                if(res.error){
                  callback_fun(stats)
                  return
                }
              }catch(error){
                console.log(error)
              }
              // get stats in iterative fuction based platforms and id
              this.getStats(callback_fun, res, 0, stats)
            }, 
            error => {
              console.log(error)
            } // error path
      );
  }
  public getStats(callback_fun, res, i, stats){
    // end the iteration in a similar fashion to for loops and 
    //          call the onResponse function in the profile modal component
    if (i>=res.platforms.length){
      callback_fun(stats);
      return;
    }
    // based on fortnite api rules. check console for cleaner looking version
    var params = "user_id=" + res.uid + "&platform=" + res.platforms[i] 
    console.log("Get request sent to: https://fortnite-public-api.theapinetwork.com/prod09/users/public/br_stats?"+params)
    this.http.get("api/FortniteAPI/stats/"+params)    
        .subscribe(
          (data: any) => 
            {
              // based on which platform the stats are for populat stats
              if ("pc"==res.platforms[i]){
                stats[0].object = JSON.parse(data._body)
              } else if ("xb1"==res.platforms[i]){
                stats[1].object = JSON.parse(data._body)
              } else if ("ps4"==res.platforms[i]){
                stats[2].object = JSON.parse(data._body)
              }
              // iterate
              this.getStats(callback_fun, res, i+1, stats)
            }, 
            error => {
              console.log(error)
            } // error path
      );
  }

}
