import AppRouter from './config/AppRouter'


function App() {
  return (
    <div className="view view-main">
      <div className="pages">
        <div data-page="about" className="page">
          <div className="page-content">
            <div className="navbar navbar--fixed navbar--fixed-top navbar--page">
              <div className="navbar__col navbar__col--title">
                <a href="dashboard.html">MY <span style={{color: '#37B6FF'}}>ACCOUNTS</span></a>
              </div>
            </div>
            <div></div>
              <AppRouter />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
