function TruckPopup({ focusTruck, setFocusTruck }) {
    return (focusTruck && (
        <div className="focusTruckPopUp">
        <div className="container" style={{position: "relative"}}>
            <button onClick={() => setFocusTruck(null)} style={{position: "absolute",
            top: "8px",
            right: "16px",
            fontSize: "20px",
            }}>X</button>
            <img src="https://tse3.mm.bing.net/th/id/OIP._6E-STFojnnJePRtRlELcgHaFj?rs=1&pid=ImgDetMain&o=7&rm=3" alt="food truck" width="100%"/>
        </div>
        <h2>{focusTruck.truckName}</h2>
        <p>4 ⭐⭐⭐⭐ (24) • $$ </p>
        <p>{ focusTruck.cuisineType }</p>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <button>Overview</button>
            <button>Menu</button>
            <button>Reviews</button>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <button><i className="fa fa-car"></i></button>
            <button><i className='fa fa-bookmark'></i></button>
            <button><i className="fa fa-share"></i></button>
        </div>
        </div>
        ))
    ;
    }
export default TruckPopup;