// TODO this tutorial
// https://www.youtube.com/watch?v=MAw0lQKqjRA

import { Form, Formik } from 'formik';
import React from 'react'
import { array, object, string } from 'yup';

// import DropZoneMulti from '../components/DropZoneMulti'

const DropZoneForm = () => {


  return (
    <>
    <h1>DropZone Form .tsx</h1>
    <Formik
      initialValues={{ files: [] }}
      validationSchema={object({
        files: array(
          object({
            url: string().required(),
          })
        ),
      })}
      onSubmit={(values) => {
        console.log('values', values);
        // TODO save to axios?
        return new Promise((res) => setTimeout(res, 2000));
      }}
    >
      {({ values, errors, isValid, isSubmitting }) => (
        <Form>
          <div className='grid'>

            {/* <DropZoneMulti name="files" /> */}
            {/* <DropZoneMulti /> */}

            <div className='grid'>
              <button
                color="primary"
                disabled={!isValid || isSubmitting}
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>

          <pre>{JSON.stringify({ values, errors }, null, 4)}</pre>
        </Form>
      )}
    </Formik>
    </>
  )
}

export default DropZoneForm