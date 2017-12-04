import { ADD_MEMBER, DELETE_MEMBER } from '../constants';



const initialState = [{
  id: 1,
  name: 'Sattar',
  parent: 0,
  age: 25,
  avatar: 'http://www.imas.utas.edu.au/_media/utas-shared/UTAS-Default-Profile-Pic.png'
}];


const removeById = (allMembers, member, parent) => {

  // const familyMembers = action.members.filter(member => member.id !== action.id);
  // console.log('new reduce members', familyMembers);
  // return familyMembers;
  console.log("member and parent", member, parent);
  var index = Object.keys(allMembers).indexOf('id': parent);
  console.log('index',index);

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
      const newState = Object.assign([], state);
      const indexOfMemberToDelete = state.findIndex(member => {
        return member.id == action.member.id
      })
      newState.splice(indexOfMemberToDelete, 1);

      return newState;

    default:
      return state;
  }
};


export default members;
