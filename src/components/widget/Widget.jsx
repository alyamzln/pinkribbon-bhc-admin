import "./widget.scss";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";

const Widget = ({ type }) => {
  let data;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        link: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "education":
      data = {
        title: "EDUCATIONAL CONTENT",
        link: "See all content",
        icon: (
          <SchoolOutlinedIcon
            className="icon"
            style={{ color: "blue", backgroundColor: "rgba(0, 0, 255, 0.2)" }}
          />
        ),
      };
      break;
    case "quiz":
      data = {
        title: "QUIZZES",
        link: "Take quizzes",
        icon: (
          <QuizOutlinedIcon
            className="icon"
            style={{ color: "green", backgroundColor: "rgba(0, 255, 0, 0.2)" }}
          />
        ),
      };
      break;
    case "riskQuestion":
      data = {
        title: "RISK QUESTIONS",
        link: "See all questions",
        icon: (
          <HelpOutlineOutlinedIcon
            className="icon"
            style={{
              color: "orange",
              backgroundColor: "rgba(255, 165, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "riskResult":
      data = {
        title: "RISK RESULTS",
        link: "See all results",
        icon: (
          <CheckCircleOutlineOutlinedIcon
            className="icon"
            style={{
              color: "purple",
              backgroundColor: "rgba(128, 0, 128, 0.2)",
            }}
          />
        ),
      };
      break;
    case "healthcareFacility":
      data = {
        title: "HEALTHCARE FACILITIES",
        link: "Find facilities",
        icon: (
          <LocalHospitalOutlinedIcon
            className="icon"
            style={{ color: "red", backgroundColor: "rgba(255, 0, 0, 0.2)" }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">{data.icon}</div>
    </div>
  );
};

export default Widget;
