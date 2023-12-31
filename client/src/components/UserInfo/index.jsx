/* eslint-disable react/prop-types */
import React from 'react';
import styles from './UserInfo.module.scss';

export function UserInfo({ profilePic, fullName, additionalText }) {
  return (
      <div className={styles.root}>
          <img className={styles.avatar} src={profilePic || '/noavatar.png'} alt={fullName} />
          <div className={styles.userDetails}>
              <span className={styles.userName}>{fullName}</span>
              <span className={styles.additional}>{additionalText}</span>
          </div>
      </div>
  );
}
