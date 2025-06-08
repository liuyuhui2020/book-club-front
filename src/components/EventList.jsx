import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function EventList() {
  const [events, setEvents] = useState([]);
  const [city, setCity] = useState("上海");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://book-club-backend-97no.onrender.com/api/events?city=${city}`)
      .then(res => res.json())
      .then(data => setEvents(data));
  }, [city]);

  return (
    <div style={{ padding: 20 }}>
      <select value={city} onChange={(e) => setCity(e.target.value)}>
        <option>上海</option>
        <option>北京</option>
        <option>深圳</option>
      </select>
      <div>
        {events.map(ev => (
          <div key={ev.id} onClick={() => navigate(`/events/${ev.id}`)} style={{ border: '1px solid #ccc', margin: 10, padding: 10 }}>
            <img src={ev.image} alt="" style={{ width: '100%', maxWidth: 300 }} />
            <div>{ev.name}</div>
            <div>{new Date(ev.start_time).toLocaleString()}</div>
            <div>{ev.current_participants} / {ev.max_participants}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default EventList;
