const API_URL = 'http://localhost:3001';

//get all trucks
export const getTrucks = async () => {
  const response = await fetch(`${API_URL}/trucks`);
  if (!response.ok) {
    throw new Error('Failed to fetch trucks');
  }
  return response.json();
};

//create a new truck
export const createTruck = async (truckData) => {
  const response = await fetch(`${API_URL}/trucks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(truckData),
  });
  if (!response.ok) {
    throw new Error('Failed to create truck');
  }
  return response.json();
};

//update a truck
export const updateTruck = async (id, updates) => {
  const response = await fetch(`${API_URL}/trucks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  if (!response.ok) {
    throw new Error('Failed to update truck');
  }
  return response.json();
};

//delete a truck
export const deleteTruck = async (id) => {
  const response = await fetch(`${API_URL}/trucks/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete truck');
  }
  return response.json();
};