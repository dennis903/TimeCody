import { type FC } from 'react';

import AppLayout from '../../layout/app.layout';
import { Link } from 'react-router-dom';

import timeCodyLogo from '../../../assets/img/Time-cody-logo.png';
import naverLogo from '../../../assets/img/naver.png';
import kakaoLogo from '../../../assets/img/kakao.png';
import googleLogo from '../../../assets/img/google.png';

const LoginPage: FC = () => {
  return (
    <AppLayout>
      <header className="header">
        <img src={timeCodyLogo} className="logo" />
        <h1 className="title">Time Cody</h1>
      </header>
      <main className="main">
        <div className="contents">
          <div className="login">
            <Link to="/account/login" className="link">
              로그인
            </Link>
            <div className="link-group">
              <Link
                to={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${import.meta.env.VITE_NAVER_CLIENT_ID}&state=success&redirect_uri=${import.meta.env.VITE_OAUTH_REDIRECT_URI}`}
                className="oauth-link"
              >
                <img src={naverLogo} className="oauth-link__img" />
              </Link>
              <a href="#" className="oauth-link">
                <img src={kakaoLogo} className="oauth-link__img" />
              </a>
              <a href="#" className="oauth-link">
                <img src={googleLogo} className="oauth-link__img" />
              </a>
            </div>
            <a href="#" className="link">
              회원가입
            </a>
          </div>
        </div>
      </main>
      <footer className="footer">
        <a href="#" className="link link--theme-1">
          게스트 로그인
        </a>
      </footer>
    </AppLayout>
  );
};

export default LoginPage;
