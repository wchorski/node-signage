import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';

import { LoginPersist } from './components/LoginPersist';

import Missing from './views/Missing';
// import Editor from './views/Editor';
import Home from './views/Home';
import Admin from './views/Admin';
import Slides from './views/Slides';
// import Lounge from './views/Lounge';
// import LinkPage from './views/LinkPage';

import Register from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import Unauthorized from './components/Unauthorized';
import RequireAuth from './components/RequireAuth';
import { User } from './views/User';
// import Posts from './views/Posts';
// import PostSingle from './views/PostSingle';
// import PostCreate from './views/PostCreate';
// import PostEditor from './views/PostEditor';
import UserEditor from './views/UserEditor';

const ROLES = {
  'Admin': 5150,
  'Editor': 1984,
  'User': 2001,
}

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/" element={<Home username='derik'/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup" element={<Register />} />
        {/* <Route path="/linkpage" element={<LinkPage />} /> */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/slides" element={<Slides />} />

        {/* we want to protect these routes */}
        <Route element={<LoginPersist />}>

          {/* <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>
            <Route path="/editor" element={<Editor />} />
            <Route path="/posts/editor/:_id" element={<PostEditor />} />
            <Route path="/posts/create" element={<PostCreate />} />
          </Route> */}


          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="/admin" element={<Admin />} />
            <Route path="/users/:_id" element={<User />} />
            <Route path="/users/editor/:_id" element={<UserEditor/>} />
          </Route>

          {/* <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin, ROLES.User]} />}>
            <Route path="/lounge" element={<Lounge />} />
            <Route path="/posts/:_id" element={<PostSingle />} />
            <Route path="/posts" element={<Posts />} />
          </Route> */}
        </Route>

        {/* catch all */}
        <Route path="/*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;