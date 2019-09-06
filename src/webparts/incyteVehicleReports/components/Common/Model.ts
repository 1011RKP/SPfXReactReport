


export const userWithVehicleDropdown = [
  { key: '-- Please Select Type of Users --', text: '-- Please Select Type of Users --' },
  { key: 'All', text: 'All' },
  { key: 'Employees only', text: 'Employees only' },
  { key: 'Contractors only', text: 'Contractors only' },
  { key: 'Guests only', text: 'Guests only' }
];

export const userWithOutVehicleDropdown = [
  { key: '-- Please Select Type of Users --', text: '-- Please Select Type of Users --' },
  { key: 'All', text: 'All' },
  { key: 'Employees only', text: 'Employees only' },
  { key: 'Contractors only', text: 'Contractors only' }
];

export const ddCountries = [
  { key: '-- Please Select Country --', text: '-- Please Select Country --' }
];

export const ddLocations = [
  { key: '-- Please Select Location --', text: '-- Please Select Location --' }
];

export const HTMLColumnsWithVehicle = [
  {
    Header: "Title",
    accessor: "Title"
    //sortable: false
  },
  {
    Header: "Vehicle Color",
    accessor: "VehicleColor"
  },
  {
    Header: "Vehicle Make",
    accessor: "VehicleMake"
  },
  {
    Header: "Vehicle Model",
    accessor: "VehicleModel"
  },
  {
    Header: "Vehicle State Code",
    accessor: "VehicleStateCode"
  },
  {
    Header: "Vehicle Tag",
    accessor: "VehicleTag"
  },
  {
    Header: "Vehicle Year",
    accessor: "VehicleYear"
  },
  {
    Header: "Incyte Employee",
    accessor: "IncyteEmployee"
  },
  {
    Header: "Intern",
    accessor: "Intern"
  },
  {
    Header: "Registered InUSA",
    accessor: "RegisteredInUSA"
  },
  {
    Header: "Non US Registered",
    accessor: "NonUSRegistered"
  },
  {
    Header: "Location",
    accessor: "Location"
  },
  {
    Header: "Country",
    accessor: "Country"
  }
];

export const HTMLColumnsWithOutVehicle = [
  {
    Header: "Title",
    accessor: "Title"
    //sortable: false
  },
  {
    Header: "Full Name",
    accessor: "FullName"
  },
  {
    Header: "Phone Number",
    accessor: "PhoneNumber"
  },
  {
    Header: "Email",
    accessor: "Email"
  },
  {
    Header: "Country",
    accessor: "Country"
  },
  {
    Header: "Country",
    accessor: "Country"
  }
];

export const EmployeeColumns = "ID,Title,RegisteredInUSA,VehicleStateCode,VehicleTag,VehicleYear,VehicleMake,VehicleModel,VehicleColor,ElectricCar,NonUSRegistered,IncyteEmployee,Intern,Company,Location,Country";

export const ConsultentColumns = "ID,Title,RegisteredInUSA,VehicleStateCode,VehicleTag,VehicleYear,VehicleMake,VehicleModel,VehicleColor,ElectricCar,NonUSRegistered,IncyteEmployee,Company,Location,Country";

export const GuestColumns = "ID,Title,RegisteredInUSA,VehicleStateCode,VehicleTag,VehicleYear,VehicleMake,VehicleModel,VehicleColor,ElectricCar,NonUSRegistered,Company,Location,Country";

export const allColumns = "ID,Title,RegisteredInUSA,VehicleStateCode,VehicleTag,VehicleYear,VehicleMake,VehicleModel,VehicleColor,ElectricCar,NonUSRegistered,Company,Location,Country";

export const NoVehicleEmployeeColumns = "ID,Title,FullName,PhoneNumber,Email,Country,Location";

export const NoVehicleConsultentColumns = "ID,Title,FullName,PhoneNumber,Email,Country,Location";

export const NoVehicleallColumns = "ID,Title,FullName,PhoneNumber,Email,Country,Location";

 