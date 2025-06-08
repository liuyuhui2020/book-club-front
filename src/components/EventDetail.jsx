import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [qr, setQr] = useState("");

  useEffect(() => {
    fetch(`https://book-club-backend-97no.onrender.com/api/events/${id}`)
      .then(res => res.json())
      .then(data => setEvent(data));
  }, [id]);

  const handleRegister = () => {
    const name = prompt("请输入姓名");
    const phone = prompt("请输入手机号");
    fetch(`https://book-club-backend-97no.onrender.com/api/events/${id}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone })
    })
    .then(res => res.json())
    .then(data => setQr(data.qr_url));
  };

  if (!event) return <div>加载中...</div>;

  return (
    <div style={{ padding: 20 }}>
      <img src={event.image} style={{ width: "100%", maxWidth: 500 }} alt="event" />
      <h2>{event.name}</h2>
      <div>创建人：{event.creator}</div>
      <div>时间：{new Date(event.start_time).toLocaleString()}</div>
      <div>人数：{event.current_participants} / {event.max_participants}</div>
      <p>{event.description}</p>
      <p>{event.recommendation}</p>
      <p>{event.type}</p>
      {qr ? (
        <img src={qr} alt="二维码" style={{ marginTop: 20 }} />
      ) : (
        <button onClick={handleRegister} style={{ marginTop: 20 }}>报名</button>
      )}
    </div>
  );
}
export default EventDetail;
