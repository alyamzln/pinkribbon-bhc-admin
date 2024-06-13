import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import FacilityList from "./pages/list/FacilityList";
import NewFacility from "./pages/new/NewFacility";
import RiskLevelsList from "./pages/list/RiskLevelList";
import RiskQuestionsList from "./pages/list/RiskQuestionsList";
import EduContentList from "./pages/list/EduContentList";
import NewContent from "./pages/new/NewContent";
import NewQuiz from "./pages/new/NewQuiz";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  healthcareInputs,
  userInputs,
  contentInputs,
  quizInputs,
} from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  console.log(currentUser);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route path="users">
              <Route
                index
                element={
                  <RequireAuth>
                    <List />
                  </RequireAuth>
                }
              />
              <Route
                path=":userId"
                element={
                  <RequireAuth>
                    <Single />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <New inputs={userInputs} title="Add New User" />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="healthcarefacilities">
              <Route
                index
                element={
                  <RequireAuth>
                    <FacilityList />
                  </RequireAuth>
                }
              />
              <Route
                path=":facilityId"
                element={
                  <RequireAuth>
                    <Single />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <NewFacility
                      inputs={healthcareInputs}
                      title="Add New Healthcare Facility"
                    />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="risklevels">
              <Route
                index
                element={
                  <RequireAuth>
                    <RiskLevelsList />
                  </RequireAuth>
                }
              />
              <Route
                path=":resultId"
                element={
                  <RequireAuth>
                    <Single />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="educontent">
              <Route
                index
                element={
                  <RequireAuth>
                    <EduContentList />
                  </RequireAuth>
                }
              />
              <Route
                path=":contentId"
                element={
                  <RequireAuth>
                    <Single />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <NewContent
                      inputs={contentInputs}
                      title="Add New Content"
                    />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="riskquestions">
              <Route
                index
                element={
                  <RequireAuth>
                    <RiskQuestionsList />
                  </RequireAuth>
                }
              />
              <Route
                path=":questionId"
                element={
                  <RequireAuth>
                    <Single />
                  </RequireAuth>
                }
              />
              {/* <Route
                path="newquestion"
                element={
                  <RequireAuth>
                    <NewFacility
                      inputs={healthcareInputs}
                      title="Add New Question"
                    />
                  </RequireAuth>
                }
              /> */}
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
