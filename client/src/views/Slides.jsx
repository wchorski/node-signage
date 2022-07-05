import {React, useState, useEffect} from 'react'
import {useNavigate, useLocation, Link} from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
// import Cookies from 'js-cookie'
import { MdTitle } from 'react-icons/md'

import Navbar from '../components/Navbar'
import Slide from '../components/Slide'
import SlideCreator from '../components/SlideCreator'
// import SlideEditor from '../components/SlideEditor'

// import useAxiosPrivate from "../hooks/useAxiosPrivate";
// import { StyledPostsList } from '../styles/PostsList.styled'
import CollectionPreview from '../components/CollectionPreview'
import axios from '../api/axios'
import { FaRegTrashAlt } from 'react-icons/fa'
// import { collection } from '../../../server/model/Slide'

const Slides = () => {

  // const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const [postsArray, setPosts] = useState([]);
  const [slidesState, setSlidesState] = useState([]);
  const [catsState, setCatsState] = useState([]);
  // const [roleState, setroleState] = useState('');

  const controller = new AbortController();

  const getSlides = async () => {    
    
    try {
      const response = await axios.get('/slides')
      setSlidesState(response.data);

      const res = await axios.get('/collectionname')
      setCatsState(res.data)


    } catch (err) {
      console.error(err);
      navigate('/', { state: { from: location }, replace: true });
    } 
  }

  const newCollectionName = async () => {

  }

  useEffect(() => {

    getSlides();
    // setroleState(Cookies.get('role')) 

    return () => {
      // isMounted = false;
      controller.abort();
    }
  }, [])

  // useEffect(() => {
  //   setCatsState([...new Set(slidesState.map(q => q.collectionName))])
  // }, [slidesState])

  // * FORM Control * * * * * 
  const collectionSchema = Yup.object().shape({
    collectionName: Yup.string().min(3).max(12).required('* required!'),
  })

  return (
    <>
      <Navbar />
      <section>
        <div className="collectionEditor">
          <h1>Collection Editor</h1>
          <ul>
            {/* {catsState.map((cat, _id) =>(
              <li key={_id}>
                <button className='deleteBtn'>delete</button>
                <Link to={`/slides/${cat.collectionName}`}> {cat.collectionName} </Link>
              </li>
            ))} */}
          </ul>

          <Formik
            enableReinitialize
            initialValues={{
              collectionName: ''
            }}
            validationSchema={collectionSchema}
            validateOnChange={false}
            onSubmit={(values) => {
              newCollectionName()
            }}
          >
            {({ errors, touched, setFieldValue }) => (
              <Form>
                <div className='form-item'>
                  <MdTitle />
                  <Field name="collectionName" type="text" placeholder="new collection name..." className='collectionName'/>
                  {errors.collectionName && touched.collectionName ? (
                    <span className='formErr'>{errors.collectionName}</span>
                    ) : null}
                </div>

                <button className='submitPost' type='submit'>Add</button>
              </Form>
            )}

          </Formik>
        </div>
      </section>

      <section className='collections'>
        {catsState.map((collection, i) => (
          <div key={i}>
            <CollectionPreview collectionName={collection}/>
          </div>
        ))}
      </section>
    </>
  )
}

export default Slides