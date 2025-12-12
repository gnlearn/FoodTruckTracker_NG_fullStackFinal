function AddingTruck({
  handleAddTruck,
  setMakeTruckForm,
  truckName,
  setTruckName,
  cuisineType,
  setCuisineType,
  description,
  setDescription,
  openTime,
  setOpenTime,
  closeTime,
  setCloseTime,
  truckAddress,
  setTruckAddress,
}) {
    return (
        //form for adding truck, displayed on right side
        <div className="right-content">
            <form onSubmit={handleAddTruck} className="addTruckForm">
            <div className="space">
                <h2>Add a New Truck</h2>
                <button onClick={() => setMakeTruckForm(false)}>X</button>
            </div>
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

            <p>
                Enter Truck Address:
            </p>
            <input 
            type="text" 
            className = "truckInput"
            placeholder ="123 Main St, City, State ZIP" 
            value={truckAddress}
            onChange={e => setTruckAddress(e.target.value)}/>

            <div>
                <button type="submit" className="add-button">
                    Add Truck
                </button>
            </div>
            </form>
        </div>
    )}

export default AddingTruck;