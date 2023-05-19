


export const customStyles = {
  control: (provided, state) => ({
    ...provided,

    backgroundColor: state.isFocused ? '#202326' : '#222222', // Change background color based on focus state
    border: 'none', // Add border for focus state
    borderRadius: '4px', // Add border radius
    boxShadow: state.isFocused ? '0 0 0 1px lightblue' : 'none', // Add box shadow for focus state
    minHeight: '40px', // Set the minimum height of the control,
    cursor: state.isFocused ? 'text' : 'pointer'

  }),

  indicatorSeparator: () => ({
    display: 'none',
  }),
  dropdownIndicator: () => ({
    display: 'none',
  }),

  input: (provided, state) => ({
    ...provided,
    color: 'white', // Change text color based on focus state
  }),
  option: (provided, state) => ({
    ...provided,
    cursor: 'pointer',
    backgroundColor: '#222', // Change background color of selected option
    color: '#e2ddda', // Change text color of selected option
    // margin: '1rem',
    ':active': {
      ...provided[':active'],
      backgroundColor: '#e2ddda', // Change background color of option when hovering
      color: '#222'
    },
    ':hover': {
      ...provided[':hover'],
      backgroundColor: '#323644',
      color: 'white'
    },
  }),
  menu: (provided, state) => ({
    ...provided,
    backgroundColor: '#222',
    border: '1px solid black', // Add border to the menu
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)', // Add box shadow to the menu
    // margin: '2rem 0',
  }),
};