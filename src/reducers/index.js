import { ADD_MEMBER, DELETE_MEMBER } from '../constants';
import React from 'react';



const initialState = [{
  id: 1,
  name: 'Sattar',
  parent: 0,
  age: 25,
  avatar: 'http://www.imas.utas.edu.au/_media/utas-shared/UTAS-Default-Profile-Pic.png'
}];

const findAndRemove = (array, property, value) => {
  array.forEach(function(result, index) {
    if(result[property] === value) {
      //Remove from array
      array.splice(index, 1);
    }
  });
}


const removeById = (members, memberID) => {
  let familyMember = [];
  let newMember = {};
  if (typeof(members) === 'object') {

          members.map(member => {
              //
              // newMember = {
              //   name: member.name,
              //   age: member.age,
              //   id: member.id,
              //   avatar: member.avatar,
              //   parent: member.parent
              // }

              if ('children' in member) {
                let newChildren = [];
                let deleting = false;

                for (var i = 0; i < member.children.length; i++) {
                  if (member.children[i].id == memberID) {
                    deleting = true;
                  }
                }

                if (deleting == true) {
                  findAndRemove(member.children, 'id', memberID);
                }
                if ('children' in member) {
                  if (member.children.length > 0) {
                    for (var i = 0; i < member.children.length; i++) {
                      removeById(member.children[i], memberID)
                    }
                  }
                }

              } else {
                newMember = {
                  name: member.name,
                  age: member.age,
                  id: member.id,
                  avatar: member.avatar,
                  parent: member.parent
                }
                familyMember.push(newMember);
              }

          })

    }


  return familyMember

  }

const removeMember = (members, memberID) => {
  let newMembers = {};
    console.log(members);
  return ( removeById(members, memberID))



};

const members = (state = initialState, action) => {
  let familyMembers = null;
  switch (action.type) {
    case ADD_MEMBER:
      // familyMembers = [...state, member(action)];
      familyMembers = [...state, {
        name: action.name,
        id: action.id,
        parent: action.parent,
        avatar: action.avatar
      }];

      return familyMembers;

    case DELETE_MEMBER:
      familyMembers = removeMember(state, action.memberID);
      console.log('action.memberID',action.memberID);


      return familyMembers; // change state tp familyMembers
    default:
      return state;
  }
};


export default members;
