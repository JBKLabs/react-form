import uuid from 'uuid/v1';

export default {
  name: 'users',
  state: { 0: { id: uuid(), firstName: 'John', lastName: 'Doe' } },
  reducers: {
    setUser: (state, user) => ({
      ...state,
      [user.id]: user
    })
  },
  effects: (dispatch) => ({
    addUserAsync: async (user) => {
      dispatch.users.setUser({
        id: uuid(),
        firstName: user.name.first,
        lastName: user.name.lastName
      });
    }
  })
};
