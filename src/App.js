import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Report from 'react-powerbi';
//import { Report } from 'powerbi-report-component';
import axios from 'axios';
import powerbi from 'powerbi-client'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      embedToken: ''
    }
  }

  onEmbedded(embed) {
    console.log(`Report embedded: `, embed, this);
  }

  async getEmbedToken() {
    const localDevUrl = 'http://localhost:3000';
    const localDevServerUrl = 'http://localhost:4000';
    const hostname = window.location.href.indexOf(localDevUrl) === 0 ? localDevServerUrl : '';
    const endpoint = `${hostname}/powerbi-embedtoken`;
    axios.get(endpoint).then((response) => {
      const embedToken = response.data;
      this.setState({
        embedToken: embedToken
      });

    })
    .catch((error) => {
        console.log(error);
    });
  }

  async componentWillMount() {
    await this.getEmbedToken();
  }

  render() {
    const groupId = 'c22eb093-75e7-4d99-b6bd-55e1f3fec916';
    const reportId = 'b5f06fb4-9615-4385-b634-b662cadedb70';
    const embedUrl = `https://app.powerbi.com/reportEmbed?reportId=${reportId}&groupId=${groupId}`;
    const { embedToken } = this.state;
    const models = powerbi.models;

    return (
      <div className="App">
        <header className="App-header">
           <h1 className="App-title"> PowerBI integration within React</h1>
         </header>

        {embedToken && 
          
             <Report
                type='report'
                id={reportId}
                tokenType={models.TokenType.Embed}
                embedUrl={embedUrl}
                accessToken={embedToken}
                filterPaneEnabled={false}
                navContentPaneEnabled={false}
                onEmbedded={this.onEmbedded}
            /> 
            // <Report
            //     tokenType="Embed" // "Aad"
            //     accessToken={embedToken} // accessToken goes here
            //     embedUrl={embedUrl} // embedUrl goes here
            //     embedId={reportId} // report or dashboard Id goes here
            //     //pageName="" // set as current page of the report
            //     reportMode="view" // open report in a particular mode view/edit/create
            //     // datasetId={datasetId} // required for reportMode = "create" and optional for dynamic databinding in `report` on `view` mode
            //     // extraSettings={extraSettings}
            //     // permissions="All" // View
            //     // style={reportStyle}
            //     // onLoad={this.handleReportLoad}
            //     // onRender={this.handleReportRender} // not allowed in `create`
            //     // onSelectData={this.handleDataSelected}
            //     // onPageChange={this.handlePageChange}
            //     // onTileClicked={this.handleTileClicked}
            //     // onSave={this.handleReportSave} // works for edit and create
            // />
          
        }
      </div>
    );
  }
}

export default App;
