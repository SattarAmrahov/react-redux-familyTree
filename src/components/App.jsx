import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  addMember,deleteMember } from '../actions';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'; // material design
import TextField from 'material-ui/TextField'; // inputs
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';


class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      id:'',
      name:'',
      parent:'',
      age:''
    }
  }


  addNewMember(){
    this.props.addMember(this.state)
    this.handleClose();
  }

  deleteCurrentMember(member){
    // let members = this.convertToArray(this.props.family);
    this.props.deleteMember(member);
  }


    convertToArray(family){
      let arr = [];
      console.log('convertToArray family', family);
      family.map(person=>{
        if (person.children) {
          this.convertToArray(person.children)

        } else {
          arr.push(person);
        }

      });

      console.log('convert to array' , arr);
      return arr;

    }





  renderMembers(members){
    if (typeof(members) === 'object') {
      return (
        <ul>
          {
            members.map(member => {
              return (
                <li key={member.id}>
                  <a href="#">
                    {member.name}
                    {this.renderAddModal(member.id)}
                  </a>
                  {this.renderMembers(member.children)}
                </li>
              )
            })
          }
        </ul>
      )
    } else {
        return(
          <div>{members}</div>
        )
    }

  } // end renderMembers function




  getNestedChildren(arr, parent) {
      var out = [];
      for(var i in arr) {
          if(arr[i].parent == parent) {
              var children = this.getNestedChildren(arr, arr[i].id)

              if(children.length) {
                  arr[i].children = children
              }
              out.push(arr[i])
          }
      }

      return out
  }

  pushMembersToArray(family){
    let arr = [];
    family.map(person=>{
      arr.push(person);
    });
    return arr;

  }


/////////////////////////////////////////////////////////////////////////////


state = {
  dialogOpen: false,
};

handleOpen = () => {
  this.setState({dialogOpen: true});
};

handleClose = () => {
  this.setState({dialogOpen: false});
};


renderAddModal(parentOfChild) {
  const actions = [
    <FlatButton
      label="Cancel"
      primary={true}
      onClick={()=>this.handleClose()}
    />,
    <FlatButton
      label="Add"
      primary={true}
      onClick={()=>{
        this.addNewMember()
      }}
    />,
  ];

  return (
    <div>

      <FloatingActionButton mini={true} onClick={()=>{
        this.handleOpen();
        this.setState({parent: parentOfChild});
        let id = Math.random();
        this.setState({id: id});
      }} className="add-modal-button">
         <ContentAdd className="add-modal-button-sign"/>
      </FloatingActionButton>

      <Dialog
        className="add-member-form"
        title="Add New Family Member"
        actions={actions}
        modal={true}
        open={this.state.dialogOpen}
      >
        <div>
          <TextField
            className="form-input"
             hintText="Name"
             floatingLabelText="Enter Member Name"
             onChange={(event) => {
               this.setState(
               {
                 name: event.target.value
               })
             }}
           /> <br/>
           <TextField
             className="form-input"
              hintText="Age"
              floatingLabelText="Enter Member Age"
              onChange={(event) => {this.setState({age: event.target.value})}}
            /> <br/>
            <TextField
              className="form-input"
               hintText="Image"
               floatingLabelText="Enter Image URL"
               onChange={(event) => {this.setState({avatar: event.target.value})}}
             /> <br/>
           </div>

      </Dialog>
    </div>
  );
}

///////////////////////////////////////////////////////////////////////////



  listMembers(members){
    if (typeof(members) === 'object') {
      return (
            members.map(member => {
              return (

               <ListItem
                 primaryText={member.name}
                 rightAvatar={<Avatar src={member.avatar} />}
               />


              )
            })
      )
    } else {
        return(
          <div className="teessst">{members}</div>
        )
    }

  } // end renderMembers function




  displayMemberList(familyArray){
    console.log('familyArray', familyArray);
    return this.listMembers(familyArray);
  }




  render(){
    let arrayOfFamily = this.pushMembersToArray(this.props.family);
    let nestedArray = this.getNestedChildren(arrayOfFamily, 0);
    return (
      <div className="App">
      <h3 className="header">Family Tree</h3>
        <div className="tree">
          <MuiThemeProvider>

          <div className="member-list">
              <List>
                {this.displayMemberList(arrayOfFamily)}
              </List>
          </div>

          <div className="tree-structure">

              {this.renderMembers(nestedArray)}

          </div>
          </MuiThemeProvider>
        </div>
      </div>
    )
  }

} // end App class


function mapStateToProps(state){
  return {
    family: state
  }
}

export default connect(mapStateToProps, { addMember, deleteMember })(App);
