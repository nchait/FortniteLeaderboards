import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

// template for table
export interface row {
  Name: string;
  KDRatio: string;
  Kills: string;
  Wins: string;
  Matches: string;
  Winrate: string;
  Score: string;
}


@Injectable({
  providedIn: 'root'
})
export class FortniteStatsService {
  // based on selection and fortnite stats api rules
  gameMode = ["all","solo","duo","squad"]
  sortCol = ["kd","kills","matches","score","winrate","wins"]
  platform = ["pc","xbox","ps4"]
  // order in FS
  // Name-K/D-Kills-Wins-Matches-Winrate-Score
  // two templates used for formatting
  corrected: row[] = [
    {
      Name: 'Example', 
      KDRatio: '111', 
      Kills: '111', 
      Wins: '111', 
      Matches: '111', 
      Winrate: '111', 
      Score: '111'
    }  
  ];
  newRow: row = {
    Name: 'Example', 
    KDRatio: '111', 
    Kills: '111', 
    Wins: '111', 
    Matches: '111', 
    Winrate: '111', 
    Score: '111'
  }  
  constructor( private http:Http ) {

   }
  public callFS(callback_fun, page, sortCol, gameMode, platform){
    var params = "page="+page+
                      "&sort="+this.gameMode[gameMode]+
                      "-"+this.sortCol[sortCol]+
                      "+&platform="+this.platform[platform]
    // based on fortnite stats api rules. check console for cleaner looking version
    console.log("Get request sent to: https://fortnitestats.net/?"+params)
    this.http.get("api/FortniteStats/"+params)    
        .subscribe(
          (data: any) => 
            {
              //scraping html
              var split = data._body.toString().split('<tr class="player-row">')
              split[50] = split[50].split("/tbody>")[0]
              this.corrected=[]
              var i = 0;
              for ( i = 0; i < 50; i++) {
                var fSRow = split[i+1];
                var rowSplit = fSRow.split(">")
                if(rowSplit.length!=20){
                  // an accepable error
                  console.log("error: due to > character in name")
                  console.log(fSRow)
                } else{
                  // set the new row based on the page layout     
                  this.newRow = {
                      Name: rowSplit[4].split("</a")[0], 
                      KDRatio: rowSplit[7].split("</td")[0], 
                      Kills: rowSplit[9].split("</td")[0], 
                      Wins: rowSplit[11].split("</td")[0], 
                      Matches: rowSplit[13].split("</td")[0], 
                      Winrate: rowSplit[15].split("</td")[0], 
                      Score: rowSplit[17].split("</td")[0]
                  }
                }
                // console.log(newRow)
                this.corrected.push(this.newRow)
              }
              // call the onFSLoad or onNextFSLoad function in the main component
              callback_fun(this.corrected);
            }, 
            error => {
              console.log(error)
            } // error path
      );
  }
}
