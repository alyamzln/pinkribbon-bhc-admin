import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import RiskQuesDatatable from "../risk-ques/RiskQuesDatatable";

const RiskQuestionsList = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <RiskQuesDatatable />
      </div>
    </div>
  );
};

export default RiskQuestionsList;
