import React from "react";

class Header extends React.Component{
    render() {
        return (
            <div id='header' className='bg-dark'>
            <a href="/"><h3 className='text-light'>User management</h3></a>
            <div className='right'>
              <form>
              <input type="text" />
              <button type='sumbit' className='btn btn-primary'>Search</button>
              </form>
            </div>
          </div>
        )
    }
}

export default Header;