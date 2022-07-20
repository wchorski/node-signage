# node-signage ♐ 
Digital Signage on a MERN stack
<br/>

<i>This app is terribly optimized, and kinda ugly</i>
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
0. i run <a href="https://www.mongodb.com/try/download/community">MongoDB Community Edition</a> locally on my machine and tap into it with <a href="https://www.mongodb.com/try/download/compass">MongoDB Compass</a>. <a href="https://nodejs.org/en/">Node.js</a> for the app. 
0. `cd ./server` `cp .env.dev .env` | `npm i`
0. `cd ./client` `cp .env.dev .env` | `npm i`
0. allow multiple frontend domains in `allowedOrigins.js` (docker compose env variable gets added automatically)
0. node dev environment `cd ./server` `npm run dev` will kick up express and react at the same time with <a href="https://www.npmjs.com/package/concurrently">concurrently</a> .
<br/>

# 🏭 Production Setup Checklist
0. `cd ./client` `cp .env.prod .env`
0. change `./client/.env` with prod variables
0. edit all `environment:` variables in `compose.yml`
0. `docker compose up -d --build`
0. `docker compose down --remove-orphans`
<br/>

# 🌠 Feature Wish List
<details>
  <summary>List 1</summary>

  ### slides
    + ✅ create new slide editor
    + edit existing slide editor 
    + multiple templates views for slide data
    +
  ### Slides view
    + edit buttons each slide on bottom right [ select, edit, delete ] 
    + make this page view all collections
    + select and batch delete
    + 
  ### Slides creator / editor
    + image: pic from previously uploaded pics
    + check to see if pic is already uploaded by name and use that
    + ✅ extra option to load "baked slides" (like an exported Power Point)
    + re-order via drag n drop
    + set slide advance time
    + hide / show arrows
    +
  ### Collection view
    + CRUD collections
    + drag and drop to reorder 
    + shuffle slides
    + randomize slides
    + create new blank collection
    + add multi images as just slides (i.e. powerpoint pressy)
    + choose the active collection
    + undo button on deletions
    + 
  ### Slide player
    + need to fix auto play time when also allowing manual advancing
    + advance with arrow keys
    + refresh page if => slide count request returns a greater or less than number than current slides
    + Player settings Hide arrows
    + 
  ### admin
    + block users from editing certain collections
    + remove bootstrap stylings in 'client/index.html'
    + set max num of slides per collection
    + set max file upload limit
    + activate / deactivate collections
    + set slide advance global time
    +
  ### server

  ### frontend
    + ✅ dynamically create *Players* for each active collection
    +

</details>