import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Restaurant } from "../interfaces/restaurant";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { RestaurantCardComponent } from "../restaurant-card/restaurant-card.component";
import { ArcgisMapComponent } from "src/app/shared/maps/arcgis-map/arcgis-map.component";
import { ArcgisMarkerDirective } from "src/app/shared/maps/arcgis-marker/arcgis-marker.directive";
import { ArcgisSearchDirective } from "src/app/shared/maps/arcgis-search/arcgis-search.directive";
import { RestaurantService } from "../services/restaurant.service";
import { Commentary } from "../interfaces/comment";
import {
    FormControl,
    FormGroup,
    NonNullableFormBuilder,
    ReactiveFormsModule,
} from "@angular/forms";
import { StarRatingComponent } from "src/app/shared/star-rating/star-rating.component";

@Component({
    selector: "fs-restaurant-details",
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        RestaurantCardComponent,
        ArcgisMapComponent,
        ArcgisMarkerDirective,
        ArcgisSearchDirective,
        ReactiveFormsModule,
        StarRatingComponent,
        ReactiveFormsModule,
    ],
    templateUrl: "./restaurant-details.component.html",
    styleUrls: ["./restaurant-details.component.css"],
})
export class RestaurantDetailsComponent implements OnInit {
    restaurant!: Restaurant;
    comments!: Commentary[];

    newComment: Commentary = {
        stars: 0,
        text: "",
    };

    commentGroup!: FormGroup;
    commentControl!: FormControl<string>;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private readonly http: RestaurantService,
        private readonly fb: NonNullableFormBuilder
    ) {}

    ngOnInit(): void {
        this.route.data.subscribe((data) => {
            this.restaurant = data["restaurant"];
        });
        this.http.getComments(this.restaurant.id!).subscribe((comment) => {
            this.comments = comment.comments;
        });

        this.commentGroup = this.fb.group({
            commentary: (this.commentControl = this.fb.control("")),
        });
    }

    goBack(): void {
        this.router.navigate(["/restaurants"]);
    }

    delete(): void {
        this.router.navigate(["/restaurants"]);
    }
    submitComment(): void {
        this.newComment.text = this.commentControl.value;
        this.http.addComment(this.restaurant.id!, this.newComment).subscribe({
            next: () => console.log("All good"),
            error: (e) => console.log(e),
        });
    }

    setRating(newRating: number): void {
        this.newComment.stars = newRating;
    }
}
