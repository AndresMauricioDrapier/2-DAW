import { CommonModule } from '@angular/common';
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  IonicModule,
  AlertController,
  Platform,
  IonRefresher,
} from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Commentary } from '../../interfaces/comment';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-restaurant-comments',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './restaurant-comments.component.html',
  styleUrls: ['./restaurant-comments.component.scss'],
})
export class RestaurantCommentsComponent implements OnInit, OnDestroy {
  idProd!: number;
  comments!: Commentary[];
  resumeSub!: Subscription;

  newComment: Commentary = {
    stars: 0,
    text: '',
  };
  commented = false;

  constructor(
    private alertCtrl: AlertController,
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private platform: Platform,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.loadComments();
    this.resumeSub = this.platform.resume.subscribe(() =>
      this.ngZone.run(() => this.loadComments())
    );
  }

  ngOnDestroy(): void {
    this.resumeSub.unsubscribe();
  }

  loadComments(refresher?: IonRefresher) {
    this.idProd = +this.route.snapshot.parent!.params['id'];
    this.restaurantService.getComments(this.idProd).subscribe((comments) => {
      this.comments = comments.comments;
      refresher?.complete();
    });
  }

  async addComment() {
    const alert = await this.alertCtrl.create({
      header: 'New commment',
      inputs: [
        {
          name: 'comment',
          type: 'text',
          placeholder: 'Enter your comment',
        },
        {
          name: 'stars',
          type: 'number',
          placeholder: 'Stars (0-5)',
        },
      ],
      buttons: [
        {
          text: 'Add',
          role: 'ok',
        },
        {
          role: 'cancel',
          text: 'Cancel',
        },
      ],
    });

    await alert.present();
    const result = await alert.onDidDismiss();

    if (result.role === 'ok') {
      this.newComment.text = result.data.values.comment;
      this.newComment.stars = +result.data.values.stars;

      this.restaurantService
        .addComment(this.idProd, this.newComment)
        .subscribe((comment) => this.comments.push(comment));
    }
  }
}
