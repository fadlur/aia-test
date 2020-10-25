import Redirect from './shared/Redirect';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import LoadingIndicator from '../layouts/shared/LoadingIndicator';
import Cookies from 'cookies';

const withAuth = (Component) => role => {
  return props => {
    const [ itemuser, setItemUser ] = useState(null);
    const [ is_login, setIsLogin ] = useState(null);
    useEffect(() => {
      const url = '/api/v1/user';
      const loaduser = async () => {
        const [datauser] = await Promise.allSettled([
          Axios.get(url).then(r => r.data),
        ]);
  
        if (datauser.status === 'rejected') {
          setIsLogin(false);
        } else {
          setIsLogin(true);
          setItemUser(datauser.value);
        }
      }

      loaduser();
    }, [])

    if (is_login == null) {
      return <LoadingIndicator />
    } else {
      if (is_login) {
        if (itemuser != null) {
          if (role.includes(itemuser.role)) {
            return <Component itemuser={itemuser} {...props} />
          } else {
            return <Redirect ssr to="/login" />
          }
        } else {
          return <LoadingIndicator />
        }
      } else {
        return <Redirect ssr to="/login" />
      }
    }
  }
}

export default withAuth;