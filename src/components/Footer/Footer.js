import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className='footer'>
      <a
        className='footer__source'
        href='https://github.com/pmnord/todo-management-react-capstone-client'
        target='_blank'
        rel='noopener noreferrer'
      >
        <p className='source__p'>View Source on </p>
        <img
          className='source__img'
          src={require('../../assets/GitHub_Logo.png')}
          alt='GitHub'
        ></img>
      </a>
    </footer>
  );
}
