export default {
  apiUrl: 'http://yoursite.com/api/',
};

const siteConfig = {
  siteName: 'ISOMORPHIC',
  siteIcon: 'ion-flash',
  footerText: 'Isomorphic ©2018 Created by RedQ, Inc',
};
const themeConfig = {
  topbar: 'themedefault',
  sidebar: 'themedefault',
  layout: 'themedefault',
  theme: 'themedefault',
};
const language = 'english';

const jwtConfig = {
  fetchUrl: '/api/',
  secretKey: 'secretKey',
};

const firebaseConfig = {
    apiKey: "AIzaSyAICFMHRwa9-nFUE-rBfV1fbH761NfwaJ8",
    authDomain: "fire-react-4d13f.firebaseapp.com",
    databaseURL: "https://fire-react-4d13f.firebaseio.com",
    projectId: "fire-react-4d13f",
    storageBucket: "fire-react-4d13f.appspot.com",
    messagingSenderId: "352987599968"
};

export { siteConfig, language, themeConfig, jwtConfig, firebaseConfig };
