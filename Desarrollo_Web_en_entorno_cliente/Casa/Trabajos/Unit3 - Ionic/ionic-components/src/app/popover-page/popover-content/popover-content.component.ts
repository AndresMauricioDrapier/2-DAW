import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover-content',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './popover-content.component.html',
  styleUrls: ['./popover-content.component.scss'],
})
export class PopoverContentComponent implements OnInit {
  @Input() title!: string;

  constructor(private popoverCtrl: PopoverController) { }

  ngOnInit() {}

  close(color: string) {
    this.popoverCtrl.dismiss(color);
  }
}
