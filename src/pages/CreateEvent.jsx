import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("adminToken"); // Get token from localStorage

    try {
      const response = await axios.post(
        "http://localhost:5000/api/events",
        { title, description, date, venue },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send JWT token
          },
        }
      );

      setMessage("Event created successfully!");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      console.error("Error creating event:", error);
      setMessage("Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Create Event
        </h2>
        {message && <p className="text-center text-green-600">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />

          <textarea
            placeholder="Event Description"
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
            placeholder="Event Venue"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Event"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
