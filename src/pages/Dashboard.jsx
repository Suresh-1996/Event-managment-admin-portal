import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaBell } from "react-icons/fa";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false); // State to toggle notifications
  const navigate = useNavigate();

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    socket.on("newBooking", (data) => {
      console.log(data.message);
      setNotifications((prev) => [...prev, data.message]);
      setShowNotifications(true); // Show pop-up
    });

    return () => {
      socket.off("newBooking");
    };
  }, []);

  const fetchEvents = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/events");
      setEvents(data);
      setFilteredEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await axios.delete(`http://localhost:5000/api/events/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchEvents();
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      // Clear notifications when pop-up is opened
      setNotifications([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 p-4 text-white flex justify-between">
        <Link to="/dashboard" className="font-bold text-lg">
          Admin Dashboard
        </Link>
        <div className="space-x-4 relative">
          <button
            onClick={toggleNotifications}
            className="relative focus:outline-none"
          >
            <FaBell size={20} />
            {notifications.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                {notifications.length}
              </span>
            )}
          </button>

          {/* Notifications Pop-up */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-2">
              <h3 className="font-bold text-gray-700">Notifications</h3>
              {notifications.length === 0 ? (
                <p className="text-gray-500">No new notifications</p>
              ) : (
                <ul>
                  {notifications.map((msg, index) => (
                    <li
                      key={index}
                      className="p-2  text-gray-600 border-b last:border-none"
                    >
                      {msg}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <button
            onClick={() => {
              localStorage.removeItem("adminInfo");
              navigate("/");
            }}
            className="bg-red-400 hover:bg-red-500 px-4 py-2 rounded"
          >
            Logout
          </button>
          <Link to="/create-event" className="hover:text-gray-200">
            Create Event
          </Link>
        </div>
      </nav>

      {/* Search Bar */}
      <div className="p-4 bg-white shadow-lg mt-4 mx-4 rounded">
        <h2 className="text-xl font-semibold mb-3">Search Events</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search by Title"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            className="border p-2 w-full rounded"
          />
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            className="border p-2 w-full rounded"
          />
        </div>
      </div>

      {/* Event List */}
      <div className="mt-6 mx-4">
        <h2 className="text-xl font-semibold mb-3">Created Events</h2>
        <div className="bg-white shadow-lg p-4 rounded">
          {filteredEvents.length === 0 ? (
            <p className="text-gray-500">No events found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <div
                  key={event._id}
                  className="bg-white shadow-lg p-4 rounded-lg"
                >
                  <h3 className="text-lg font-semibold">{event.title}</h3>
                  <p className="text-gray-600">
                    {new Date(event.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </p>
                  <p className="text-gray-600">{event.venue}</p>
                  <div className="mt-4 flex justify-between">
                    <Link
                      to={`/edit-event/${event._id}`}
                      className="text-green-500 flex items-center gap-1"
                    >
                      <FaEdit size={18} />
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="text-red-500 flex items-center gap-1"
                    >
                      <FaTrash size={18} />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
