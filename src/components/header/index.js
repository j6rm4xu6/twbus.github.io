import React from 'react';
import { Grid, Image, Menu, Input, Button } from 'semantic-ui-react';
import MenuList from '../menu';
import styles from './css.module.less';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

import logo from '../../assets/image/141881.jpg'

function Header() {
  const { t } = useTranslation();
  const changeLanguage = (lng) => {
    Cookies.set('lang', lng);
    i18n.changeLanguage(lng);
  };

  return (
    <div className={styles.App_header}>
      <div className={styles.wrap_content}>
        <Grid padded className={styles.App_header}>
          <Grid.Column width={16}>
            <Menu secondary>
              <Menu.Item position='left'>
                <Image src={logo} />
              </Menu.Item>

              <Menu.Item position='right'>
                <Input className='icon' icon='search' placeholder='Search...' />
                <div className="translate-wrap">
                  <Button
                    onClick={() => {
                      Cookies.set('lang', 'zh-TW');
                      changeLanguage('zh-TW');
                    }}
                  >
                    {t('button.Traditional')}
                  </Button>
                  <Button
                    onClick={() => {
                      // setLang('en-US');
                      Cookies.set('lang', 'en-US');
                      changeLanguage('en-US');
                    }}
                  >
                    {t('button.English')}
                  </Button>
                  </div>
              </Menu.Item>
            </Menu>
          </Grid.Column>
          <Grid.Column  width={16}>
            <MenuList />
          </Grid.Column>
        </Grid>
      </div>
    </div>
  );
}

export default Header;
