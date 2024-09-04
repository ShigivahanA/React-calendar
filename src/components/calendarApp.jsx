import { useState } from "react";

const CalendarApp = () => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentDate = new Date();

  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [showEventPopup, setShowEventPopup] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventTime, setEventTime] = useState({ hours: '00', minutes: '00' });
  const [eventCategory, setEventCategory] = useState('WORK');
  const [eventText, setEventText] = useState('');
  const [editingEvent, setEditingEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);  

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const prevMonth = () => {
    setCurrentMonth(prevMonth => (prevMonth === 0 ? 11 : prevMonth - 1));
    setCurrentYear(prevYear => (currentMonth === 0 ? prevYear - 1 : prevYear));
  };

  const nextMonth = () => {
    setCurrentMonth(prevMonth => (prevMonth === 11 ? 0 : prevMonth + 1));
    setCurrentYear(prevYear => (currentMonth === 11 ? prevYear + 1 : prevYear));
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const handleDayClick = (day) => {
    const clickedDate = new Date(currentYear, currentMonth, day);
    const today = new Date();

    if (clickedDate >= today || isSameDay(clickedDate, today)) {
      setSelectedDate(clickedDate);
      setShowEventPopup(true);
      setEventTime({ hours: '00', minutes: '00' });
      setEventText('');
      setEditingEvent(null);
      setEventCategory('WORK');
    }
  };

  const handleEventSubmit = () => {
    const newEvent = {
      id: editingEvent ? editingEvent.id : Date.now(),
      date: selectedDate,
      time: `${eventTime.hours.padStart(2, '0')}:${eventTime.minutes.padStart(2, '0')}`,
      text: eventText,
      category: eventCategory,
    };

    let updatedEvents = [...events];

    if (editingEvent) {
      updatedEvents = updatedEvents.map((event) =>
        event.id === editingEvent.id ? newEvent : event
      );
    } else {
      updatedEvents.push(newEvent);
    }

    updatedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

    setEvents(updatedEvents);
    setEventTime({ hours: '00', minutes: '00' });
    setEventText("");
    setShowEventPopup(false);
    setEditingEvent(null);
    setEventCategory('WORK');
  };

  const handleEditEvent = (event) => {
    setSelectedDate(new Date(event.date));
    setEventTime({
      hours: event.time.split(':')[0],
      minutes: event.time.split(':')[1],
    });
    setEventText(event.text);
    setEditingEvent(event);
    setEventCategory(event.category);
    setShowEventPopup(true);
  };

  const handleDeleteEvent = (eventId) => {
    const updatedEvents = events.filter((event) => event.id !== eventId);
    setEvents(updatedEvents);
  };

  const handleCategoryChange = (e) => {
    setEventCategory(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterCategory(e.target.value);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const closeEventModal = () => {
    setSelectedEvent(null);
    setShowModal(false);
  };

  const filteredEvents = filterCategory === 'all'
    ? events
    : events.filter(event => event.category === filterCategory);

  return (
    <div className="calendar-app">
      <div className="calendar">
        <h1 className="heading">CALENDAR</h1>
        <div className="navigate-date">
          <h2 className="month">{monthsOfYear[currentMonth]},</h2>
          <h2 className="year">{currentYear}</h2>
          <div className="buttons">
            <i className="bx bx-chevron-left" onClick={prevMonth}></i>
            <i className="bx bx-chevron-right" onClick={nextMonth}></i>
          </div>
        </div>
        <div className="weekdays">
          {daysOfWeek.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
        <div className="days">
          {[...Array(firstDayOfMonth).keys()].map((_, index) => (
            <span key={`empty-${index}`} />
          ))}
          {[...Array(daysInMonth).keys()].map((day) => (
            <span
              key={day + 1}
              className={day + 1 === currentDate.getDate() && currentMonth === currentDate.getMonth() && currentYear === currentDate.getFullYear() ? 'current-day' : ''}
              onClick={() => handleDayClick(day + 1)}
            >
              {day + 1}
            </span>
          ))}
        </div>
      </div>      
      {/* Filters Section */}
      <div className="filters">
        <select className="category-select" value={filterCategory} onChange={handleFilterChange}>
          <option value="all">ALL</option>
          <option value="work">WORK</option>
          <option value="personal">PERSONAL</option>
        </select>
      </div>
      {/* Events Popup Section */}
      <div className="events">
        {showEventPopup && (
          <div className="event-popup">
            <div className="time-input">
              <div className="event-popup-time">Time</div>
              <input
                type="time"
                name="time"
                className="time-picker"
                value={`${eventTime.hours}:${eventTime.minutes}`}
                onChange={(e) => {
                  const [hours, minutes] = e.target.value.split(':');
                  setEventTime({
                    hours: hours.padStart(2, '0'),
                    minutes: minutes.padStart(2, '0')
                  });
                }}
              />
            </div>
            <select className="category-select" value={eventCategory} onChange={handleCategoryChange}>
              <option value="work">WORK</option>
              <option value="personal">PERSONAL</option>
            </select>
            <textarea
              placeholder="What it is about!"
              value={eventText}
              onChange={(e) => {
                if (e.target.value.length <= 20) {
                  setEventText(e.target.value);
                }
              }}
            ></textarea>
            <button className="event-popup-btn" onClick={handleEventSubmit}>
              {editingEvent ? "Update Event" : "Add Event"}
            </button>
            <button className="close-event-popup" onClick={() => setShowEventPopup(false)}>
              <i className="bx bx-x"></i>
            </button>
          </div>
        )}
        {/* Event Section */}
        {filteredEvents.map((event, index) => (
          <div className="event" key={index} onClick={() => handleEventClick(event)}>
            <div className="event-date-wrapper">
              <div className="event-date">
                {`${monthsOfYear[new Date(event.date).getMonth()]} ${new Date(event.date).getDate()}, ${new Date(event.date).getFullYear()}`}
              </div>
              <div className="event-time">{event.time}</div>
            </div>
            <div className="wrapper">
              <div className="event-category">{event.category}</div>
              <div className="event-text">{event.text}</div>
            </div>
            <div className="event-buttons">
              <i className="bx bxs-edit-alt" onClick={(e) => { e.stopPropagation(); handleEditEvent(event); }}></i>
              <i className="bx bxs-message-alt-x" onClick={(e) => { e.stopPropagation(); handleDeleteEvent(event.id); }}></i>
            </div>
          </div>
        ))}
        {/* Modal Section */}
        {showModal && selectedEvent && (
          <div className="event-modal">
            <div className="modal-content">
              <button className="close-modal" onClick={closeEventModal}>X</button>
              <h2 className="detail-head">Event Details</h2>
              <p className="detail-date"><strong>Date:  </strong> {`${monthsOfYear[new Date(selectedEvent.date).getMonth()]} ${new Date(selectedEvent.date).getDate()}, ${new Date(selectedEvent.date).getFullYear()}`}</p>
              <p className="detail-time"><strong>Time:</strong> {selectedEvent.time}</p>
              <p className="detail-category"><strong>Category:</strong> {selectedEvent.category}</p>
              <p className="detail-description"><strong>Description:</strong> {selectedEvent.text}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarApp;
