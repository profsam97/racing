# Type Racing Multiplaying game

This repository is home to a full stack application for a real-time multiplayer typing racing game. 

You view on production here [https://dos7173mxyz0u.cloudfront.net](https://dos7173mxyz0u.cloudfront.net) 

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


## Design Choices and challanages 

### Challange
 
### Player Progress
There are some design choices i had to make, should i calculate the progress based on the person that highest wpm/accuracy, because if everyone started same time, the person that has the highest wpm will be the first, but the catch was not everyone may start at the same time and if thats the case the person who has the highest wpm may not actually be the first to finish since they may/may not start immediately with the others, but have a better/higher wpm. What i did was to sort the players based on the progress they made and then rank them based on the time they finished for example if player 1 started immediately with a 56wpm and was the first to complete the race, he will be ranked first regardless of his wpm. So even though someelse had an higher wpm, but was not the first to complete the race, it wont have player 1. now if player 1 and player 2 complete the race at the same time, we rank them based on the wpm.

#### On disconnect
Another thing is if a player disconnects and the number of players drops below the minimum, should that hinder the rest from actually playing. ideally this this may be a bad/good ui depending on the requirement, some games may continue play, while other stop, e.g. a p2p action game like mortal combat when fighting, if a player disconnect, the game will pause.
Another approach will be rather than pausing the game, we can make the player's car to appear static this way others wont have to wait and they wont know the player got disconnected. 

While this approach may have a better UI/UX, its actually has a major con, if there were 4 players initially and 2 got disconnected, the both players left now has about 50% chance of winning as compared to 25% previously, which makes the game less competitive. 


#### Typescript compilation

Another major challange i faced was due to typescript compilation, i am used to having seperate front and backend sevice, where i used tsnode for the later. however since the frontend and backend were in the same project, tsnode was having issues setting the package.json type to module which vite(the frontend) required, but after much research i made use of tsx. 

#### tech stack
I decided against using next.js, since we wont utilize several features it offers such as serverside rendering, file based routing, server actions and more. I made use of vite, as its very lean and fit the requirement.


## Potential Improvement
Writing unit test, and also a list of server players can decide to join, rather than just joining random rooms that are waiting for players to join.