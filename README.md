<warning> red color markdown text</warning>
<p class="warning"> red color markdown text</p>

# node-signage
Digital Signage on a MERN stack
<br/>

<warning>This app is terribly optimized, and kinda ugly</warning>
<br/>

# ⚒ Features 
0. Slides data with multiple front end templates
0. Admin backend with user managment CRUD
0. Role based Authentication with JWT *Admin, Editor, User*
0. Client side Auth protection per page
0. Deployable via Docker 
<br/>

## 🔓 Permissions
<i>find default user login info in `./server/config/defaultUsers.json`</i>
<br/>
<br/>

# ⚙ Development Setup Checklist
0. i run <a href="https://www.mongodb.com/try/download/community">MongoDB Community Edition</a> locally on my machine and tap into it with <a href="https://www.mongodb.com/try/download/compass">MongoDB Compass</a> 
0. add in `require('dotenv').config();` at the top of `./server/server.js`
0. allow multiple frontend domains in `allowedOrigins.js` (docker compose env variable gets added automatically)
0. node dev environment `cd ./server` `npm run dev` will kick up express and react at the same time.
0. you could run a dev environment in docker with `dev.sh` but I don't recommend it.
0. all dev env variables live in `./server/.env` & `./client/.env` (production variables are setup via compose)
<br/>

# ⚙ Production Setup Checklist
0. comment out `require('dotenv').config();` at the top of `./server/server.js`
0. change `./client/.env` with prod variables
0. edit all `environment:` variables in `compose.yml`
0. `docker compose up -d --build`
0. `docker compose down --remove-orphans`
<br/>

# 🌠 Feature Wish List
<details>
  <summary>List 1</summary>

  ### slides
    + create new slide editor
    + edit existing slide editor 
    + multiple templates views for slide data
    +
  ### Slides view
    + edit buttons each slide on bottom right [ select, edit, delete ] 
    + hover over to see meta data and edit buttons
    + make this page view all collections
    +
  ### Slides creator / editor
    + image: pic from previously uploaded pics
    + check to see if pic is already uploaded by name and use that
    +
  ### Collection view
    + CRUD collections
    + drag and drop to reorder 
    + shuffle  slides
    + randomize slides
    + create new blank collection
    + add multi images as just slides (i.e. powerpoint pressy)
    + choose the active collection
    +
  ### admin
    + block users from editing certain collections
    + remove bootstrap stylings in 'client/index.html'
    + set max num of slides per collection
    + set max file upload limit
    +
  ### server

</details>