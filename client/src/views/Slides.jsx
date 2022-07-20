import {React, useState, useEffect} from 'react'
import {useNavigate, useLocation, Link} from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
// import Cookies from 'js-cookie'
import { MdTitle } from 'react-icons/md'
import { TiArrowLoop } from 'react-icons/ti'
import { BiAddToQueue } from 'react-icons/bi'


import Navbar from '../components/Navbar'
import Slide from '../components/Slide'
import SlideCreator from '../components/SlideCreator'
// import SlideEditor from '../components/SlideEditor'

// import useAxiosPrivate from "../hooks/useAxiosPrivate";
// import { StyledPostsList } from '../styles/PostsList.styled'
import CollectionPreview from '../components/CollectionPreview'
import axios from '../api/axios'
import { FaRegTrashAlt } from 'react-icons/fa'
import PlayerSettings from '../components/PlayerSettings'
import { StyledCollectionsEditor } from '../styles/CollectionsEditor.styled'
// import { collection } from '../../../server/model/Slide'

const Slides = () => {

  // const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const [postsArray, setPosts]        = useState([]);
  const [slidesState, setSlidesState] = useState([]);
  const [catsState, setCatsState]     = useState([]);
  // const [roleState, setroleState] = useState('');

  const controller = new AbortController();

  const getSlides = async () => {    
    
    try {
      const response = await axios.get('/slides')
      setSlidesState(response.data);

    } catch (err) {
      console.error(err);
      navigate('/', { state: { from: location }, replace: true });
    } 
  }

  const getCats = async () => {
    try{
      const res = await axios.get('/collectionname')

      setCatsState(res.data)

    } catch (err) {
      console.error(err);
      navigate('/', { state: { from: location }, replace: true });
    }
  }

  const newCollectionName = async (vals) => {
    try{
      const res = await axios.post('/collectionname', 
        JSON.stringify({...vals}),
        {
          headers: { 'Content-Type': 'application/json' }
        }
      )
      getSlides()
      getCats()

    } catch (err) {
      console.error(err);
      navigate('/', { state: { from: location }, replace: true });
    }
  }

  const collectionActive = async (name, onOff, _id) => {
    try{
      // console.log(name + " : " + onOff + " : " + _id)
      const isActive = {isactive: onOff}
      let res = await axios.patch(`/collectionname/${_id}`, JSON.stringify({...isActive}),{
        headers: { 'Content-Type': 'application/json'},
      })

    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {

    getSlides();
    getCats()
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
    collectionName: 
      Yup.string()
        .min(3, 'minimum 3 characters')
        .max(12, 'max 12 characters')
        .matches(/^[aA-zZ]+$/, " * Only alphabets are allowed for this field. NO spaces ")
        .required('* required!'),
  })

  return (
    <>
      <Navbar />
      <section>

        <StyledCollectionsEditor>
          <div className="collectionEditor">
            <h1>Collection Editor</h1>
            <label>activate collections to be shown in the main Player slideshow</label>

            <ul className='col-list'>
              {catsState.map((cat, _id) =>(
                <li key={_id}>
                  {/* <button className='deleteBtn'>delete</button> */}
                  <input className='toggle' id={`check_${_id}`} type="checkbox" defaultChecked={cat.isactive} onClick={(e) => collectionActive(cat.collectionName, e.target.checked, cat._id)}/>
                  <label for={`check_${_id}`}>Collection {cat.collectionName} toggle</label>
                  <Link to={`/slides/${cat.collectionName}`}> {cat.collectionName} </Link>
                </li>
              ))}
            </ul>

            <Formik
              enableReinitialize
              initialValues={{
                collectionName: ''
              }}
              validationSchema={collectionSchema}
              validateOnChange={false}
              onSubmit={(values) => {
                newCollectionName(values)
              }}
            >
              {({ errors, touched, setFieldValue }) => (
                <Form>
                  <div className='form-item'>
                    <Field name="collectionName" type="text" placeholder="new collection name..." className='collectionName'/>

                    <button className='submitPost' type='submit'> <BiAddToQueue/> Add Collection</button>

                    {errors.collectionName && touched.collectionName ? (
                      <span className='formErr'>{errors.collectionName}</span>
                    ) : null}
                  </div>

                </Form>
              )}

            </Formik>
          </div>
        </StyledCollectionsEditor>
      </section>


      <section>
        <PlayerSettings />
      </section>

      <section className='collections'>
        {catsState.map((cats, _id) => (
          <div key={_id}>
            <CollectionPreview collectionName={cats.collectionName}/>
          </div>
        ))}
      </section>
    </>
  )
}

export default Slides