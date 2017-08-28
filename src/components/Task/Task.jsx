import React, { Component } from 'react';
import { connect } from 'react-redux';

import { taskRef, completeTaskRef } from '../../firebase';
import moment from 'moment';

import './taskItem.css';

class Task extends Component{
    constructor() {
      super();
      this.state = { isModalOpen: false }
    }
    editTask(){

    }
    completeTask(){
      const { email } = this.props.user;
      const task = this.props.task;
      taskRef.child(task.id).remove();
      completeTaskRef.push({closer:email,task});
    }
    render(){
      const {taskname,priority,due_date} = this.props.task;
      const task = this.props.task;
      return(
        <div className="taskWrapper">
          <div className="taskItem">
            <div className="due_dates">
              <span>Due</span>&nbsp;
              {moment(new Date(due_date)).fromNow()}
            </div>
            <div className="priority">
              <div className ={(priority === 'High') ? 'btn-danger' : (priority === 'Medium') ? 'btn-success' : 'btn-primary'}>
              </div>
            </div>
            <div className="taskname">{taskname}</div>
            <div className="button-group">
              <button className="btn btn-info" onClick={() =>this.completeTask()}>Done</button>
              <button className="btn btn-success" onClick={() => this.openModal()}>Edit </button>
              <button className="btn btn-danger">Delete</button>
            </div>
          </div>
          <Modal task={task} isOpen={this.state.isModalOpen} onClose={() => this.closeModal()} />
        </div>
      )
    }

    openModal() {
      this.setState({ isModalOpen: true })
    }

    closeModal() {
      this.setState({ isModalOpen: false })
    }
  }

  class Modal extends Component {
    constructor(props){
      super(props);
      this.state ={
        taskname: '',
        description:'',
        priority:'Medium',
        start_date:'',
        due_date:''
      }
    }

    render(){

      if (this.props.isOpen === false)
      return null
      console.log('this.state', this.state);
    return (
      <div className="overlay fade" >
        <div className="editWrapper">
          <form className="form">
            <input className="form-control" defaultValue={this.props.task.taskname}
              onChange={event => this.setState({taskname:event.target.value})} required />
          </form>
        </div>
        <button className="btn btn-danger" onClick={e => this.close(e)}>X</button>
      </div>
    )
  }

  close(e) {
    e.preventDefault()

    if (this.props.onClose) {
      this.props.onClose()
    }
  }
}


function mapStateToProps(state){
  const { user }= state
  return{
    user
  }
}
export default connect(mapStateToProps,null)(Task);
