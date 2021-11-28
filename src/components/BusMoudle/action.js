import request from '../../default/request';

export const getRouteNameList = (city) => async (dispatch) => { // getStore
  const out = await request('GET', `/v2/Bus/Route/City/${city}`);

  if (out) {
    let routeList = [];
    let typeList = [];

    out.forEach((item, index) => {

      // if(!routeList[item.Operators[0].OperatorName.Zh_tw]) {
      //   routeList[item.Operators[0].OperatorName.Zh_tw] = [];
      //   typeList.push({
      //     key:index,
      //     text: item.Operators[0].OperatorName.Zh_tw,
      //     value: item.Operators[0].OperatorName.Zh_tw,
      //   });
      // }
      const {
         BusSubRoute = {}, 
         DepartureStopNameZh = '',
         DestinationStopNameZh = '',
         RouteName,
         } = item;
      const {
        FirstBusTime='',
        LastBusTime='',
        HolidayFirstBusTime='',
        HolidayLastBusTime='',
        
       } = BusSubRoute;
    
      routeList.push({
        key:index,
        text: `[${RouteName.Zh_tw}] ${DepartureStopNameZh} - ${DestinationStopNameZh}`,
        value: RouteName.Zh_tw,
        BusTime: [FirstBusTime, LastBusTime],
        HolidayBusTime: [HolidayFirstBusTime , HolidayLastBusTime],
      })
    });

    console.log(routeList)
    dispatch({
      type: 'BUS_GET_ROUTER_NAME',
      data: routeList,
      city,
      typeList,
      
    });
  }
  
};

export const selectDirection = (data) => (dispatch) => {
  
  dispatch({
    type: 'BUS_SET_SELECT_DIRECTION',
    data,
  });

};

export const searchBus = (data) => async (dispatch, getStore) => {
  const { busReducer } = getStore();
  const { city } = busReducer;
  const out = await request('GET', `/v2/Bus/DisplayStopOfRoute/City/${city}/${data}`, {top: 2});

  if (out) {
    const busData = [];

    out.forEach((item, index) => {
      const { Stops, RouteName , Direction } = item;
      
      if (index > 1) {

        return;
      }

      if (!busData[Direction]) {
        busData[Direction] = [];
      }

      Stops.forEach((item, index) => {
        const { StopUID = '', StopName = {}, StopPosition} = item;
        
        busData[Direction].push({
          num: index + 1,
          key: StopUID,
          text: StopName.Zh_tw,
          value: StopName.Zh_tw,
          stopPosition: [
            StopPosition.PositionLat,
            StopPosition.PositionLon, 
          ]
        })
      });

    });

    dispatch({
      type: 'BUS_GET_BUS_STOP_NAME',
      data: busData,
    });
  }

  const out2 = await request('GET', `/v2/Bus/EstimatedTimeOfArrival/City/${city}/${data}`);

  let nextBusTimes = [];

  if (out2) {
    out2.forEach((item, index) => {
      const { StopUID, NextBusTime, Direction } = item;
      

      if (!nextBusTimes[StopUID]) {
        nextBusTimes[StopUID] = [];
      }

      nextBusTimes[StopUID].push({
        direction: Direction,
        nextBusTime: NextBusTime,
      })

    });

    dispatch({
      type: 'BUS_GET_BUS_NEXT_TIME',
      data: nextBusTimes,
    });
  }
};
