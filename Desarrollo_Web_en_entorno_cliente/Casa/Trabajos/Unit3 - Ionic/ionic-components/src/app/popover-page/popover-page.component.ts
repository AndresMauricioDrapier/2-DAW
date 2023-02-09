import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, PopoverController } from '@ionic/angular';
import { PopoverContentComponent } from './popover-content/popover-content.component';

@Component({
  selector: 'app-popover-page',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './popover-page.component.html',
  styleUrls: ['./popover-page.component.scss'],
})
export class PopoverPageComponent implements OnInit {
  color = '';

  constructor(private popoverCtrl: PopoverController) { }

  ngOnInit() {
  }

  async showPopover(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverContentComponent,
      componentProps: {
        title: 'Choose a color'
      },
      event
    });

    await popover.present();
    const resp = await popover.onDidDismiss();
    this.color = resp.data ? resp.data : 'No color selected';
    console.log(resp);
  }
}
