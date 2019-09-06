import * as React from 'react';
//import from 'react';
import vehicleStyles from './IncyteVehicleReports.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPComponentLoader } from '@microsoft/sp-loader';
import { sp } from '@pnp/sp';
import { IIncyteVehicleReportsProps, IIncyteVehicleReportsState } from './IIncyteVehicleReportsProps';
import {
  userWithVehicleDropdown, userWithOutVehicleDropdown,
  EmployeeColumns, NoVehicleallColumns,
  ConsultentColumns, NoVehicleEmployeeColumns,
  GuestColumns,
  ddCountries, ddLocations, NoVehicleConsultentColumns
} from './Common/Model';
import { All } from './All/all';
import { Error } from "./Error/error";
//import * as jQuery from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library, icon } from '@fortawesome/fontawesome-svg-core';
import { faCheckCircle, faChartBar, faDownload } from '@fortawesome/free-solid-svg-icons';
SPComponentLoader.loadCss("https://incyte.sharepoint.com/sites/common/SiteAssets/CustomShell/CSS/bootstrapV3.3.7.css");
SPComponentLoader.loadCss("https://incyte.sharepoint.com/sites/common/SiteAssets/CustomShell/CSS/bootstrap-custom.css");
SPComponentLoader.loadCss("https://incyte.sharepoint.com/sites/common/SiteAssets/CustomShell/CSS/incyte-custom-style.css");
SPComponentLoader.loadCss("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
import 'core-js/es6/number';
import 'core-js/es6/array';

export default class IncyteVehicleReports extends React.Component<IIncyteVehicleReportsProps, any> {


  public ddCoun = ddCountries;
  public ddLoc = ddLocations;
  public errorComponent;
  public refCountry = React.createRef<HTMLSelectElement>();
  public refLocation = React.createRef<HTMLSelectElement>();
  public refUserWithVehicle = React.createRef<HTMLSelectElement>();
  public refUserWithOutVehicle = React.createRef<HTMLSelectElement>();

  public constructor(props: IIncyteVehicleReportsProps, state: IIncyteVehicleReportsState) {
    super(props);
    //this.textInput;
    this.vehilce_HandleonClick = this.vehilce_HandleonClick.bind(this);
    this.noVehilce_HandleonClick = this.noVehilce_HandleonClick.bind(this);
    this.countryBlankFilter = this.countryBlankFilter.bind(this);
    this.locationBlankFilter = this.locationBlankFilter.bind(this);
    this.returnError = this.returnError.bind(this);
    this.state = {
      vehicleExist: true,
      //noVehicleBtn: false,
      loadGif: false,
      chkBoxChecked: false,
      userType: "-- Please Select Type of Users --",
      userTypeSelected: '',
      disableVehiclebtn: true,
      disableNoVehiclebtn: true,
      listName: "",
      userWithVehicleDropdownOptions: userWithVehicleDropdown,
      userWithOutVehicleDropdownOptions: userWithOutVehicleDropdown,
      countriesOptions: ddCountries,
      countriesSelected: [],
      locationsOptions: ddLocations,
      locationSelected: [],
      items: [],
      noDateWithGivenFilters: false
    };
  }

  public componentDidMount() {
    this.loadDropDowns();
  }

  public publickDDTypes(res) {
    let htmlChunk;
    if (!res) {
      htmlChunk = <React.Fragment>
        <div className="form-group">
          <label>Employees Type With Vehicle</label>
          <select className="form-control"
            ref={this.refUserWithVehicle}
            onChange={(val => this.handleChange(val, "typeofUser"))} >
            {
              this.state.userWithVehicleDropdownOptions.map((item, i) => {
                return (
                  <option key={i} value={item.key}>{item.text}</option>
                );
              })
            }
          </select>
        </div>
      </React.Fragment>;
    } else {
      htmlChunk = <React.Fragment>
        <div className="form-group">
          <label>Employees Type Without Vehicle</label>
          <select className="form-control"
            ref={this.refUserWithOutVehicle}
            onChange={(val => this.handleChange(val, "noVehicleTypeUser"))} >
            {
              this.state.userWithOutVehicleDropdownOptions.map((item, i) => {
                return (
                  <option key={i} value={item.key}>{item.text}</option>
                );
              })
            }
          </select>
        </div>
      </React.Fragment>;
    }
    return htmlChunk;
  }

  public handleChange = (e, type) => {
    if (e.preventDefault) e.preventDefault();
    else e.returnValue = false;
    //e.preventDefault();
    let event = e.target.value;
    console.log(":type:" + type);
    switch (type) {
      case "location":
        if (event == "-- Please Select Location --") {
          this.setState({
            locationSelected: ""
          });
        } else {
          this.setState({
            locationSelected: event
          });
        }
        break;
      case "country":
        if (event == "-- Please Select Country --") {
          this.setState({
            countriesSelected: ""
          });
        } else {
          this.setState({
            countriesSelected: event
          });
        }
        break;
      case "typeofUser":
        if (event == "-- Please Select Type of Users --") {
          this.setState({
            userTypeSelected: "",
            items: [],
            listName: "",
            disableVehiclebtn: true
          });
        } else {
          this.setState({
            userTypeSelected: event,
            disableVehiclebtn: false
          });
          this.setListName(event);
        }
        break;
      case "noVehicleTypeUser":
        if (event == "-- Please Select Type of Users --") {
          this.setState({
            userTypeSelected: "",
            items: [],
            listName: "",
            disableNoVehiclebtn: true
          });
        } else {
          this.setState({
            userTypeSelected: event,
            disableNoVehiclebtn: false
          });
          this.setNoVehileListName(event);
        }
        break;
    }
  }

  public btnType(res) {
    let htmlChunk;
    if (!res) {
      htmlChunk = <React.Fragment>
        <div className="form-group">
          <button type="button"
            className="btn btn-primary" style={{ marginLeft: "15px" }}
            disabled={(this.state.disableVehiclebtn) == true}
            onClick={this.vehilce_HandleonClick}>
            <FontAwesomeIcon icon={faCheckCircle} className={vehicleStyles.awesomeIconStyle} />
            <span> Vehicle Reports</span>
          </button>
        </div>
      </React.Fragment>;
    } else {
      htmlChunk = <React.Fragment>
        <div className="form-group">
          <button type="button"
            className="btn btn-primary" style={{ marginLeft: "15px" }}
            disabled={(this.state.disableNoVehiclebtn) == true}
            onClick={this.noVehilce_HandleonClick}>
            <FontAwesomeIcon icon={faCheckCircle} className={vehicleStyles.awesomeIconStyle} />
            <span> No Vehicle Reports</span>
          </button>
        </div>
      </React.Fragment>;
    }
    return htmlChunk;
  }

  public returnError(res) {
    if (res !== "Initial Load") {
      this.errorComponent = <div className="row">
        <Error />
      </div>;
      return this.errorComponent;
    }
    else {
      this.errorComponent = null;
      return this.errorComponent;
    }
  }

  public onCheckBoxSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.refCountry.current.value = "-- Please Select Country --";
    this.refLocation.current.value = "-- Please Select Location --";
    console.log(this.refCountry.current.value);
    if (event.target.checked == true) {
      this.refUserWithVehicle.current.value = "-- Please Select Type of Users --";
      this.setState({
        chkBoxChecked: true, vehicleExist: false,
        items: [],
        disableNoVehiclebtnh: false,
        disableVehiclebtnh: false, noDateWithGivenFilters: false
      });
    } else {
      this.refUserWithOutVehicle.current.value = "-- Please Select Type of Users --";
      this.setState({
        chkBoxChecked: false, vehicleExist: true,
        items: [], noDateWithGivenFilters: false,
        disableNoVehiclebtnh: true,
        disableVehiclebtnh: true
      });
    }
  }
  public noData(res) {
    if (!res) {
      return <React.Fragment>
        <div className="container" style={{ marginTop: "10px" }}>
          <div className="alert alert-danger">
            <strong>No Vehicles are available!</strong> with selected filters.
            </div>
        </div>
      </React.Fragment>;
    }
  }

  public render(): React.ReactElement<IIncyteVehicleReportsProps> {
    return (
      <div className={vehicleStyles.incyteVehicleReports}>
        <br/>
        <div className="row">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <h3 className="panel-title" style={{ margin: "0!important" }}>
                <FontAwesomeIcon icon={faChartBar} className={vehicleStyles.awesomeIconStyle} />
                <span> Vehicle Reports</span>
              </h3>
            </div>
            <div className="panel-body">
              <div className="row">
                <div className="container">
                  <div className="col-sm-6 col-md-4 col-lg-3">
                    {(this.state.chkBoxChecked == true) ? this.publickDDTypes(true) : this.publickDDTypes(false)}
                  </div>
                  <div className="col-sm-6 col-md-4 col-lg-3">
                    <div className="form-group">
                      <label>Country</label>
                      <select className="form-control"
                        onChange={(val => this.handleChange(val, "country"))}
                        ref={this.refCountry}>
                        {
                          this.state.countriesOptions.map((item, i) => {
                            return (
                              <option key={i} value={item.key}>{item.text}</option>
                            );
                          })
                        }
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-4 col-lg-3">
                    <div className="form-group">
                      <label>Location</label>
                      <select className="form-control"
                        ref={this.refLocation}
                        onChange={(val => this.handleChange(val, "location"))} >
                        {
                          this.state.locationsOptions.map((e, key) => {
                            return <option key={key} value={e.key}>{e.text}</option>;
                          })
                        }
                      </select>
                    </div>
                  </div>
                </div>
                <div className="container">
                  <div className="col-sm-12 col-md-12 col-lg-12">
                    <div className="form-group">
                      <label className="checkbox-inline">
                        <input type="checkbox"
                          defaultChecked={this.state.chkBoxChecked}
                          onChange={this.onCheckBoxSelected} />
                        Please select the check box to generate users with no vehicle information
                    </label>
                    </div>
                  </div>
                </div>
                <div className={`${vehicleStyles.divide} row`}>
                  <div className="col-sm-12 col-md-12 col-lg-12" style={{ marginLeft: "10px!important" }}>
                    {(this.state.chkBoxChecked == true) ? this.btnType(true) : this.btnType(false)}
                  </div>
                </div>
                <div className="container">
                  {(this.state.noDateWithGivenFilters == true) ? this.noData(false) : this.noData(true)}
                </div>
              </div>
              <div className="row">
                {this.errorComponent}
              </div>
              {/* New div Start */}
              <div className="row">
                <div className="row">
                  <div className="col-sm-12 col-md-12 col-lg-12">
                    {this.state.loadGif ? <img style={{margin:"auto", display:"block" , textAlign:"center"}} src="/sites/Dev1/SiteAssets/Reports/Loading.gif" /> : null}
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12 col-md-12 col-lg-12">
                    <All vehicles={this.state.items} vehicleExist={this.state.vehicleExist} />
                  </div>
                </div>
              </div>
              {/* New div end */}
            </div>
          </div>

        </div>
      </div>
    );
  }

  public vehilce_HandleonClick() {
    if (event.preventDefault) event.preventDefault();
    else event.returnValue = false;
    //event.preventDefault();
    this.setState({ loadGif: true, noDateWithGivenFilters: false });
    let countries = this.state.countriesSelected !== undefined ? this.state.countriesSelected : null;
    let locations = this.state.locationSelected !== undefined ? this.state.locationSelected : null;
    if (this.state.listName !== "") {
      let filter = this.getfilter(countries, locations);
      if (this.state.listName !== "All") {
        this.getListItems(this.state.listName, filter);
      }
      else {
        this.getAll(filter);
      }

    } else {
      this.returnError(this.state.listName);
    }
  }

  public noVehilce_HandleonClick() {
    this.setState({ loadGif: true, noDateWithGivenFilters: false });
    if (event.preventDefault) event.preventDefault();
    else event.returnValue = false;
    let countries = this.state.countriesSelected !== undefined ? this.state.countriesSelected : null;
    let locations = this.state.locationSelected !== undefined ? this.state.locationSelected : null;
    if (this.state.listName !== "") {
      let filter = this.getfilter(countries, locations);
      if (this.state.listName !== "All") {
        this.geNoVehicleListItems(this.state.listName, filter);
      }
      else {
        this.getNoVehicleAll(filter);
      }

    } else {
      this.returnError(this.state.listName);
    }
  }

  public loadDropDowns(): any {
    sp.web.lists.getByTitle("Country").items.select("ID", "Title").orderBy("Title", true).get().then(d => {
      for (let index = 0; index < d.length; index++) {
        let obj = {
          key: d[index].Title, text: d[index].Title
        };
        this.ddCoun.push(obj);
      }
      this.setState({
        countriesOptions: this.ddCoun
      });
      console.log(this.state.countriesOptions);
    });
    sp.web.lists.getByTitle("Location").items.select("ID", "Title").orderBy("Title", true).get().then(d => {
      for (let index = 0; index < d.length; index++) {
        let obj = {
          key: d[index].Title, text: d[index].Title
        };
        this.ddLoc.push(obj);
      }
      this.setState({
        locationsOptions: this.ddLoc
      });
      console.log(this.state.locationsOptions);
    });
  }

  public getfilter(countries, locations): any {
    let filterCountries = ''; let filterLocation = '';
    if (countries.length !== 0) {
      if (countries !== "Blank") {
        filterCountries = "Country eq " + "'" + countries + "'";
      } else {
        filterCountries = this.countryBlankFilter();
      }
    } else {
      filterCountries = '';
    }
    if (locations.length !== 0) {
      if (locations !== "Blank") {
        filterLocation = (filterCountries !== '') ? filterCountries + " and Location eq " + "'" + locations + "'" : "Location eq " + "'" + locations + "'";
      } else {
        let loc = this.locationBlankFilter();
        filterLocation = (filterCountries !== '') ? filterCountries + " and " + loc : loc;
      }
    } else {
      filterLocation = (filterCountries !== '') ? filterCountries : "";
    }
    return filterLocation;
  }

  public setListName(res) {
    switch (res) {
      case "All":
        this.setState({
          listName: "All"
        });
        break;
      case "Employees only":
        this.setState({
          listName: "Vehicle Information"
        });
        break;
      case "Contractors only":
        this.setState({
          listName: "Consultant Vehicle Information"
        });
        break;
      case "Guests only":
        this.setState({
          listName: "Guest Vehicle Information"
        });
        break;
    }
  }

  public setNoVehileListName(res) {
    switch (res) {
      case "All":
        this.setState({
          listName: "All"
        });
        break;
      case "Employees only":
        this.setState({
          listName: "employee with out Vehicle Information"
        });
        break;
      case "Contractors only":
        this.setState({
          listName: "consultants with out Vehicle Information"
        });
        break;
    }
  }

  public getNoVehicleAll(filter): any {
    let allItems = [];
    let allListies = ["employee with out Vehicle Information", "consultants with out Vehicle Information"];
    for (let index = 0; index < allListies.length; index++) {
      const listName = allListies[index];
      sp.web.lists.getByTitle(listName).items.select().filter(filter).getAll(4000).then(d => {
        allItems.push(d);
        if (allItems.length == 2) {
          allItems = [...allItems[0], ...allItems[1]];
          this.setState({ loadGif: false, items: allItems });
          if (allItems.length == 0) {
            this.setState({ noDateWithGivenFilters: true });
          }
        }
      });
    }
  }

  public geNoVehicleListItems(listName, filter) {
    if (this.state.items.length !== 0) {
      this.setState({ items: [] });
    }
    let selectColumns = (listName == "employee with out Vehicle Information") ? NoVehicleEmployeeColumns : ((listName == "consultants with out Vehicle Information") ? NoVehicleConsultentColumns : '');
    sp.web.lists.getByTitle(listName).items.select(selectColumns).filter(filter).getAll(4000).then(d => {
      console.log("List Name:- " + listName + "  Data Response :-" + d);
      this.setState({ loadGif: false, items: d });
      if (d.length == 0) {
        this.setState({ noDateWithGivenFilters: true });
      }
    });
  }

  public getListItems(listName, filter): any {
    if (this.state.items.length !== 0) {
      this.setState({ items: [] });
    }
    let selectColumns = (listName == "Vehicle Information") ? EmployeeColumns : ((listName == "Consultant Vehicle Information") ? ConsultentColumns : GuestColumns);
    sp.web.lists.getByTitle(listName).items.select(selectColumns).filter(filter).getAll(4000).then(d => {
      console.log("List Name:- " + listName + "  Data Response :-" + d);
      this.setState({ loadGif: false, items: d });
      if (d.length == 0) {
        this.setState({ noDateWithGivenFilters: true });
      }
    });
  }

  public getAll(filter): any {
    let allItems = [];
    let allListies = ["Vehicle Information", "Consultant Vehicle Information", "Guest Vehicle Information"];
    for (let index = 0; index < allListies.length; index++) {
      const listName = allListies[index];
      sp.web.lists.getByTitle(listName).items.select().filter(filter).getAll(4000).then(d => {
        allItems.push(d);
        if (allItems.length == 3) {
          allItems = [...allItems[0], ...allItems[1], ...allItems[2]];
          this.setState({ loadGif: false, items: allItems });
          if (allItems.length == 0) {
            this.setState({ noDateWithGivenFilters: true });
          }
        }
      });
    }
  }

  public locationBlankFilter() {
    let location = this.ddLoc.filter(l => (l.key != "-- Please Select Location --") && (l.key != "Blank"));
    let flt = '';
    for (let index = 0; index < location.length; index++) {
      if (index == 0) {
        flt += "(Location ne " + "'" + location[index].text + "')";
      }
      else {
        flt += " and (Location ne " + "'" + location[index].text + "')";
      }
    }
    console.log(flt);
    return flt;
  }

  public countryBlankFilter() {
    let countries = this.ddCoun.filter(c => (c.key != "-- Please Select Country --") && (c.key != "Blank"));
    let flt = '';
    for (let index = 0; index < countries.length; index++) {
      if (index == 0) {
        flt += "(Country ne " + "'" + countries[index].text + "')";
      }
      else {
        flt += " and (Country ne " + "'" + countries[index].text + "')";
      }
    }
    console.log(flt);
    return flt;
  }
}


 // "jquery": {
    //   "path": "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js",
    //   "globalName": "jquery"
    // },
    // "bootstrap": {
    //   "path": "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js ",
    //   "globalName": "bootstrap",
    //   "globalDependencies": [
    //     "jquery"
    //   ]
    // }