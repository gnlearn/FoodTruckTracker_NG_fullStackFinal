import { useState, useEffect } from 'react';
import './App.css';
import { getTrucks, createTruck, updateTruck, deleteTruck } from './api/trucks';

function App() {
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
      </header>

      <div className="main-content">
        <div className="left-content">
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
              Truck Name:
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