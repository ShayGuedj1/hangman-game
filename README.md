# Hangman Game

Welcome to the Hangman Game project! This is a simple web application where users can play the classic Hangman game. The application is built using HTML, CSS, JavaScript, Node.js, Express, PostgreSQL, and Redis.

## Features

- Users can enter a word to start the game.
- Users have 6 attempts to guess the word.
- The application keeps track of used letters.
- Words used in the game are stored in a PostgreSQL database.
- The application displays a list of previously used words.
- The UI provides visual feedback for game outcomes (success or failure).

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Caching**: Redis
- **Deployment**: Kubernetes

## Prerequisites

- Docker
- Kubernetes
- PostgreSQL
- Redis

## Setup

### Step 1: Clone the Repository

```sh
git clone https://github.com/your-username/hangman-game.git 
cd hangman-game
```

### Step 2: Build Docker Images

```bash
docker build -t your-docker-image .
```

### Step 3: Deploy to Kubernetes

```bash
kubectl apply -f k8s/
```

### Step 4: Verify the Deployment

```bash
kubectl get pods 
kubectl get services
```

### Step 4: Access the Application

```bash
kubectl get services
```

### Usage

1. Enter a word to start the game.
2. Guess letters to reveal the word.
3. The application will provide feedback on your guesses.
4. The list of previously used words will be displayed on the page.

### Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have any suggestions or improvements.

### License

This project is licensed under the MIT License - see the LICENSE file for details.

### Contact

For any questions or feedback, please contact shayguedj1@gmail.com .
