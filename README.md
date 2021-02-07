# meeting-calendar

    to add event to the calendar, user should click 'add event +' button
      after the 'add event +' button was clicked, a popup window appears
        on this popup window user should input name of the event and name of participant, select day (Mon-Fri) and time (10:00-18:00) of the event.
        after user clicks 'create' button, and if all input fields were filled, the event is displayed in the calendar table and popup window with inputs disappears
        if any of the input fields is not filled, another popup window appears, saying to fill the required fields
        user can make popup window disappear by clicking 'cancel' button, or by clicking anywhere on a screen, outside the popup window
        if day and time slot is not free, a popup window appears, saying that this time slot (day and time) is already booked
      user can delete event from the calendar by pressing delete symbol (X) near the meeting title.
        after user presses the delete symbol, a popup window appears, asking user to confirm their action.
          in case user confirms deletion, event disappears from the calendar, name of participant of this event disappears from 'participants' list and popup window disappears
          in case user doesn't want to delete event, they can click 'cancel' button or click anywhere on the screen (outside the popup window) and popup window will disappear
   after the event was added to the calendar, a name of the participant is added to the 'participants' list. 
      User can find this list in a 'select' element, which is in the upper right corner of the screen (near the 'add event +' button).
      after user clicks on 'select' element, a list of users appears.
      if user selects a name, all events in the calendar, having this user as a participant, change their color.      
      user can select to show 'all members' (default value), then all events are displayed with their original color
      
    
    
