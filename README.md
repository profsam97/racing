# Type Racing Multiplaying game

This repository is home to a full stack application for a real-time multiplayer typing racing game. 

## Features

- **Real time Multiplayer:**

  - **No of players:** This game kickoffs when there are at least 4 players
  - **Username:** Allows players to input a username.
  - **On disconnect:** if a player disconnects and the number of players drop below the minimum, which is 4. the game pause until the number of players become 4 or more, i explained more at the note section.
  - **Realtime Progress:** All users can monitor/view their progress in realtime.

- **UI:**

  - **Leaderboard:** A leaderboard component that displays players rank in realtime.
  - **Typing Area:** Allows users to type the words.
  - **Rendertext:** Shows green for correct characters and red for wrong characters.
  - **Prevent Copy/pasting:** Prevent users from copying the text and pasting the text in t.
  - **Disable on Completion:** Prevent players from typing once the text has been completed/timer is up or paused .
  - **Feedback:** Shows suitable feedback such as a success text onces the player finishes typing or error when player is still typing but time is up.

## Other Features

### Dockerization

Each service is containerized using **Docker**, ensuring consistent deployment across environments.

### Husky for Development

I've set up **Husky** to streamline development workflows. It enforces code quality checks and runs tests before commits.

## Getting Started
Clone the repository:

```bash
git clone https://github.com/profsam97/racing.git
```
then 
```bash
cd racing
```
### Running the app

There are two ways to achieve this:
1. `Run locally`

First, install the dependencies:
```bash
npm install
```

#### Then start the dev and server

The below command will start both the server and the client
```bash
npm run dev 
```
## VIew the app
### view by visiting localhost:5173
Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

2. `Run in a Docker environment`

```bash
docker compose up -d.
```
### To see the app visit ip address of the vm/server

### Technologies Used

- Typescript
- Node.js
- React.js
- Socket.io 
- Docker
- Zustand
- MUI
- Uuid
- Websocket


