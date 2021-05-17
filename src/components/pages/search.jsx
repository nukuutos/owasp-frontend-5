import React, { useEffect } from 'react';
import Cookie from 'js-cookie';
import useAsyncAction from '../../hooks/use-async-action/use-async-action';
import { Formik, Form } from 'formik';
import Input from '../utils/form/input';
import Flag from './flag';
import { Link } from 'react-router-dom';

const Search = ({ token, setToken, setAlerts }) => {
  const [asyncAction] = useAsyncAction();

  useEffect(() => {
    const checkToken = async () => {
      const config = {
        method: 'post',
        url: `/auth/check`,
        accessToken: Cookie.get('accessToken') || null,
      };

      const data = await asyncAction(config, setAlerts);
      if (data) setToken(Cookie.get('accessToken'));
    };

    if (Cookie.get('accessToken')) checkToken();
  }, []);

  return (
    <>
      <Formik
        initialValues={{ search: '' }}
        onSubmit={async (values) => {
          const { search } = values;

          const config = {
            method: 'get',
            url: `/file?filename=${search}`,
            accessToken: Cookie.get('accessToken') || null,
          };

          const data = await asyncAction(config, setAlerts, setToken);

          if (data && data.message) setAlerts((alerts) => [...alerts, { message: data.message, status: 200 }]);
          if (data && data.message && !token) setToken(Cookie.get('accessToken'));
        }}>
        {({ isSubmitting }) => (
          <Form className="search">
            <div className="heading search__heading">File System</div>

            <div className="label mb-s-1">Search file</div>
            <Input type="text" className="input search__input" name="search" />
            <p className="search__text mt-s-1">
              {token ? (
                <>You are authorized successfully</>
              ) : (
                <>
                  <Link to="/sign-in">
                    <span className="btn-text search__btn-text">Sign in</span>
                  </Link>{' '}
                  to authorize yourself
                </>
              )}
            </p>

            <button
              type="submit"
              className={`search__submit btn btn--flat btn--primary ${
                isSubmitting ? 'btn--submitted btn--spinner' : ''
              } mt-s-2`}>
              search
            </button>
          </Form>
        )}
      </Formik>
      {token && <Flag className="search__flag" />}
    </>
  );
};

export default Search;
