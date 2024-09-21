import React, { useState, useEffect } from 'react';
import './ParkingLot.css';
import axios from 'axios';

const ParkingLot = () => {
    const [slots, setSlots] = useState([]);

    useEffect(() => {
        // Fetch parking slots from the backend
        const fetchSlots = async () => {
            try {
                const response = await axios.get('/api/parking/status');
                setSlots(response.data);
            } catch (error) {
                console.error('Error fetching parking slots:', error);
            }
        };

        fetchSlots();
    }, []);

    const handleBookSlot = async (slotId) => {
        try {
            const response = await axios.post('/api/parking/book', { slotId, vehicleNumber: 'ABC123' });
            if (response.status === 200) {
                // Update the slot status in the state
                setSlots(slots.map(slot => slot.slotId === slotId ? { ...slot, isOccupied: true } : slot));
            }
        } catch (error) {
            console.error('Error booking slot:', error);
        }
    };

    return (
        <div className="parking-lot">
            <h1>Parking Lot</h1>
            <div className="slots-grid">
                {slots.map(slot => (
                    <div
                        key={slot.slotId}
                        className={`slot ${slot.isOccupied ? 'occupied' : 'available'}`}
                        onClick={() => !slot.isOccupied && handleBookSlot(slot.slotId)}
                    >
                        {slot.isOccupied ? 'Occupied' : 'Available'}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ParkingLot;