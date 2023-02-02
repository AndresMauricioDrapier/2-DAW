import { Inject, Injectable, Optional } from "@angular/core";
import Graphic from "@arcgis/core/Graphic";
import MapView from "@arcgis/core/views/MapView";
import { ARCGIS_TOKEN } from "./arcgis-maps.config";

@Injectable({
    providedIn: "root",
})
export class LoadArcgisMapsService {
    constructor(@Optional() @Inject(ARCGIS_TOKEN) private token: string) {
        if (!token) {
            throw new Error(
                "LoadArcgisMapsService: You must call provideArgisToken in your providers array"
            );
        }
        import("@arcgis/core/config").then(
            (config) => (config.default.apiKey = token)
        );
    }

    async getMapView(
        mapDiv: HTMLDivElement,
        coords: { latitude: number; longitude: number },
        zoom = 14
    ): Promise<MapView> {
        const { default: Map } = await import("@arcgis/core/Map");
        const map = new Map({ basemap: "osm-streets-relief" });
        const { default: MapView } = await import("@arcgis/core/views/MapView");
        return new MapView({
            map: map,
            center: [coords.longitude, coords.latitude],
            zoom: zoom,
            container: mapDiv,
        });
    }

    async getMarker(
        mapView: MapView,
        coords: { latitude: number; longitude: number },
        color = "red"
    ) : Promise<Graphic> {
        const { default: Graphic } = await import("@arcgis/core/Graphic");
        const { Point } = await import("@arcgis/core/geometry");
        const { default: SimpleMarkerSymbol } = await import(
            "@arcgis/core/symbols/SimpleMarkerSymbol"
        );
        const pointGraphic = new Graphic({
            geometry: new Point({
                longitude: coords.longitude,
                latitude: coords.latitude,
            }),
            symbol: new SimpleMarkerSymbol({
                color: color,
            }),
        });

        // Add the graphics to the view's graphics layer
        mapView.graphics.add(pointGraphic);

        return pointGraphic;
    }

    async getSearch(mapView: MapView, position: string) {
        const { default: Search } = await import("@arcgis/core/widgets/Search");
        const search = new Search({
            view: mapView,
            popupEnabled: false,
        });
        mapView.ui.add(search, position);
        return search;
    }
}
