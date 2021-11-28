import React, { useEffect } from 'react';
import { Table } from 'semantic-ui-react';
import moment from 'moment';
import { connect } from '../../reducers';

import { selectDirection } from './action';

const BusTables = (props) => {

  const { data, nextBusTimes, direction = 0, dispatch } = props;

  useEffect(()=>{
    dispatch(selectDirection(direction));
  }, [direction])
  

  return (
    <>
      <Table celled fixed singleLine>
        <Table.Header className="table-header">
        <Table.Row>
          <Table.HeaderCell>序</Table.HeaderCell>
          <Table.HeaderCell>預估到站時間</Table.HeaderCell>
          <Table.HeaderCell>站牌</Table.HeaderCell>
          <Table.HeaderCell>車牌</Table.HeaderCell>
        </Table.Row>
        </Table.Header>
      </Table>
      <div className="scroll-table">
        <Table celled fixed singleLine>
          <Table.Body  className="table-body">
            {data && (data.map((item, index) => {

              let nextTime = '未靠站'; 

              if(nextBusTimes[item.key]){
                nextTime = moment(nextBusTimes[item.key][0].nextBusTime).format('LT');

                if(nextBusTimes[item.key].length > 1) {
                  nextTime = moment(nextBusTimes[item.key][direction].nextBusTime).format('LT');
                }  
              }
              
              return (
                <Table.Row key={index}>
                  <Table.Cell>{item.num}</Table.Cell>
                  <Table.Cell>{nextTime}</Table.Cell>
                  <Table.Cell>{item.text}</Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
              )
            }))}
          </Table.Body>
        </Table>
      </div>  
    </>
  );
}

const mapStateToProps = (state) => ({
  busState: state.busReducer,
});

export default connect(mapStateToProps)(BusTables);
