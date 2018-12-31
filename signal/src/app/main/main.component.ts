import { ViewChild, Component, OnInit } from '@angular/core';
import { FortniteStatsService } from '../services/fortniteStats/fortnite-stats.service'
import { ProfileModalComponent } from '../profile-modal/profile-modal.component'
import { DenialModalComponent } from '../denial-modal/denial-modal.component'
import { FormControl, Validators, NgForm, FormGroup } from '@angular/forms';  
import { MatPaginator, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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

// placeholder for table
const ELEMENT_DATA: row[] = [
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

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  // these are used to present and sort the data for the table
  displayedColumns: string[] =   ['Name','KDRatio','Kills','Wins','Matches','Winrate','Score'  ];
  columnTitles: string[] =   ['Name','K/D Ratio','Kills','Wins','Matches','Winrate','Score'  ];
  columnDropdownTitles: string[] =   ['K/D Ratio','Kills','Wins','Matches','Winrate','Score'  ];
  sortCol = ["kd","kills","matches","score","winrate","wins"]
  gameMode = ["Overall","Solo","Duo","Squad"]
  platform = ["PC","Xbox One","PS4"]
  // prepopulating the data
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  // used to concatenate new info with old
  rawSource
  // array of dropdown selections
  selection
  // current page number
  page
  // form tracking for custom entries
  customIDEntryForm = new FormGroup({
    epicID: new FormControl('', Validators.required),
  }); 
  // getting the paginator
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor( private FSService: FortniteStatsService, public dialog: MatDialog ) {
    //preset it to K/D Ratio, Overall, and Xbox One
    this.selection = [0,0,1]
    //autopopulate the table
    this.getFirstFSPage()
  }


  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
  getFirstFSPage(){
    // reset the page
    this.page=0
    // get the first page of the new leaderboard from fortnite stats website
    this.FSService.callFS(this.onFSLoad.bind(this), this.page, this.selection[0], this.selection[1], this.selection[2])
  }
  getnextFSPage(){
    // set to the next page
    this.page++
    // get the next page of the new leaderboard from fortnite stats website
    this.FSService.callFS(this.onNextFSLoad.bind(this), this.page, this.selection[0], this.selection[1], this.selection[2])
  }
  onFSLoad(list){
    // set the new list once its been recieved
    this.rawSource=list
    this.dataSource = new MatTableDataSource(this.rawSource);
    this.dataSource.paginator = this.paginator;
  }
  onNextFSLoad(list){
    // add to the new list once its been recieved
    this.rawSource.push.apply(this.rawSource, list)
    this.dataSource = new MatTableDataSource(this.rawSource);
    this.dataSource.paginator = this.paginator;
  }
  public pageEv(i, size, length){
    // decides whether we should load the next page now or not based on if we can populate the next page
    var last = (i+1)*size
    console.log(last)
    console.log(length)
    if (last+size>=length){
      this.getnextFSPage()
    }
  }
  openModal(epicID){
    // search based on the given id, either table click or search
    const dialogRef = this.dialog.open(ProfileModalComponent, {
      width: '750px',
      data: {ID: epicID}
    });
  }
  customIDEntry(){
    var epicID = this.customIDEntryForm.value.epicID // get the custom entry
    if (epicID.length>3){//dont search under 4 letters
      this.openModal(epicID)
    }
    else{
      const dialogRef = this.dialog.open(DenialModalComponent, {
        width: '250px',
      });
    }

  }

}
