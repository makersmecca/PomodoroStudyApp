# POMODORO TIMER STUDY APP
[![Netlify Status](https://api.netlify.com/api/v1/badges/d8fc2ebb-90ca-43f3-b061-093d64262a65/deploy-status)](https://app.netlify.com/sites/ayudhn/deploys)

![CodeQL](https://github.com/github/docs/actions/workflows/codeql.yml/badge.svg?event=push)

![NodeJS CLI](https://github.com/github/docs/actions/workflows/node.js.yml/badge.svg?event=push)

Enable users to track study sessions using a Pomodoro timer, set custom work and break periods, and integrate YT Music for focused study seesions.

## FEATURES [Planned]:

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
