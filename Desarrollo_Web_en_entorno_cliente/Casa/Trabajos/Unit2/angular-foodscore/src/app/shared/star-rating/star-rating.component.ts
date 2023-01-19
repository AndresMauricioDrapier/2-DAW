import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
    selector: "fs-star-rating",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./star-rating.component.html",
    styleUrls: ["./star-rating.component.css"],
})
export class StarRatingComponent implements OnInit, OnChanges {
    @Input() rating!: number;
    @Output() changed = new EventEmitter<number>();
    auxRating!: number;

    ngOnInit(): void {
        this.auxRating = this.rating;
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.auxRating = this.rating;
    }

    setRating(newRating: number) {
        this.changed.emit(newRating);
    }
}
