import * as React from 'react';
import styles from './error.module.scss';


export class Error extends React.Component<any, any>{
    public constructor(props: any, state: any) {
        super(props);
    }
    public render(): React.ReactElement<any> {
        return (
            <React.Fragment>
                <div className="container">
                    <h2>Alerts</h2>
                    <div className="alert alert-success">
                        <strong>Success!</strong> This alert box could indicate a successful or positive action.
                    </div>
                    <div className="alert alert-info">
                        <strong>Info!</strong> This alert box could indicate a neutral informative change or action.
                    </div>
                    <div className="alert alert-warning">
                        <strong>Warning!</strong> This alert box could indicate a warning that might need attention.
                    </div>        
                    <div className="alert alert-danger">
                        <strong>Danger!</strong> This alert box could indicate a dangerous or potentially negative action.
                    </div>
                </div>
            </React.Fragment>
        );
    }

}