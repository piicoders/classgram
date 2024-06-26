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
      <PrivateSet unauthenticated="login" roles="P" /*Professor*/>
        <Set wrap={ScaffoldLayout}>
          {/*
          <Route path="/criteria/new" page={CriterionNewCriterionPage} name="newCriterion" />
          <Route path="/criteria/{id:Int}/edit" page={CriterionEditCriterionPage} name="editCriterion" />
          <Route path="/criteria/{id:Int}" page={CriterionCriterionPage} name="criterion" />
          <Route path="/criteria" page={CriterionCriteriaPage} name="criteria" />

          <Route path="/subfactors/new" page={SubfactorNewSubfactorPage} name="newSubfactor" />
          <Route path="/subfactors/{id:Int}/edit" page={SubfactorEditSubfactorPage} name="editSubfactor" />
          <Route path="/subfactors/{id:Int}" page={SubfactorSubfactorPage} name="subfactor" />
          <Route path="/subfactors" page={SubfactorSubfactorsPage} name="subfactors" />

          <Route path="/corrections/new" page={CorrectionNewCorrectionPage} name="newCorrection" />
          <Route path="/corrections/{id:Int}/edit" page={CorrectionEditCorrectionPage} name="editCorrection" />
          <Route path="/corrections/{id:Int}" page={CorrectionCorrectionPage} name="correction" />
          <Route path="/corrections" page={CorrectionCorrectionsPage} name="corrections" />

          <Route path="/prompts/new" page={PromptNewPromptPage} name="newPrompt" />
          <Route path="/prompts/{id:Int}/edit" page={PromptEditPromptPage} name="editPrompt" />
          <Route path="/prompts/{id:Int}" page={PromptPromptPage} name="prompt" />
          <Route path="/prompts" page={PromptPromptsPage} name="prompts" />
         */}
          <Route path="/turmas/{classId:Int}/usuarios" page={UserUsersPage} name="users" />

          <Route path="/turmas/{id:Int}/editar" page={ClassroomEditClassroomPage} name="editClassroom" />

          <Route path="/turmas/{classId:Int}/atividades/nova" page={ActivityNewActivityPage} name="newActivity" />
          <Route path="/turmas/{classId:Int}/atividades/{activityId:Int}/editar" page={ActivityEditActivityPage} name="editActivity" />

          <Route path="/turmas/{classId:Int}/atividades/{activityId:Int}/envios" page={DocumentDocumentsPage} name="documents" />
          <Route path="/turmas/{classId:Int}/atividades/{activityId:Int}/envios/{id:Int}" page={DocumentDocumentPage} name="document" />
        </Set>
      </PrivateSet>
      <PrivateSet unauthenticated="login" /*Professor and Student*/>
        <Set wrap={ScaffoldLayout}>
          <Route path="/usuarios/{id}/edit" page={UserEditUserPage} name="editUser" />
          <Route path="/usuarios/{id}" page={UserUserPage} name="user" />

          <Route path="/turmas/nova" page={ClassroomNewClassroomPage} name="newClassroom" />
          <Route path="/turmas/{id:Int}" page={ClassroomClassroomPage} name="classroom" />
          <Route path="/turmas" page={ClassroomClassroomsPage} name="classrooms" />

          <Route path="/turmas/{classId:Int}/atividades/{activityId:Int}" page={ActivityActivityPage} name="activity" />
          <Route path="/turmas/{classId:Int}/atividades" page={ActivityActivitiesPage} name="activities" />
        </Set>
      </PrivateSet>

      <Route path="/" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
