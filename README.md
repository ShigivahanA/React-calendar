# Calendar App

## Overview

The Calendar App is a React-based application that allows users to view a calendar, add, edit, and delete events, and filter events by category. Users can also view event details in a modal.

## Features

- **Calendar Navigation**: Navigate through months and years.
- **Add/Edit Events**: Create and update events with time, category, and description.
- **Event Filtering**: Filter events by category (e.g., Work, Personal).
- **Event Details Modal**: View detailed information about each event.
- **Responsive Design**: Works well on both desktop and mobile devices.

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/calendar-app.git
2. **Navigate to the Project Directory**

   ```bash
   cd calendar-app
3. **Install Dependencies**

   ```bash
   npm install
4. **Start the Application**

   ```bash
   npm start
The app will be running on http://localhost:5173.

## Usage

### Navigating the Calendar

- Use the navigation buttons to move between months and years.
- Click on a day to open the event popup.

### Adding/Editing Events

- **Add Event**: Click on a day to open the event popup, fill in the details, and click "Add Event."
- **Edit Event**: Click on an existing event, make the necessary changes in the popup, and click "Update Event."

### Filtering Events

- Use the dropdown menu to filter events by category (All, Work, Personal).

### Viewing Event Details

- Click on an event to open a modal with detailed information.
- Close the modal by clicking the "X" button.

## Code Overview

### `CalendarApp` Component

#### State Management

- `currentMonth`, `currentYear` for navigation.
- `selectedDate`, `showEventPopup` for managing event creation/editing.
- `events` for storing events data.
- `eventTime`, `eventCategory`, `eventText` for event details.
- `editingEvent` for tracking the event being edited.
- `showModal`, `selectedEvent` for viewing event details.

#### Functions

- `prevMonth` and `nextMonth`: Navigate through months.
- `handleDayClick`: Opens the event popup for the selected date.
- `handleEventSubmit`: Adds or updates an event.
- `handleEditEvent`: Prepares the event popup for editing an existing event.
- `handleDeleteEvent`: Deletes an event.
- `handleCategoryChange` and `handleFilterChange`: Manage category selection.
- `handleEventClick`: Opens the modal with event details.
- `closeEventModal`: Closes the modal.

#### Rendering

- Calendar grid with days and navigation controls.
- Event popup for adding/editing events.
- Filters section for event categories.
- Events list with edit and delete options.
- Modal for detailed event view.

