import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActionSheetController, IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-action-sheet-page',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './action-sheet-page.component.html',
  styleUrls: ['./action-sheet-page.component.scss'],
})
export class ActionSheetPageComponent implements OnInit {
  constructor(public actionSheetController: ActionSheetController) { }

  ngOnInit() {
  }

  async showAction() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Share',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Play',
        icon: 'play-circle',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Favorite',
        icon: 'heart',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }


}
