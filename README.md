# Film Database

A React/Vite application to catalog films, eg. for a DVD collection.

Users can search for films using the API provided by [TMDB](https://www.themoviedb.org/)

From the results, films can then be added to the *Library*. These results are then saved to localStorage.

Films can also be added to a list of *Favourites*. This list is also saved locally.

## Usage
### 1. Navigate to ``film-database`` directory
  ```bash
  cd film-database
  ```
### 2. Install dependencies
  ```bash
  npm install
  ```
### 3. Add local ``.env`` file by copying template
  ```bash
  mv env.sample.env .env
  ```
### 4. Add API credentials to ``.env`` file
*You will need to create an account at [TMDB](https://www.themoviedb.org/) and apply for an API key.*
  ```properties
  VITE_API_BASE_URL=https://api.themoviedb.org/3
  VITE_API_KEY=**************************
  ```
### 5. Run app
  ```bash
  npm run dev
  ```
### 6. View in browser
  #### 🌐 [http://localhost:5173](http://localhost:5173)
