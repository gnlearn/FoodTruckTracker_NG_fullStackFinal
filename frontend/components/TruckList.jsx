import { getDistance } from 'geolib';

function TruckList({ trucks, handleDeleteTruck, activeTab, userCoords, onTruckClick }) {
    const isUserView = activeTab === 'User';

    const formatDistance = (truck) => {
        if (!userCoords) return null;
        const miles =
            getDistance(
                { latitude: truck.latitude, longitude: truck.longitude },
                { latitude: userCoords[1], longitude: userCoords[0] },
            ) / 1609.344;
        return miles.toFixed(2);
    };

    return trucks.map((truck) => {
        const distanceMiles = isUserView ? formatDistance(truck) : null;
        const handleClick = isUserView && onTruckClick ? () => onTruckClick(truck) : undefined;
        const handleKeyDown = isUserView && onTruckClick
            ? (event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        onTruckClick(truck);
                    }
                }
            : undefined;

        return (
            <div
                key={truck._id}
                className="listing"
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                role={isUserView ? 'button' : undefined}
                tabIndex={isUserView ? 0 : undefined}
            >
                <div className="space">
                    <div className="inline">
                        <h3>{truck.truckName}</h3>
                        {!isUserView && (
                            <button type="button">
                                <i className="fa fa-pencil" />
                            </button>
                        )}
                    </div>
                    {!isUserView && (
                        <button
                            type="button"
                            onClick={(event) => {
                                event.stopPropagation();
                                handleDeleteTruck(truck._id);
                            }}
                        >
                            X
                        </button>
                    )}
                </div>
                <p>{truck.description}</p>
                <p>{truck.cuisineType}</p>
                <p>
                    {truck.openTime} - {truck.closeTime}
                </p>
                <p>{truck.address}</p>
                {isUserView && distanceMiles && <p>{distanceMiles} miles</p>}
            </div>
        );
    });
}

export default TruckList;