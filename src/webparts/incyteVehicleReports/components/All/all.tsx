import * as React from 'react';
import styles from './all.module.scss';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { ExporttoExcel } from '../ExportToExcel/export';
import { HTMLColumnsWithVehicle, HTMLColumnsWithOutVehicle } from '../Common/Model';
import 'office-ui-fabric-react/dist/css/fabric.css';
// import './fabriccomponent.css';
import 'core-js/es6/number';
import 'core-js/es6/array';

export class All extends React.Component<any, any>{

  public constructor(props: any, state: any) {
    super(props);
    this.htmlPanel = this.htmlPanel.bind(this);
  }

  public htmlPanel() {
    const count = this.props.vehicles.length;
    let vehicleExist = (!(this.props.vehicleExist) ? HTMLColumnsWithOutVehicle : HTMLColumnsWithVehicle);
    if (count != 0) {
      let bdy = <div className={styles.container}>
        <div className={styles.exportRow}>
          <ExporttoExcel data={this.props.vehicles} />
        </div>
        <div className={styles.exportRow}>
          <ReactTable
            columns={vehicleExist}
            data={this.props.vehicles}
            showPaginationTop={true}
            noDataText={"Please Wait"}
            defaultPageSize={5}
          >
          </ReactTable>
        </div>
      </div>;
      return bdy;
    }
  }

  public render(): React.ReactElement<any> {
     var finalDom = this.htmlPanel();
    return (
      <div className={styles.all}>
        {finalDom}
      </div>
    );
  }
}
