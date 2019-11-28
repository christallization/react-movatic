import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory from 'react-bootstrap-table2-filter';

const BikeTable = ({ stations, columns, expandRow }) => {

    const customTotal = (from, to, size) => (
      <span className="react-bootstrap-table-pagination-total">
        Showing { from } to { to } of { size } Stations
      </span>
    );

    const options = {
      paginationSize: 4,
      pageStartIndex: 1,
      // alwaysShowAllBtns: true, // Always show next and previous button
      // withFirstAndLast: false, // Hide the going to First and Last page button
      // hideSizePerPage: true, // Hide the sizePerPage dropdown always
      hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
      firstPageText: 'First',
      prePageText: 'Back',
      nextPageText: 'Next',
      lastPageText: 'Last',
      nextPageTitle: 'First page',
      prePageTitle: 'Pre page',
      firstPageTitle: 'Next page',
      lastPageTitle: 'Last page',
      showTotal: true,
      paginationTotalRenderer: customTotal,
      sizePerPageList: [{
        text: '10', value: 10
      }, {
        text: '25', value: 25
      }, {
        text: '50', value: 50
      }, {
        text: '100', value: 100
      }, {
        text: 'All', value: stations.length
      }] // A numeric array is also available. the purpose of above example is custom the text
    };

    return (
        
      <div className="page_wrapper">
        
        <h3 className='tableHeader'>NYC’s Citi Bike Stations</h3>

        <BootstrapTable 
          //bootstrap4 
          keyField='id' 
          data={ stations } 
          columns={ columns } 
          expandRow={ expandRow } 
          pagination={ paginationFactory(options) } 
          filter={ filterFactory() }
        />
        
      </div>
      
    );
  
}

export default BikeTable
