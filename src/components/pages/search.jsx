import React from 'react';
import useAsyncAction from '../../hooks/use-async-action/use-async-action';
import { Formik, Form } from 'formik';
import Input from '../utils/form/input';
import Flag from './flag';
import { Link } from 'react-router-dom';

const Search = ({ accessToken = null, username = 'supeerpuperadmin' }) => {
  const [asyncAction] = useAsyncAction();

  return (
    <>
      <Formik
        // enableReinitialize
        initialValues={{ search: '' }}
        onSubmit={async (values) => {
          const { search } = values;

          const config = {
            method: 'get',
            url: `/file?filename=${search}`,
            accessToken: 'something',
          };

          const data = await asyncAction(config);

          // if (data) setData(data.masters);
        }}>
        {({ submitForm, handleChange }) => (
          <Form className="search">
            <div className="heading search__heading">File System</div>

            <div className="label mb-s-1">Search file</div>
            <Input
              onChange={(e) => {
                handleChange(e);
                submitForm();
              }}
              type="text"
              className="input search__input"
              name="search"
            />
            <p className="search__text mt-s-1">
              {accessToken ? (
                <>You are authorized successfully, {username}</>
              ) : (
                <>
                  <Link to="/sign-in">
                    <span className="btn-text search__btn-text">Sign in</span>
                  </Link>{' '}
                  to authorize yourself
                </>
              )}
            </p>
          </Form>
        )}
      </Formik>
      {accessToken && <Flag className="search__flag" />}
    </>
  );
};

export default Search;
