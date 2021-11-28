import React, { useState ,useEffect } from 'react';
import styles from './css/css.module.less';
import { Dropdown, Tab, Container, Label} from 'semantic-ui-react';
import { getCity } from './data';
import { connect } from '../../reducers';
import BusTables from './table';
import BusMap from './BusMap';
import { useTranslation } from 'react-i18next';
import {
  getRouteNameList,
  searchBus,
  selectDirection,
} from './action';
 
const BusModule = (props) => {
  const { dispatch, busState } = props;
  const { t } = useTranslation();
  const { 
    rouderName = [],
    typeList = [],
    selectType = '',
    stopName = [],
    nextBusTimes = [],
    direction = 0,
  } = busState;
  const cityOption = getCity();

  let tabData = [];
  if (stopName.length > 0){
    tabData = [
      {
        menuItem: `${t('bus.goTO')}: ${stopName[1][0].text }`,
        render: () => (
          <Tab.Pane>
            <BusTables {...props} data={stopName[0]} nextBusTimes={nextBusTimes} direction={0} />
          </Tab.Pane>),
        direction: 0,
      },
      {
        menuItem: `${t('bus.backTo')}: ${stopName[0][0].text}`,
        render: () => (
          <Tab.Pane>
            <BusTables {...props} data={stopName[1]} nextBusTimes={nextBusTimes} direction={1} />
          </Tab.Pane>),
        direction: 1,
      }
    ]
  }

  return (
    <Container className="bus-module">
      <div className="left-box">
        <div className="bus-select">
          <div className="select-input city">
            <label>{t('bus.cities')}</label>
            <Dropdown
              placeholder={t('bus.PleaseSelectACity')}
              fluid
              selection
              options={cityOption}
              onChange={(e, data) => dispatch(getRouteNameList(data.value))} //getRouteNameList(value)(dispatch)
            />
            </div>
          <div className="select-input router">
            <label>{t('bus.route')}</label>
            <Dropdown
              placeholder={t('bus.PleaseSearchForTheRoute')}
              fluid
              search
              selection
              options={rouderName}
              onChange={(e, data) => dispatch(searchBus(data.value))}
            />
          </div>
        </div>
        {stopName.length > 0 && (
          <div className="bus-table">
            {/* {rouderName.BusTime && (
              <div className="tip">
                {`＊最早車次時間${
                  rouderName.BusTime.FirstBusTime
                }/最晚車次時間${
                  rouderName.BusTime.LastBusTime
                }`}
              </div>
            )}
            {rouderName.HolidayBusTime && (
              <div className="tip">
                {`＊最早車次時間${
                  rouderName.HolidayBusTime.HolidayFirstBusTime 
                }/最晚車次時間${
                  rouderName.HolidayBusTime.HolidayLastBusTime 
                }`}
              </div>
            )} */}
            <Tab panes={tabData} />
          </div>
        )}
      </div>
      <div className="right-box">
        {stopName.length > 0 && ( <BusMap direction={direction} />)}
      </div>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  busState: state.busReducer,
});

export default connect(mapStateToProps)(BusModule);
