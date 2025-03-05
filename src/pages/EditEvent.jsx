import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditEvent = () => {
  const { id } = useParams(); // Get event ID from URL
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/events/${id}`
      );
      setTitle(data.title);
      setDescription(data.description);
      setDate(data.date.split("T")[0]); // Format date to YYYY-MM-DD
      setVenue(data.venue);
    } catch (error) {
      console.error("Error fetching event:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/events/${id}`, {
        title,
        description,
        date,
        venue,
      });
      alert("Event updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Failed to update event.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4">Edit Event</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Venue"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Update Event
        </button>
      </form>
    </div>
  );
};

export default EditEvent;
