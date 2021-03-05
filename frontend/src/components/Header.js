import React from 'react'

function Header() {
    return (
        <div className="navbar navbar--fixed navbar--fixed-top navbar--page">
            <div className="navbar__col navbar__col--title text-center">
                <a href="dashboard.html" className="m-auto">MY <span style={{color: '#37B6FF'}}>ACCOUNTS</span></a>
            </div>
        </div>
    )
}

export default Header;
