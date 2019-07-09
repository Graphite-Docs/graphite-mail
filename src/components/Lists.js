import React, { setGlobal } from 'reactn';
import { handleAddList, handleDelete, handleDeleteList } from '../helpers/lists';

export default class Lists extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        showConfirmDelete: false, 
        showListDeleteConfirm: false
      }
    }
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

    handleDelete = (listId, contactId) => {
      handleDelete(listId, contactId)
      this.setState({ showConfirmDelete: false });
    }

    render() {
        const { proUser, lists, listSelectionCount } = this.global;
        const { showConfirmDelete, showListDeleteConfirm } = this.state;
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
                  <h4>{lists[listSelectionCount].listName} List 
                    <span style={{fontSize: "12px", position: "relative", top: "-5px", left: "10px"}}><button onClick={this.handleAddModal} className="btn btn-primary btn-round">Add</button></span>
                    { showListDeleteConfirm ? <span style={{fontSize: "12px", float: "right"}}><button style={{background: "red"}} onClick={() => handleDeleteList(lists[listSelectionCount].id)} className="btn btn-round">Are You Sure?</button> <span className="pointer" onClick={() => this.setState({ showListDeleteConfirm: false})}>No, cancel</span></span> : <span style={{fontSize: "12px"}}><button style={{float: "right", background: "red"}} onClick={() => this.setState({ showListDeleteConfirm: true})} className="btn btn-round">Delete List</button></span>}
                  </h4>
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
                            <th></th>
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
                                  <td>{showConfirmDelete ? <span><span onClick={() => this.handleDelete(lists[listSelectionCount].id, item.id)} className="delete pointer">Confirm?</span><span style={{marginLeft: "10px"}} onClick={() => this.setState({ showConfirmDelete: false })} className="pointer">Cancel</span></span> : <span onClick={() => this.setState({ showConfirmDelete: true })} className="delete pointer">Delete</span>}</td>
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