import { format } from "date-fns";

export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 170,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.Username}
        </div>
      );
    },
  },
  {
    field: "FirstName",
    headerName: "First Name",
    width: 140,
  },
  {
    field: "LastName",
    headerName: "Last Name",
    width: 140,
  },
  {
    field: "Email",
    headerName: "Email",
    width: 230,
  },
  {
    field: "PhoneNumber",
    headerName: "Phone Number",
    width: 150,
  },
  {
    field: "timeStamp",
    headerName: "Date and Time Created",
    width: 180,
    renderCell: (params) => {
      const date = params.row.timeStamp ? params.row.timeStamp.toDate() : null;
      return date ? format(date, "yyyy-MM-dd HH:mm:ss") : "";
    },
  },
];

export const facilitiesColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "region",
    headerName: "Region",
    width: 140,
  },
  {
    field: "name",
    headerName: "Facility Name",
    width: 140,
  },
  {
    field: "address",
    headerName: "Address",
    width: 230,
  },
  {
    field: "contactNum",
    headerName: "Contact Number",
    width: 140,
  },
  {
    field: "website",
    headerName: "Website",
    width: 140,
  },
  {
    field: "coordinates",
    headerName: "Coordinates",
    width: 150,
    renderCell: (params) => {
      const { latitude, longitude } = params.row.coordinates;
      return `${latitude}, ${longitude}`;
    },
  },
];

export const riskLevelsColumns = [
  {
    field: "level",
    headerName: "Risk Level",
    width: 120,
    renderCell: (params) => {
      return <div className="wrapText">{params.row.level}</div>;
    },
  },
  {
    field: "criteria",
    headerName: "Criteria",
    width: 300,
    renderCell: (params) => {
      return (
        <div className="wrapText">
          <ul>
            {params.row.criteria.map((criterion, index) => (
              <li key={index}>{criterion}</li>
            ))}
          </ul>
        </div>
      );
    },
  },
  {
    field: "recommendations",
    headerName: "Recommendations",
    width: 600,
    renderCell: (params) => {
      const rec = params.row.recommendations || {}; // Default to empty object if null or undefined
      return (
        <div className="wrapText">
          <strong>CBE:</strong>
          <ul>
            {Object.entries(rec.CBE || {}).map(([ageGroup, details], index) =>
              ageGroup !== "description" ? (
                <li key={index}>
                  {ageGroup}: {details.frequency} (Source: {details.source})
                </li>
              ) : null
            )}
          </ul>
          <strong>Mammography:</strong>
          <ul>
            {Object.entries(rec.mammography || {}).map(
              ([ageGroup, details], index) =>
                ageGroup !== "description" ? (
                  <li key={index}>
                    {ageGroup}: {details.frequency} (Source: {details.source})
                  </li>
                ) : null
            )}
          </ul>
          {rec.MRI && (
            <>
              <strong>MRI:</strong>
              <ul>
                {Object.entries(rec.MRI).map(([ageGroup, details], index) =>
                  ageGroup !== "description" ? (
                    <li key={index}>
                      {ageGroup}: {details.frequency} (Source: {details.source})
                    </li>
                  ) : null
                )}
              </ul>
            </>
          )}
        </div>
      );
    },
  },
];
