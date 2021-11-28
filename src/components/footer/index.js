import React from 'react';
import styles from './css.module.less';
import { Grid, Image, Menu, Input, Button } from 'semantic-ui-react';
import logo from '../../assets/image/141881.jpg'
function Footer() {
  return (
    <footer className={styles.App_footer}>
     <Grid padded className={styles.App_header}>
      <Grid.Column width={16}>
        <Menu secondary>
            <Menu.Item position='left'>
              <Image src={logo} />
            </Menu.Item>
            <Menu.Item position='right'>
              <Menu vertical>
                <Menu.Item>
                  <Menu.Header>公車資訊</Menu.Header>
                  <Menu.Menu>
                    <Menu.Item name='公車動態' />
                    <Menu.Item name='路線規劃' />
                    <Menu.Item name='附近站點' />
                  </Menu.Menu>
                </Menu.Item>

                <Menu.Item>
                  <Menu.Header>最新消息</Menu.Header>
                  <Menu.Menu>
                    <Menu.Item name='緊急通知' />
                    <Menu.Item name='班次異動' />
                    <Menu.Item name='活動公告' />
                  </Menu.Menu>
                </Menu.Item>

                <Menu.Item>
                  <Menu.Header>其他資訊</Menu.Header>
                  <Menu.Menu>
                    <Menu.Item name='常見問題' />
                    <Menu.Item name='公車聯名' />
                    <Menu.Item name='聯絡我們' />
                  </Menu.Menu>
                </Menu.Item>

              </Menu>
            </Menu.Item>
          </Menu>
        </Grid.Column>
      </Grid>
      <div className="copyright">©2021 全臺公車動態. All Rights Reserved</div>
    </footer>
  );
}

export default Footer;
