import React from 'reactn';

export default class Footer extends React.Component {
    render() {
        return (
            <footer className="footer" >
                <div className="container-fluid">
                  <nav>
                    <ul>
                      <li>
                          <a href="https://mailr.email">
                              Mailr
                          </a>
                      </li>
                      <li>
                          <a href="https://mailr.email/about">
                             About Us
                          </a>
                      </li>
                      <li>
                          <a href="https://blog.graphitedocs.com">
                             Blog
                          </a>
                      </li>
                      <li>
                          <a href="https://github.com/graphite-docs/graphite-mail">
                              Github
                          </a>
                      </li>
                    </ul>
                  </nav>
                  <div className="copyright">
                    &copy; {new Date().getFullYear()}
                  </div>
                </div>
              </footer>
        )
    }
}