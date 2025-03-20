# Typing Race - Multiplayer Racing Game

This repository hosts a full-stack real-time multiplayer typing racing game where players compete to type text as quickly and accurately as possible.

You can view the production version here: [https://dos7173mxyz0u.cloudfront.net](https://dos7173mxyz0u.cloudfront.net)

[Click here to jump to setup](#getting-started)


## Game Features

### Multiplayer Mechanics

- **Player Requirements:** The game requires at least 4 players to start
- **Username System:** Players can create a personalized racing identity
- **Disconnect Handling:** If a player disconnects and the count drops below 4, the game pauses until enough players rejoin. [more about this here](#handling-disconnection)

- **Real-time Progress:** All players can see everyone's position on the race track in real-time

### Racing Interface

- **Race Track Visualization:** Visual representation of each player's car moving across the track
- **Typing Area:** Interactive text input area with real-time feedback
- **Text Rendering:** Color-coded feedback (green for correct characters, red for incorrect)
- **Leaderboard:** Real-time ranking of players based on progress and typing speed
- **Game States:** Different states including waiting, countdown, racing, and finished

### Typing Mechanics

- **WPM Calculation:** Words Per Minute calculation based on typing speed
- **Accuracy Tracking:** Percentage of correctly typed characters
- **Copy/Paste Prevention:** Prevents players from cheating by copying the text
- **Input Validation:** Disables typing when the game is paused, finished, or when the player completes the text
- **Visual Feedback:** Success message on completion or error message when time runs out

## Technical Implementation

### Frontend

- **React Vite with TypeScript:** Used React with typescript for building components
- **Zustand:** for handling state management
- **Material UI:** For designing the user interface
- **WebSocket Client:** Real-time communication with the server

### Backend

- **Node.js:** Server-side JavaScript runtime
- **Socket.io:** Real-time bidirectional event-based communication
- **Game Room Management:** Dynamic creation and management of game rooms
- **State Synchronization:** Keeps all players' game states in sync

### DevOps & Deployment

- **Docker Containerization:** Each service is containerized for consistent deployment
- **Nginx:** Used as a reverse proxy in production

### Testing 

Added Comprehensive unit test using jest and react testing library

### Development Tools

- **Husky:** Git hooks for code quality checks before commits
- **ESLint & TypeScript:** Static code analysis and type checking
- **Vite:** Fast development server and build tool

## Architecture

This application follows a client-server architecture:

1. **Client Side:**
   - React frontend with TypeScript
   - WebSocket connection for real-time updates
   - State management with Zustand
   - UI components with Material UI

2. **Server Side:**
   - Node.js server with Socket.io
   - Game room management system
   - Player progress tracking
   - Game state management

3. **Communication:**
   - Real-time bidirectional communication via WebSockets
   - Event-based architecture for game state updates

## Game Mechanics Deep Dive

### Player Progress Calculation

The game calculates player progress based on the percentage of correctly typed characters relative to the total text length. Players are ranked primarily by their progress percentage, with WPM (Words Per Minute) used as a tiebreaker when multiple players have the same progress.

### Race Completion Logic

When a player completes the text, they are ranked based on the order of completion. If multiple players complete the race simultaneously, they are ranked by their WPM. This ensures fair competition even if players don't start typing at exactly the same time.

### Disconnect Handling

If a player disconnects and the player count drops below the minimum (4), the game pauses to maintain competitive fairness. This design choice ensures that the game remains balanced and that the odds of winning don't suddenly increase for remaining players.

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/profsam97/racing.git
cd racing
```

### Running Locally

1. Install dependencies:
```bash
npm install
```

2. Start both the client and server:
```bash
npm run start
```

3. View the application:
Open [http://localhost:5173](http://localhost:5173) in your browser

### Running with Docker

```bash
docker compose up -d
```

Then visit the IP address of your VM/server to access the application.

### Running Test

```bash
npm run test
```

## Technologies Used

- **Frontend:**
  - TypeScript
  - React.js
  - Zustand (State Management)
  - Material UI
  - Socket.io Client

- **Backend:**
  - Node.js
  - Socket.io
  - UUID

- **Test**
  - Jest
  - React Testing library

- **DevOps:**
  - Docker
  - Nginx


## Design Choices and Challenges

### Player Progress Visualization

The race track visualizes player progress in real-time, with cars moving across the track based on typing progress. This provides immediate visual feedback on each player's performance relative to others.

#### tech stack

I decided against using next.js, since we wont utilize several features it offers such as serverside rendering, file based routing, server actions and more. I made use of vite, as its very lean and fit the requirement.

### Player Ranking System

There are some design choices i had to make, should i calculate the progress based on the person that highest wpm/accuracy, because if everyone started same time, the person that has the highest wpm will be the first, but the catch was not everyone may start at the same time and if thats the case the person who has the highest wpm may not actually be the first to finish since they may/may not start immediately with the others, but have a better/higher wpm. What i did was to sort the players based on the progress they made and then rank them based on the time they finished for example if player 1 started immediately with a 56wpm and was the first to complete the race, he will be ranked first regardless of his wpm. So even though someelse had an higher wpm, but was not the first to complete the race, it wont have player 1. now if player 1 and player 2 complete the race at the same time, we rank them based on the wpm.

### Handling Disconnection

Another thing is if a player disconnects and the number of players drops below the minimum, should that hinder the rest from actually playing. ideally this this may be a bad/good ui depending on the requirement, some games may continue play, while other stop, e.g. a p2p action game like mortal combat when fighting, if a player disconnect, the game will pause.

Another approach will be rather than pausing the game, we can make the player's car to appear static this way others wont have to wait and they wont know the player got disconnected.

While this approach may have a better UI/UX, its actually has a major con, if there were 4 players initially and 2 got disconnected, the both players left now has about 50% chance of winning as compared to 25% previously, which makes the game less competitive.

### TypeScript Configuration

Integrating TypeScript for both frontend and backend in a single project presented challenges, particularly with module types. The solution involved using TSX for server-side TypeScript execution while maintaining compatibility with Vite's module requirements.

## Potential Improvements

- **Room Selection:** Allow players to choose specific rooms instead of automatic assignment
- **Difficulty Levels:** Allows players to choose a difficulty level
- **Persistent Leaderboards:** We can store historical race results, but this will require a db
- **User Accounts:** Adding authentication and a user profiles, also requires a db
