import { useCallback, useEffect, useRef } from 'react';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import mapSDK from '@tomtom-international/web-sdk-maps';

function TruckMap({
  activeTab,
  apiKey,
  zoomLevel,
  trucks,
  setFocusTruck,
  setUserCoords,
}) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const suppressAutoFitRef = useRef(false);

  //initialize map in user view
  useEffect(() => {
    if (activeTab !== 'User') {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      return;
    }

    //only initialize map once
    if (!mapContainerRef.current || mapRef.current) return;

    //create map
    const ourMap = mapSDK.map({
      key: apiKey,
      container: mapContainerRef.current,
      center: [-93.609114, 41.60054],
      zoom: zoomLevel,
    });
    mapRef.current = ourMap;

    //force map to show all trucks and user location in same view
    const fitToMarkerAndUser = (userLngLat) => {
      if (!userLngLat) return;
      const bounds = new mapSDK.LngLatBounds();
      trucks.forEach(({ longitude, latitude }) => {
        bounds.extend([longitude, latitude]);
      });
      bounds.extend(userLngLat);
      ourMap.fitBounds(bounds, { padding: 80, maxZoom: 14, duration: 800 });
    };

    //find user location and update map
    const handleGeolocate = (pos) => {
      const coords = [pos.coords.longitude, pos.coords.latitude];
      setUserCoords(coords);
      if (suppressAutoFitRef.current) return;
      fitToMarkerAndUser(coords);
    };

    //request user location
    const requestLocation = () => {
      if (!navigator?.geolocation) return;
      navigator.geolocation.getCurrentPosition(handleGeolocate, () => {});
    };

    //add geolocate control to map
    const geo = new mapSDK.GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: true,
      showAccuracyCircle: true,
    });

    //listen for user location updates
    geo.on('geolocate', handleGeolocate);
    ourMap.addControl(geo, 'top-left');
    
    if (ourMap.loaded()) {
      requestLocation();
    } else {
      ourMap.on('load', requestLocation);
    }

    //add truck markers to map
    trucks.forEach(({ longitude, latitude }) => {
      const emoji = document.createElement('div');
      emoji.innerHTML = '🚐';
      emoji.style.fontSize = '40px';
      emoji.style.cursor = 'pointer';
      new mapSDK.Marker({ element: emoji }).setLngLat([longitude, latitude]).addTo(ourMap);
    });

    return () => {
      //clean up
      geo.off('geolocate', handleGeolocate);
      ourMap.removeControl(geo);
      ourMap.remove();
      mapRef.current = null;
      ourMap.off('load', requestLocation);
    };
  }, [activeTab, apiKey, zoomLevel, trucks, setUserCoords]);

  //clicking on truck listing zooms to truck on map
  const zoomToTruckOnMap = useCallback(
    (truck) => {
      if (!mapRef.current) return;
      suppressAutoFitRef.current = true;
      mapRef.current.flyTo({ center: [truck.longitude, truck.latitude], zoom: 14 });
      setFocusTruck(truck);
      const onMoveEnd = () => {
        suppressAutoFitRef.current = false;
        mapRef.current?.off('moveend', onMoveEnd);
      };
      mapRef.current.on('moveend', onMoveEnd);
    },
    [setFocusTruck],
  );

  //make zoomToTruckOnMap available to be called from outside
  useEffect(() => {
    TruckMap.zoomToTruck = zoomToTruckOnMap;
    return () => {
      if (TruckMap.zoomToTruck === zoomToTruckOnMap) {
        TruckMap.zoomToTruck = undefined;
      }
    };
  }, [zoomToTruckOnMap]);

  return <div ref={mapContainerRef} className="routeMapDemo" />;
}

export default TruckMap;