import { useState } from "react";
import GlobalSearchBar from "./globalsearchbar";
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import cred from "../env";


const Header = () => {
  const navigate = useNavigate()
  const [showSearchInput, setShowSearchInput] = useState(false)
  // let profilePhoto

  function handleShowSearch() {
    setShowSearchInput(true)
  }

  function handleSignOut(){
    Cookies.remove('jwtToken')
    Cookies.remove('user')
    Cookies.remove('userId')
    Cookies.remove('loggedIn')
    navigate('/login')
  }
  
  // if(Cookies.get('user')) 
  // else profilePhoto = null
  const profilePhoto = JSON.parse(Cookies?.get('user'))?.profilePhoto

  return (
    <>
      <nav className="nav-div d-flex align-items-center py-2 container">
        <h2 style={{cursor:"pointer"}} onClick={()=>navigate('/')} className={`${showSearchInput ? 'd-none' : ''} logo-name my-auto me-lg-5`}>Connecto</h2>
        <GlobalSearchBar showSearchInput={showSearchInput} setShowSearchInput={setShowSearchInput} />

        <div className="ms-auto d-flex align-items-center">
          <span onClick={handleShowSearch} className={`${showSearchInput ? 'd-none' : ''} material-symbols-rounded small-screen-search-icon d-block d-lg-none me-4 p-1 rounded-2`}>
            search
          </span>
          
          <Dropdown className={`${showSearchInput ? 'd-none' : ''}`}>
            <Dropdown.Toggle className="profile-dropdown">
              <img className="profile-pic-searchbar" src={`${cred.BACKEND_URL}/${profilePhoto}`} alt="profile photo" />
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ backgroundColor: '#202326' }}>
              <Dropdown.Item className="dropdown-item" onClick={()=>navigate('/my-profile')}>View Profile</Dropdown.Item>
              <Dropdown.Item className="dropdown-item" onClick={handleSignOut}>Sign Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </nav>
    </>
  );
};

export default Header;
