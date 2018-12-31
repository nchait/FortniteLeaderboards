import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FortniteApiService } from '../services/fortnite-API/fortnite-api.service'
import { FormControl } from '@angular/forms';

export interface chart {
  labels: string[];
  data: number[];
}


@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.css']
})
export class ProfileModalComponent implements OnInit {
  // the package needs me to state a chart type
  public pie:string = 'pie';
  // the buttons are referringthe platform tabs, if true then disabled
  buts=[false,false,false]
  // somewhere to save the stats and bind them to the html file
  stats
  // was the get request successful
  show=false
  // how I keep track of which tab were on
  selected = new FormControl(0);
  // prefill the pie charts
  chartData:chart[][]=[
  [
    { labels:["Victories", "Top 10", "Top 25", "Other"], data:[0,0,0,1] },
    { labels:["Victories", "Top 5", "Top 12", "Other"], data:[0,0,0,1]  },
    { labels:["Victories", "Top 3", "Top 6", "Other"], data:[0,0,0,1]   }
  ],[
    { labels:["Victories", "Top 10", "Top 25", "Other"], data:[0,0,0,1] },
    { labels:["Victories", "Top 5", "Top 12", "Other"], data:[0,0,0,1]  },
    { labels:["Victories", "Top 3", "Top 6", "Other"], data:[0,0,0,1]   }
  ],[
    { labels:["Victories", "Top 10", "Top 25", "Other"], data:[0,0,0,1] },
    { labels:["Victories", "Top 5", "Top 12", "Other"], data:[0,0,0,1]  },
    { labels:["Victories", "Top 3", "Top 6", "Other"], data:[0,0,0,1]   }
  ]
]
  // array of tabs
  views = [
    { title: "PC", iconLink: "https://image.flaticon.com/icons/svg/33/33418.svg"  },
    { title: "Xbox", iconLink: "https://image.flaticon.com/icons/svg/1/1321.svg"  },
    { title: "PS4", iconLink: "https://image.flaticon.com/icons/svg/34/34221.svg" }
  ]
  constructor(private dialogRef: MatDialogRef<ProfileModalComponent>, 
                    @Inject(MAT_DIALOG_DATA) public data: any,
                    private fortniteAPI: FortniteApiService) { 
    // log the id we sent 
    console.log(this.data.ID)
    // send id
    this.getStats()
  }

  ngOnInit() {

  }
  getStats(){
    // call the service
    this.fortniteAPI.callFortniteAPI(this.onResponse.bind(this), this.data.ID)
  }
  onResponse(stats){
    // when i recieve the player stats i hold it
    this.stats=stats
    // i wanted to find the users primary gaming platform
    var bestScore = -1
    for (var i = 0; i < 3; i++) {
      if (stats[i].object==null||stats[i].object.totals.score==0){
        //stats not there, leave empty
        this.buts[i]=true
      } else{
        // populate pie charts
        var other =stats[i].object.stats.matchesplayed_solo-stats[i].object.stats.placetop1_solo-stats[i].object.stats.placetop10_solo-stats[i].object.stats.placetop25_solo
        this.chartData[i][0].data=[stats[i].object.stats.placetop1_solo,stats[i].object.stats.placetop10_solo,stats[i].object.stats.placetop25_solo, other]
        other =stats[i].object.stats.matchesplayed_duo-stats[i].object.stats.placetop1_duo-stats[i].object.stats.placetop5_duo-stats[i].object.stats.placetop12_duo
        this.chartData[i][1].data=[stats[i].object.stats.placetop1_duo,stats[i].object.stats.placetop5_duo,stats[i].object.stats.placetop12_duo, other]
        other =stats[i].object.stats.matchesplayed_squad-stats[i].object.stats.placetop1_squad-stats[i].object.stats.placetop3_squad-stats[i].object.stats.placetop6_squad
        this.chartData[i][2].data=[stats[i].object.stats.placetop1_squad,stats[i].object.stats.placetop3_squad,stats[i].object.stats.placetop6_squad, other]
        // primary gaming platform based on "score"
        if(bestScore<stats[i].object.totals.score){
          this.selected.setValue(i)
        }
      }
    }
    // if any platforms are found, exit loading screen
    if (!(this.buts[0]&&this.buts[1]&&this.buts[2])){
      this.show=true
    }
  }

}
