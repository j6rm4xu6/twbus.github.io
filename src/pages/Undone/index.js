import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Header,
} from 'semantic-ui-react';
import Cookies from 'js-cookie';
import i18n from '../../i18n';
import styles from './css.module.less';

const UndonePage = () => {
  // 多國翻譯
  const { t } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(Cookies.get('lang') || 'zh-TW');
  }, []);

  return (
    <div className="wrap_content">
      <div className={styles.box_info}>
        <Header as="h1">
          {t('page.undone')}
        </Header>
      </div>
    </div>
  );
};

export default UndonePage;
