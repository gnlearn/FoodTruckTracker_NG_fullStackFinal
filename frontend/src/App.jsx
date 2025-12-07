import { useState, useEffect, useRef } from 'react';
import './App.css';
import { getTrucks, createTruck, updateTruck, deleteTruck } from './api/trucks';

import '@tomtom-international/web-sdk-maps/dist/maps.css';
import mapSDK from '@tomtom-international/web-sdk-maps';


function App() {
  const apiKey = import.meta.env.VITE_TOMTOM_API_KEY;
  const mapContainer = useRef();
  const [map, setMap] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(10);
  const mapRef = useRef(null);

  const [activeTab, setActiveTab] = useState('trucks');
  const [trucks, setTrucks] = useState([])
  const [truckName, setTruckName] = useState('');
  const [cuisineType, setCuisineType] = useState('');
  const [description, setDescription] = useState('');
  const [openTime, setOpenTime] = useState('');
  const [closeTime, setCloseTime] = useState('');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadTrucks();
  }, []);

  // TomTom Map display
  useEffect(() => {
    if (activeTab !== 'User') {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      return;
    }

    if (!mapContainer.current || mapRef.current) return;

    const markerCoords = [-122.4194, 37.7749]; // TRUCKK INPUT
    const ourMap = mapSDK.map({
      key: apiKey,
      container: mapContainer.current,
      center: markerCoords,
      zoom: zoomLevel,
    });
    mapRef.current = ourMap;

    const fitToMarkerAndUser = (userLngLat) => {
      const bounds = new mapSDK.LngLatBounds();
      bounds.extend(markerCoords);
      bounds.extend(userLngLat);
      ourMap.fitBounds(bounds, { padding: 80, maxZoom: 14, duration: 800 });
    };

    const geo = new mapSDK.GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: true,
      showAccuracyCircle: true,
    });
    ourMap.addControl(geo, 'top-left');
    geo.trigger();
    geo.on('geolocate', (pos) => {
      const userCoords = [pos.coords.longitude, pos.coords.latitude];
      fitToMarkerAndUser(userCoords); 
    });

    new mapSDK.Marker().setLngLat(markerCoords).addTo(ourMap);

    return () => {
      ourMap.remove();
      mapRef.current = null;
    };
  }, [activeTab, apiKey, zoomLevel]);

  const loadTrucks = async () => {
    try {
      setLoading(true);
      const data = await getTrucks();
      setTrucks(data);
    } catch (err) {
      console.error('Error loading trucks:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleAddTruck = async (e) => {
    e.preventDefault();
    if (!truckName.trim() || !cuisineType.trim() || !description.trim()) return;

    try {
      const newTruck = await createTruck({
        truckName: truckName.trim(),
        cuisineType: cuisineType.trim(),
        description: description.trim(),
        openTime: openTime,
        closeTime: closeTime,
        longitude: 0,
        latitude: 0,
        ownerID: 1234
      });

      setTrucks([...trucks, newTruck]);

      setTruckName('');
      setCuisineType('');
      setDescription('');
      setOpenTime('');
      setCloseTime('');

    } catch (err) {
      console.error('Error adding truck:', err);
    }
  }
  
  if (loading) {
    return (
      <div className="app loading">
        <div className="spinner"></div>
        <p>Loading trucks...</p>
      </div>
    );
  }

  const handleDeleteTruck = async (truckID) => {
    try {
      
      await deleteTruck(truckID);
      
      setTrucks(trucks.filter(t => t._id !== truckID));
      
    
    } catch (err) {
      console.error('Error deleting truck:', err);
      setError('Failed to delete truck');
    }
  };
  

  return (
    <div className="app">
      

      <header>
        <h1>Food Truck Tracker</h1>
        <nav className="tabs">
          <button 
            className={`tab-btn ${activeTab === 'trucks' ? 'active' : ''}`}
            onClick={() => setActiveTab('trucks')}
          >
            Trucks
          </button>
          <button 
            className={`tab-btn ${activeTab === 'User' ? 'active' : ''}`}
            onClick={() => setActiveTab('User')}
          >
            User
          </button>
        </nav>
      </header>

      <div className="main-content">
        {activeTab === 'trucks' && (
          <>
        <div className="left-content">
          <h2>Your Trucks</h2>
          {trucks.map(truck => <div key={truck._id} className ="listing"> 
            
            <div style={{display: "flex", justifyContent: "space-between"}}>
              <h3>{ truck.truckName } </h3>
              <button onClick={() => handleDeleteTruck(truck._id)}>X</button>
            </div>
            <p>{ truck.description }</p>
            <p>{ truck.cuisineType }</p>
            <p>{ truck.openTime } - { truck.closeTime }</p>
          
            
      
          </div>)}

        </div>
        <div className="right-content">
          <form onSubmit={handleAddTruck} className="addTruckForm">
            <h2>Add a New Truck</h2>
            <p>
              Enter Truck Name:
            </p>
            <input 
            type="text" 
            className = "truckInput" 
            value={truckName}
            onChange={e => setTruckName(e.target.value)}/>

            <p>
              Cuisine Type (use commas to separate):
            </p>
            <input 
            type="text"
            placeholder="e.g. Mexican, Chinese, Italian" 
            className = "truckInput" 
            value={cuisineType}
            onChange={e => setCuisineType(e.target.value)}/>

            <p>
              Description:
            </p>
            <textarea 
            name="Description" 
            className = "truckInput" 
            placeholder='Tell customers about your truck!' 
            rows={6}
            value={description}
            onChange={e => setDescription(e.target.value)}></textarea>
            

            <p>Open Time:</p>
            <select name="openTime" value={openTime} onChange={e => setOpenTime(e.target.value)}>
              <option value="12:00 AM">12:00 AM</option>
              <option value="1:00 AM">1:00 AM</option>
              <option value="2:00 AM">2:00 AM</option>
              <option value="3:00 AM">3:00 AM</option>
              <option value="4:00 AM">4:00 AM</option>
              <option value="5:00 AM">5:00 AM</option>
              <option value="6:00 AM">6:00 AM</option>
              <option value="7:00 AM">7:00 AM</option>
              <option value="8:00 AM">8:00 AM</option>
              <option value="9:00 AM">9:00 AM</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="11:00 AM">11:00 AM</option>
              <option value="12:00 PM">12:00 PM</option>
              <option value="1:00 PM">1:00 PM</option>
              <option value="2:00 PM">2:00 PM</option>
              <option value="3:00 PM">3:00 PM</option>
              <option value="4:00 PM">4:00 PM</option>
              <option value="5:00 PM">5:00 PM</option>
              <option value="6:00 PM">6:00 PM</option>
              <option value="7:00 PM">7:00 PM</option>
              <option value="8:00 PM">8:00 PM</option>
              <option value="9:00 PM">9:00 PM</option>
              <option value="10:00 PM">10:00 PM</option>
              <option value="11:00 PM">11:00 PM</option>
            </select>

            <p>Close Time:</p>
            <select name="closeTime" value={closeTime} onChange={e => setCloseTime(e.target.value)}>
              <option value="12:00 AM">12:00 AM</option>
              <option value="1:00 AM">1:00 AM</option>
              <option value="2:00 AM">2:00 AM</option>
              <option value="3:00 AM">3:00 AM</option>
              <option value="4:00 AM">4:00 AM</option>
              <option value="5:00 AM">5:00 AM</option>
              <option value="6:00 AM">6:00 AM</option>
              <option value="7:00 AM">7:00 AM</option>
              <option value="8:00 AM">8:00 AM</option>
              <option value="9:00 AM">9:00 AM</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="11:00 AM">11:00 AM</option>
              <option value="12:00 PM">12:00 PM</option>
              <option value="1:00 PM">1:00 PM</option>
              <option value="2:00 PM">2:00 PM</option>
              <option value="3:00 PM">3:00 PM</option>
              <option value="4:00 PM">4:00 PM</option>
              <option value="5:00 PM">5:00 PM</option>
              <option value="6:00 PM">6:00 PM</option>
              <option value="7:00 PM">7:00 PM</option>
              <option value="8:00 PM">8:00 PM</option>
              <option value="9:00 PM">9:00 PM</option>
              <option value="10:00 PM">10:00 PM</option>
              <option value="11:00 PM">11:00 PM</option>
            </select>

            <div>
              <button type="submit" className="add-button">
                  Add Task
              </button>
            </div>
          </form>
          
        </div>
        </>
        )}

        {activeTab === 'User' && (
          <div className="user-page">
            <h2>User</h2>
            <p>User content goes here</p>
            
            <div ref={mapContainer} className="routeMapDemo" />
            
          </div>
        )}

      </div>


    </div>
  // State management
  

  // Load trucks from database on mount
  

  /**
   * Fetch all trucks from backend
   */
  

  /**
   * Add a new truck
   */
  

  

  /**
   * Delete truck listing
   */
  

  // Loading state

);}

export default App;