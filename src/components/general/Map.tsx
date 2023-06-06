import { Box } from "@chakra-ui/react";
import { useRef, useEffect } from "react";
import { useAllMonitoredGeoLocation } from "../../hooks/useAllMonitoredGeoLocation";
import loader from "../../utils/googleMapLoader";

type Map = {
  lat: number;
  lng: number;
  width: string;
  height: string;
};

const Map = ({ lat, lng, width, height }: Map): JSX.Element => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { monitoredGeoLocations } = useAllMonitoredGeoLocation();

  useEffect(() => {
    loader.load().then(async () => {
      const { Map } = (await google.maps.importLibrary(
        "maps"
      )) as google.maps.MapsLibrary;

      const map = new Map(mapRef.current!, {
        center: { lat, lng },
        zoom: 15,
        zoomControl: true,
        scaleControl: false,
      });

      new google.maps.Marker({
        position: { lat, lng },
        map: map,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 7,
          strokeColor: "#2BCCFC",
        },
      });

      monitoredGeoLocations.forEach((monitoredGeoLocation) => {
        const maker = new google.maps.Marker({
          position: {
            lat: monitoredGeoLocation.location._lat,
            lng: monitoredGeoLocation.location._long,
          },
          map: map,
          animation: google.maps.Animation.DROP,
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `
          <div>
            <p>Speed limit:${monitoredGeoLocation.speed_limit} km/hr</p>
            <p>Around ${monitoredGeoLocation.area}</p>
          </div>
          `,
        });
        infoWindow.open(map, maker);
      });
    });
  }, [lat, lng, monitoredGeoLocations]);

  return <Box ref={mapRef} width={width} height={height} />;
};

export default Map;
