import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import RiskLevelsDatatable from "../risk-levels/RiskLevelsDatatable";

const RiskLevelsList = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <RiskLevelsDatatable />
      </div>
    </div>
  );
};

export default RiskLevelsList;
