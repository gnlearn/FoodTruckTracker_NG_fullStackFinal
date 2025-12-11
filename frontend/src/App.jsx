import { useState, useEffect } from 'react';
import './App.css';
import { getTrucks, createTruck, updateTruck, deleteTruck } from './api/trucks';

import 'font-awesome/css/font-awesome.min.css'; 
import AddingTruck from '../components/AddingTruck.jsx';
import TruckList from '../components/TruckList.jsx';
import TruckMap from '../components/TruckMap.jsx';
import TruckPopup from '../components/TruckPopup.jsx';

function App() {
  const apiKey = import.meta.env.VITE_TOMTOM_API_KEY;
  
  const [zoomLevel, setZoomLevel] = useState(10);
  const [userCoords, setUserCoords] = useState(null);
  const [activeTab, setActiveTab] = useState('trucks');
  const [trucks, setTrucks] = useState([])
  const [truckName, setTruckName] = useState('');
  const [cuisineType, setCuisineType] = useState('');
  const [description, setDescription] = useState('');
  const [openTime, setOpenTime] = useState('');
  const [closeTime, setCloseTime] = useState('');
  const [loading, setLoading] = useState(true);
  const [truckAddress, setTruckAddress] = useState('');
  const [focusTruck, setFocusTruck] = useState('');
  const [makeTruckForm, setMakeTruckForm] = useState('');
  
  useEffect(() => {
    loadTrucks();
  }, []);
  
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

  // TomTom Map display
  
  const handleTruckClick = (truck) => {
    TruckMap.zoomToTruck?.(truck);
  };

  const handleAddTruck = async (e) => {
    e.preventDefault();
    if (!truckName.trim() || !cuisineType.trim() || !description.trim()) return;

    try {
      const res = await fetch('https://api.tomtom.com/search/2/geocode/' + encodeURIComponent(truckAddress.trim()) + '.json?key=' + apiKey);
      const data = await res.json();
            
      
      const newTruck = await createTruck({
        truckName: truckName.trim(),
        cuisineType: cuisineType.trim(),
        description: description.trim(),
        openTime: openTime,
        closeTime: closeTime,
        longitude: data.results[0].position.lon,
        latitude: data.results[0].position.lat,
        address: truckAddress.trim(),
        ownerID: 1234
      });

      setTrucks([...trucks, newTruck]);

      setTruckName('');
      setCuisineType('');
      setDescription('');
      setOpenTime('');
      setCloseTime('');
      setTruckAddress('');

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
          <h1>Food Truck Tracker</h1>
        <div className="inline">
        <div className="left-content">
          <div className="inline">
            <h2>Your Trucks</h2>
            <button onClick={() => setMakeTruckForm(true)}><i className="fa fa-plus"></i></button>
          </div>
            <TruckList trucks={trucks} handleDeleteTruck={handleDeleteTruck}/>
          
        </div>
        {makeTruckForm && (<AddingTruck
          handleAddTruck={handleAddTruck}
          setMakeTruckForm={setMakeTruckForm}
          truckName={truckName}
          setTruckName={setTruckName}
          cuisineType={cuisineType}
          setCuisineType={setCuisineType}
          description={description}
          setDescription={setDescription}
          openTime={openTime}
          setOpenTime={setOpenTime}
          closeTime={closeTime}
          setCloseTime={setCloseTime}
          truckAddress={truckAddress}
          setTruckAddress={setTruckAddress}
        />)}
        </div>
        
        </>
        )}

        {activeTab === 'User' && (


          
          <div className="user-page">
            <div className="user-sidebar">
            <TruckList trucks={trucks} handleDeleteTruck={handleDeleteTruck} activeTab={activeTab} userCoords={userCoords} onTruckClick={handleTruckClick}/>
            
            </div>
            <h1>Food Truck Tracker</h1>
            <TruckPopup 
            focusTruck={focusTruck} 
            setFocusTruck={setFocusTruck}/>

            <TruckMap 
              activeTab={activeTab} 
              apiKey={apiKey} 
              zoomLevel={zoomLevel} 
              trucks={trucks} 
              
              setFocusTruck={setFocusTruck} 
              
              setUserCoords={setUserCoords} 
              />
            
            
          </div>
        )}

      </div>

    </div>

);}

export default App;