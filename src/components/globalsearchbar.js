// import AsyncSelect from 'react-select/async';
import cred from '../env';
// import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadOptions } from '../API/globalSearch';
import { customStyles } from '../smallComponents/globalSearch';

// in GlobalSearchBar.js

import AsyncSelect from 'react-select/async';
import { useRef, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const GlobalSearchBar = ({showSearchInput, setShowSearchInput}) => {

  const navigate = useNavigate()
  const [searchInput, setSearchInput] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)

  const searchInputRef = useRef(null);

  useEffect(() => {
    if (showSearchInput && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearchInput]);

  function handleChange(e) {
    setSearchInput(e)
  }

  function handleAsyncSelect(e) {
    setSelectedOption(null)
    setSearchInput('')
    const sender = e
    if(e._id == Cookies.get('userId')) navigate('/my-profile')
    else navigate('/user-profile', { state: { sender } });
  }

  const getOptionLabel = (option) => option.label;
  const getOptionValue = (option) => option.value;

  const formatOptionLabel = ({ label, image, position }) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img src={`${cred.BACKEND_URL}/${image}`} alt={label} style={{ width: '2.5rem', height: '2.5rem', 'borderRadius': '50%' }} />
      <div className='ms-3 fw-medium me-2'>{label}</div>
      &#x2022;
      <div className='ms-2 fw-light'>{position}</div>
    </div>
  );

  return (
    <div className={`${!showSearchInput?'d-none': ''} checkingDiv d-lg-block`}>

      <div className="global-search-bar mx-auto">
        <AsyncSelect
          placeholder='Search Users'
          cacheOptions
          loadOptions={() => loadOptions(searchInput)}
          onInputChange={handleChange}
          getOptionLabel={getOptionLabel}
          getOptionValue={getOptionValue}
          formatOptionLabel={formatOptionLabel}
          onChange={handleAsyncSelect}
          styles={customStyles}
          menuIsOpen={searchInput !== ''}
          value={selectedOption}
          blurInputOnSelect={true}
          ref={searchInputRef}
          onBlur={()=>setShowSearchInput(false)}

        />
      </div>
    </div>
  )
}
export default GlobalSearchBar;
