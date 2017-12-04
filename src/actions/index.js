import { ADD_MEMBER, DELETE_MEMBER } from '../constants';


export const addMember = (member) => {
  const action = {
    type: ADD_MEMBER,
    name: member.name,
    parent: member.parent,
    age: member.age,
    id: member.id,
    avatar: member.avatar
  }
  console.log('addMember in actions', action);
  return action;
}

export const deleteMember = (member) => {
  const action = {
    type: DELETE_MEMBER,
    member
  }
  console.log('delete in actions', action);
  return action;

}
