import React, { useState ,useEffect } from 'react';
import styles from './css/css.module.less';
import { Dropdown, Tab, Table, Label } from 'semantic-ui-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Tooltip } from 'react-leaflet'
import { useTranslation } from 'react-i18next';
import L from 'leaflet';
import { connect } from '../../reducers';

const BusMap = (props) => {
  const { dispatch, busState } = props;
  const { t } = useTranslation();
  const { 
    stopName = [],
    direction = 0,
  } = busState;

  useEffect(() => {
    
  }, [direction])

  console.log(stopName[direction][0].stopPosition)
  const limeOptions = { color: '#39A85C' }
  let polyline = [];

  return (
    <div className="bus-map">
      <MapContainer 
        center={stopName[direction][0].stopPosition}
        zoom={15}
        scrollWheelZoom={true}
      >
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {stopName[direction].map((item, index) => {
          const text = L.divIcon({render: (<Label as='a'>{item.num}</Label>)});

          polyline.push(item.stopPosition);
          return (
            <Marker position={item.stopPosition}  icon={text}>
              <Popup>
                {`${item.num}.${item.text}`}
                <br />
                <a target="_blank" href={`https://www.google.com.tw/maps/search/${item.text}/@17z`}>{t('bus.DetailedInformation')}</a>
              </Popup>
              {index === 0 && (
                <Tooltip direction="bottom" offset={[0, 20]} opacity={1} permanent>
                  {t('bus.start')}
                </Tooltip>
              )}
              {index === (stopName[direction].length - 1) && (
                <Tooltip direction="bottom" offset={[0, 20]} opacity={1} permanent>
                  {t('bus.end')}
                </Tooltip>
              )}
            </Marker>
          );
        })}
         <Polyline pathOptions={limeOptions} positions={polyline} />
      </MapContainer>
    </div>
  );
}

const mapStateToProps = (state) => ({
  busState: state.busReducer,
});

export default connect(mapStateToProps)(BusMap);
