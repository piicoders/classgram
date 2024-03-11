// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { PrivateSet, Set, Router, Route } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

import { useAuth } from './auth'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <PrivateSet unauthenticated="login">
        <Set wrap={ScaffoldLayout} title="Users">
          <Route path="/usuarios/{id}/edit" page={UserEditUserPage} name="editUser" />
          <Route path="/usuarios/{id}" page={UserUserPage} name="user" />
          <Route path="/usuarios" page={UserUsersPage} name="users" />

          <Route path="/turmas/new" page={ClassroomNewClassroomPage} name="newClassroom" />
          <Route path="/turmas/{id:Int}/edit" page={ClassroomEditClassroomPage} name="editClassroom" />
          <Route path="/turmas/{id:Int}" page={ClassroomClassroomPage} name="classroom" />
          <Route path="/turmas" page={ClassroomClassroomsPage} name="classrooms" />
        </Set>
      </PrivateSet>
      <Route path="/" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
