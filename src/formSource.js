export const userInputs = [
  {
    id: "Username",
    label: "Username",
    type: "text",
    placeholder: "nur_alya",
  },
  {
    id: "FirstName",
    label: "First Name",
    type: "text",
    placeholder: "Nur Alya",
  },
  {
    id: "LastName",
    label: "Last Name",
    type: "text",
    placeholder: "Mazlan",
  },
  {
    id: "Email",
    label: "Email",
    type: "mail",
    placeholder: "nur_alya@gmail.com",
  },
  {
    id: "PhoneNumber",
    label: "Phone",
    type: "text",
    placeholder: "+60123456789",
  },
  {
    id: "Password",
    label: "Password",
    type: "password",
  },
];

export const healthcareInputs = [
  {
    id: "name",
    label: "Facility Name",
    type: "text",
    placeholder: "ABC Hospital",
  },
  {
    id: "address",
    label: "Address",
    type: "text",
    placeholder: "123 Main Street",
  },
  {
    id: "region",
    label: "Region",
    type: "select",
    options: [
      { label: "Johor", value: "Johor" },
      { label: "Kedah", value: "Kedah" },
      { label: "Kelantan", value: "Kelantan" },
      { label: "Kuala Lumpur", value: "Kuala Lumpur" },
      { label: "W.P. Labuan", value: "W.P. Labuan" },
      { label: "Langkawi", value: "Langkawi" },
      { label: "Melaka", value: "Melaka" },
      { label: "Negeri Sembilan", value: "Negeri Sembilan" },
      { label: "Pahang", value: "Pahang" },
      { label: "Perak", value: "Perak" },
      { label: "Perlis", value: "Perlis" },
      { label: "Penang", value: "Penang" },
      { label: "Sabah", value: "Sabah" },
      { label: "Sarawak", value: "Sarawak" },
      { label: "Selangor", value: "Selangor" },
      { label: "Terengganu", value: "Terengganu" },
      { label: "Putrajaya", value: "Putrajaya" },
    ],
    placeholder: "Select Region",
  },
  {
    id: "contactNum",
    label: "Contact Number",
    type: "text",
    placeholder: "04-1234567",
  },
  {
    id: "website",
    label: "Website",
    type: "text",
    placeholder: "www.abc.com",
  },
  {
    id: "latitude",
    label: "Latitude",
    type: "number",
    placeholder: "Latitude",
  },
  {
    id: "longitude",
    label: "Longitude",
    type: "number",
    placeholder: "Longitude",
  },
];

export const quizInputs = [
  {
    id: "question",
    label: "Question",
    type: "text",
    placeholder: "Enter question",
  },
  {
    id: "answer",
    label: "Answer",
    type: "textarea",
    placeholder: "Enter answers separated by commas",
  },
];

export const contentInputs = [
  {
    id: "title",
    label: "Title",
    type: "text",
    placeholder: "Enter title",
  },
  {
    id: "description",
    label: "Description",
    type: "text",
    placeholder: "Enter description",
  },
];
