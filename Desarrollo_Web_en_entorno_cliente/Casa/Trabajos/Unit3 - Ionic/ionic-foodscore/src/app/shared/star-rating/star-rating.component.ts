import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

@Component({
    selector: "fs-star-rating",
    standalone: true,
    imports: [CommonModule,IonicModule],
    templateUrl: "./star-rating.component.html",
    styleUrls: ["./star-rating.component.css"],
})
export class StarRatingComponent implements OnInit, OnChanges {
    @Input() rating!: number;
    @Input() edit!: boolean;
    @Output() changed = new EventEmitter<number>();
    auxRating!: number;

    ngOnInit(): void {
        this.auxRating = this.rating;
    }

    ngOnChanges(): void {
        this.auxRating = this.rating;
    }

    setRating(newRating: number): void {
        this.changed.emit(newRating);
    }
}
