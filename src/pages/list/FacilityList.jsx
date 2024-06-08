import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import FacilitiesDatatable from "../health-facilities/FacilitiesDatatable";

const FacilityList = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <FacilitiesDatatable />
      </div>
    </div>
  );
};

export default FacilityList;
