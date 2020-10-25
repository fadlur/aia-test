import ReactGA from 'react-ga';

export const logPageView = () => {
  ReactGA.initialize(process.env.GA_UA);
  ReactGA.set({page: window.location.pathname})
  ReactGA.pageview(window.location.pathname);
}