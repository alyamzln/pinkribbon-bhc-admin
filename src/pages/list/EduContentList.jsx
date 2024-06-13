import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import EduContentDatatable from "../edu-content/EduContentDatatable";

const EduContentList = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <EduContentDatatable />
      </div>
    </div>
  );
};

export default EduContentList;
