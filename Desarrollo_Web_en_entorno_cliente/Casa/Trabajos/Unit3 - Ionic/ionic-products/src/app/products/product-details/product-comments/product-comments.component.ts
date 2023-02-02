import { CommonModule } from '@angular/common';
import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule, AlertController } from '@ionic/angular';
import { Comment } from '../../interfaces/comment.interface';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-comments',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './product-comments.component.html',
  styleUrls: ['./product-comments.component.scss'],
})
export class ProductCommentsComponent implements OnInit {
  idProd!: number;
  comments!: Comment[];

  constructor(
    private alertCtrl: AlertController,
    private route: ActivatedRoute,
    private productService: ProductService,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.idProd = +this.route.snapshot.parent!.params['id'];
    this.productService
      .getComments(this.idProd)
      .subscribe(comments => (this.comments = comments));
  }

  async addComment() {
    const alert = await this.alertCtrl.create({
      header: 'New commment',
      inputs: [
        {
          name: 'comment',
          type: 'text',
          placeholder: 'Enter your comment'
        }
      ],
      buttons: [
        {
          text: 'Add',
          role: 'ok'
        },
        {
          role: 'cancel',
          text: 'Cancel'
        }
      ]
    });

    await alert.present();
    const result = await alert.onDidDismiss();

    if (result.role === 'ok') {
      this.productService
        .addComment(this.idProd, result.data.values.comment)
        .subscribe(comment => this.ngZone.run(() => this.comments.push(comment)));
    }
  }
}
