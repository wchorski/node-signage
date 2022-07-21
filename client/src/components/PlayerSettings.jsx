import {React, useState, useEffect} from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { TiArrowLoop } from 'react-icons/ti'
import { FaForward } from 'react-icons/fa'
import { IoIosTimer } from 'react-icons/io'

import axios from '../api/axios'
import { StyledPlayerSettings } from '../styles/PlayerSettings.styled'

const PlayerSettings = () => {

  const controller = new AbortController();

  const [settingsState, setsettingsState]   = useState([{}]);
  const [showTimer, setshowTimer]           = useState(false);
  const [timerState, settimerState]         = useState();

  const getSettings = async () => {
    try{
      const res = await axios.get('/settings')
      setsettingsState(res.data)
      setshowTimer(res.data[0].autoAdv)  
      settimerState(res.data[0].advSpeed)

    } catch (err) {
      console.error(err);
    } 
  }


  const updateAutoAdv = async (onOff, _id) => {
    // console.log(onOff + " : " + _id);

    try{
      setshowTimer(!showTimer)
      
      const data = {autoAdv: onOff}
      let res = await axios.patch(`/settings/${_id}`, JSON.stringify({...data}),{
        headers: { 'Content-Type': 'application/json'},
      })

    } catch (err) {
      console.error(err);
    }
  }

  const incrementSpeed = (int) => {
    // settimerState(prev => prev + int)
    settimerState(timerState + int)
    console.log(timerState);
    updateAdvSpeed(timerState)
  }

  const updateAdvSpeed = async (speed) => {
    // console.log(speed + " : " + _id);

    try{
      const data = {advSpeed: speed}

      let res = await axios.patch(`/settings/${settingsState[0]._id}`, JSON.stringify({...data}),{
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

    <StyledPlayerSettings>
      <h2>Player Settings</h2>

      {settingsState && 

        <article className='settings'>
          <div className="form-item">
            <input 
              type="checkbox" 
              className="toggle" 
              id='chbx-autoforward'
              defaultChecked={settingsState[0].autoAdv} 
              onClick={(e) => updateAutoAdv(e.target.checked, settingsState[0]._id)} 
            />
            <label htmlFor='chbx-autoforward' >Auto Advance On / Off</label>
          </div>

          {showTimer && 
            <div className="form-item timer">
              <IoIosTimer />
              <input 
                type="number" 
                // defaultValue={settingsState[0].advSpeed}
                value={timerState}
                
                onClick={(e) => updateAdvSpeed(e.target.value, settingsState[0]._id)}
              />
              {/* <p>{timerState}</p> */}
              <span 
                className='input-button add' 
                onClick={e => incrementSpeed(1)}   
              > + 
              </span>
              <span 
                className='input-button remove' 
                onClick={e => incrementSpeed(-1)}   
              > - 
              </span>
            </div>
          }

        </article>
      }
    </StyledPlayerSettings>
  )
}

export default PlayerSettings