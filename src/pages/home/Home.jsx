import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="section">
          <h2 className="sectionTitle">User Data</h2>
          <div className="widgetsRow">
            <Widget type="user" />
          </div>
        </div>
        <div className="section">
          <h2 className="sectionTitle">Educational Content</h2>
          <div className="widgetsRow">
            <Widget type="education" />
          </div>
        </div>
        <div className="section">
          <h2 className="sectionTitle">Quizzes</h2>
          <div className="widgetsRow">
            <Widget type="quiz" />
          </div>
        </div>
        <div className="section">
          <h2 className="sectionTitle">Risk Questions</h2>
          <div className="widgetsRow">
            <Widget type="riskQuestion" />
          </div>
        </div>
        <div className="section">
          <h2 className="sectionTitle">Risk Results</h2>
          <div className="widgetsRow">
            <Widget type="riskResult" />
          </div>
        </div>
        <div className="section">
          <h2 className="sectionTitle">Healthcare Facilities</h2>
          <div className="widgetsRow">
            <Widget type="healthcareFacility" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
