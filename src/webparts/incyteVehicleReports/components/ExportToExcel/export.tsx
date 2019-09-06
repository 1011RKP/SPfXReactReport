import * as React from 'react';
import styles from './export.module.scss';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library, icon } from '@fortawesome/fontawesome-svg-core';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import 'core-js/es6/number';
import 'core-js/es6/array';

export class ExporttoExcel extends React.Component<any, any>{
  public constructor(props: any, state: any) {
    super(props);
    this.exportAsExcelFile = this.exportAsExcelFile.bind(this);
  }

  public fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  public fileExtension = '.xlsx';

  public exportAsExcelFile(e, res, fileName: string): void {
    if (e.preventDefault) e.preventDefault();
    else e.returnValue = false;
    const ws = XLSX.utils.json_to_sheet(res);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: this.fileType });
    FileSaver.saveAs(data, fileName + this.fileExtension);
  }

  public render(): React.ReactElement<any> {
    let vehicleDetailes: any = this.props;
    console.log(vehicleDetailes);

    return (
      <div className={styles.export}>
        <div className="row">
          <button className={`${styles.pullRight} btn btn-success`}
            onClick={(e) => this.exportAsExcelFile(e, vehicleDetailes.data, "Vehicle Reports")}>
            <FontAwesomeIcon icon={faDownload} />
            <span> Download Reports</span>
          </button>
        </div>
      </div>
    );
  }
}
