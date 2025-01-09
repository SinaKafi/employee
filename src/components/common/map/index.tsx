import maplibregl, { Map as MapGl } from "maplibre-gl";
import { useEffect, useRef, useState } from "react";
import { Box } from "@chakra-ui/react";
import useDebounceEffect from "@/hooks/useDeboounceEffect";

interface LocationInterface {
  lat: number;
  lng: number;
}
let isRTLTextPluginLoaded = false; // Global variable to ensure the plugin is initialized only once

export default function Map({
  initialLocation,
  onLocationChange,
}: {
  initialLocation: LocationInterface;
  onLocationChange: (location: LocationInterface) => void;
}) {
  const locationMarker = {
    lat: 35.69991936732264,
    lng: 51.33857491535399,
  };

  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<MapGl | null>(null);
  const [dragLocation, setDragLocation] = useState<LocationInterface>({
    ...locationMarker,
    ...initialLocation,
  });

  useEffect(() => {
    if (!isRTLTextPluginLoaded) {
      maplibregl.setRTLTextPlugin(
        "https://unpkg.com/@mapbox/mapbox-gl-rtl-text@0.2.3/mapbox-gl-rtl-text.min.js",
        () => {},
        true
      );
      isRTLTextPluginLoaded = true; // Mark as initialized
    }
  }, []); // Empty dependency ensures it runs only once

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    const app = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://map.ir/vector/styles/main/mapir-xyz-style.json",
      center: [dragLocation.lng, dragLocation.lat],
      zoom: 14,
      maxZoom: 18,
      transformRequest: (url) => ({
        url,
        headers: { "x-api-key": import.meta.env.VITE_API_MAP_KEY },
      }),
    });

    app.on("drag", () => {
      const center = app.getCenter();
      setDragLocation({ lng: center.lng, lat: center.lat });
    });

    map.current = app;
  }, [initialLocation]);

  useEffect(() => {
    if (map.current) {
      map.current.flyTo({
        center: [initialLocation.lng, initialLocation.lat],
        essential: true,
      });
    }
  }, [initialLocation]);

  useDebounceEffect(
    () => {
      onLocationChange(dragLocation);
    },
    [dragLocation],
    300
  );

  return (
    <div className=" w-full h-[60vh] min-h-full relative">
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        background="transparent"
        zIndex={1}
      >
        <img
          src="https://raw.githubusercontent.com/amahdavii/map-icon/master/marker-icon.png"
          alt="marker"
          width="40"
          height="40"
        />
      </Box>

      <div
        ref={mapContainer}
        className="!absolute min-h-full max-h-full w-full"
      />
    </div>
  );
}
