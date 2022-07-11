import {React, useState, useEffect} from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { TiArrowLoop } from 'react-icons/ti'
import { FaForward } from 'react-icons/fa'
import { IoIosTimer } from 'react-icons/io'

import axios from '../api/axios'

const PlayerSettings = () => {

  const controller = new AbortController();

  const [settingsState, setsettingsState]     = useState([{}]);

  const getSettings = async () => {
    try{
      const res = await axios.get('/settings')
      setsettingsState(res.data)

    } catch (err) {
      console.error(err);
    } 
  }


  const updateAutoAdv = async (onOff, _id) => {
    // console.log(onOff + " : " + _id);

    try{
      const data = {autoAdv: onOff}
      let res = await axios.patch(`/settings/${_id}`, JSON.stringify({...data}),{
        headers: { 'Content-Type': 'application/json'},
      })

    } catch (err) {
      console.error(err);
    }
  }

  const updateAdvSpeed = async (speed, _id) => {
    // console.log(speed + " : " + _id);

    try{
      const data = {advSpeed: speed}
      let res = await axios.patch(`/settings/${_id}`, JSON.stringify({...data}),{
        headers: { 'Content-Type': 'application/json'},
      })

    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getSettings()

    return () => {
      // isMounted = false;
      controller.abort();
    }
  }, [])


  return (
    <>
      <h2>Player Settings</h2>

      {settingsState && 

        <article className='settings'>
          <div className="form-item">
            <FaForward />
            <input 
              type="checkbox" 
              className="chbx" 
              defaultChecked={settingsState[0].autoAdv} 
              onClick={(e) => updateAutoAdv(e.target.checked, settingsState[0]._id)} 
            />
            <label>Auto Advance On / Off</label>
          </div>

          <div className="form-item">
            <IoIosTimer />
            <input 
              type="number" 
              defaultValue={settingsState[0].advSpeed}
              onClick={(e) => updateAdvSpeed(e.target.value, settingsState[0]._id)}
            />
            <label>Slide Advance Speed</label>
          </div>

        </article>
      }
    </>
  )
}

export default PlayerSettings