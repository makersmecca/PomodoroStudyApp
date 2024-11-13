# HALO FOCUS

<h3>A Pomodoro-style productivity app, designed to help you stay focused and on track with your study/work sessions</h3>
<div align="center">
  <span>
    <img src="https://api.netlify.com/api/v1/badges/d8fc2ebb-90ca-43f3-b061-093d64262a65/deploy-status" /> 
    <img src="https://github.com/github/docs/actions/workflows/codeql.yml/badge.svg?event=push"/>
  </span>
</div>
<h3> HaloFocus is live! Click <a href="https://halofocus.netlify.app">here</a> to check it out!</h3>
<p>With a clean, distraction-free UI, and an array of Ambient Sounds, HaloFocus assists your workflow and provides tools like Breathing Exercises and To-Do lists to enhance productivity. </p>

## FEATURES:
- <strong>Pomodoro Timer:</strong> Predefined time durations as well as custom time durations for your focus sessions.


### Dashboard:

- Display User data [Requires auth]
- Display Pomodoro cycles with date and time
- Display Breathing exercise history and activity
- Calendar view of timings

### Pomodoro Timer:

- Standard pomodoro cycles with work and break sessions.
- Users can set custon timer for study sessions, short breaks and long breaks
- Visual feedback on progress and alerts for breaks and session ends [Progress bar]
- Adjustable work and break timers, personalised study sessions
- Save custom time durations for future use

### YT Music integration: [IFrame API]

- Play white noise playlist by default
- Choose playlist to play using URL
- Media controls in app
- Play/Pause music based on timer status

### To-Do Checklist:

- Create, Update, Delete checklist items
- Synced with user's auth across all sessions

### Breathing Exercise:

- Dedicated tab for guided breathing exercise to help users relax during breaks
- Animated visual cues to help user with synchronized breathing
- Custom breathing cycles [custom time]

## TECH STACK [PLANNED]:

- React for frontend
- Firebase Firestore/ Supabase for data storage
- Youtube IFrame API
- Firebase Auth
- Notifications API for notifications
