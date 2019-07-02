import React, { setGlobal } from 'reactn';
import { handleAddList } from '../helpers/lists';

export default class Lists extends React.Component {
    handleListDisplay = (e) => {
      const { lists } = this.global;
      let listId = e.target.value;
      var listSelectionCount = lists.indexOf(lists.filter(list => list.id === listId)[0]);
      setGlobal({ listSelectionCount });
    }

    handleAddModal = () => {
      document.getElementById('dimmer').style.display="block";
      document.getElementById('contact-modal').style.display="block";
    }

    handleNewList = () => {
      document.getElementById('list-fields').style.display = "block";
      document.getElementById('new-list-button').style.display = "none";
    }

    cancel = () => {
      document.getElementById('list-fields').style.display = "none";
      document.getElementById('new-list-button').style.display = "block";
    }

    render() {
        const { proUser, lists, listSelectionCount } = this.global;
        return(
            <div className="content">
                {
                  proUser ? 
                  <div style={{marginBottom: "20px"}}><button className="btn btn-round">Create New List</button></div> : 
                  <div style={{marginBottom: "20px"}}><p>Want to add more than one list?</p><button className="btn btn-round">Upgrade Now</button></div>
                }

                {
                  lists.length > 0 ?
                  <div className="card">
                  <div className="card-header">
                    {
                      proUser && lists.length > 1 ? 
                      <div className="form-group">
                        <select style={{width: "50%"}} className="form-control" onChange={this.handleListDisplay}>
                          {lists.map(list => {
                            return(
                              <option key={list.id} value={list.id}>{list.listName}</option>
                            )
                          })}
                        </select>
                        <label>Choose a list</label>
                      </div> : 
                      <div/>
                    }
                  <h4>{lists[listSelectionCount].listName} List <span style={{fontSize: "12px", position: "relative", top: "-5px", left: "10px"}}><button onClick={this.handleAddModal} className="btn btn-primary btn-round">Add</button></span></h4>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table">
                        <thead className=" text-primary">
                          <tr>
                            <th>
                              Email
                            </th>
                            <th>
                              Name
                            </th>
                            <th>
                              Organization
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            lists[listSelectionCount].contacts.map(item => {
                              return (
                                <tr key={item.id}>
                                  <td>
                                    {item.email}
                                  </td>
                                  <td>
                                    {item.name}
                                  </td>
                                  <td>
                                    {item.org}
                                  </td>
                                </tr>
                              )
                            })
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div> : 
                <div className="card">
                    <div className="card-header">
                          <h4>You don't have any lists yet</h4>
                    </div>
                    <div className="card-body">
                          <button id="new-list-button" onClick={this.handleNewList} className="btn btn-primary btn-round">Add One Now</button>
                          <div style={{display: "none"}} id="list-fields">
                            <form>
                              <div><p>Give your list a name</p></div>
                              <input id="list-name-input" style={{width: "50%"}} className="form-control" placeholder="Business Contacts" type="text" />
                              <label>List Name</label>
                            </form>
                            <button onClick={handleAddList} className="btn btn-primary btn-round">Add List</button>
                            <button onClick={this.cancel} className="btn btn-round">Cancel</button>
                          </div>
                    </div>
                </div>
                }
                          
              </div>
        )
    }
}