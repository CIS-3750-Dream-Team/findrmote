# findrmote

### Local Setup

#### Node.js
Detailed instructions [here](https://docs.google.com/document/d/1RzVDnlQUPVpgHf6eb52vpl4apiVTDWhsgQzWuqz-oec/edit#heading=h.h6vuwwkdrtk).
 1. Start the API Server
     1. `cd /api`
     2. `npm install`
     3. `npm start`
 2. Start the UI server
    1. `cd /app`
    2. `npm install`
    3. `npm start`

#### Docker
 1. Build and run the API Server
     1. `cd /api`
     2. `docker build . -t findrmote-api -f Dockerfile.dev`
     3. `docker run -p 6543:6543 -e PORT=6543 findrmote-api`
 2. Build and run the UI Server
    1. `cd /app`
    2. `docker build . -t findrmote-ui -f Dockerfile.dev`
    3. `docker run -p 3000:3000 -e PORT=3000 findrmote-ui`

#### Docker Compose
 1. `docker-compose up`

<br />

### Contributing
Detailed instructions [here](https://docs.google.com/document/d/1RzVDnlQUPVpgHf6eb52vpl4apiVTDWhsgQzWuqz-oec/edit#heading=h.t5itwqfrezac).
 1. Create a new branch for your task or fix \
  `git checkout -b <branch name>`
 2. Work on the task, commit your changes \
    `git commit -m <message>`
 3. While working, new changes may be added. \
    Make sure to periodically to pull these changes using. \
    `git pull origin dev`
 4. When the task is done, push it to Github. \
    `git push -u origin <branch name>`
 5. Go to Github and [create a PR for the branch](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request). \
    _Your PR should be merged into the `dev` branch._

<br />

### Deployment
 1. Push and release the API server to Heruok
    1. `heroku container:push web -a findrmote-api`
    2. `heroku container:release web -a findrmote-api`

 2. Push and release the UI server to Heruok
    1. `heroku container:push web -a findrmote`
    2. `heroku container:release web -a findrmote`
