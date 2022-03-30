// props: none | The footer for all pages
function Footer() {
    return (
      <div className="bg-light footer mt-4">
        <hr></hr>
        <div className="d-flex justify-content-center">
          <p className="p-3">Ⓒ 2021 Sidhra Fernando-Plant</p>
          <p className="p-3 text-muted">|</p>
          <a href="/signup" className="p-3 text-dark">Sign up</a>
          <p className="p-3 text-muted">|</p>
          <a href="/login" className="p-3 text-dark">Log in</a>
          <p className="p-3 text-muted">|</p>
          <p className="p-3">Icons made by <a className="text-secondary" href="https://www.freepik.com" title="Freepik">Freepik</a> from <a className="text-secondary" href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></p>
        </div>
      </div>
    );
  }
  
export default Footer;