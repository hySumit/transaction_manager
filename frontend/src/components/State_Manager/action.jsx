// Action types
export const ADD_TRANSACTION = 'ADD_TRANSACTION';
export const EDIT_TRANSACTION = 'EDIT_TRANSACTION';
export const DELETE_TRANSACTION = 'DELETE_TRANSACTION';
export const SET_FILTERS = 'SET_FILTERS';
export const UPDATE_TRANSACTION = 'UPDATE_TRANSACTION';


// Action creators
export const addTransaction = (transaction) => ({
  type: ADD_TRANSACTION,
  payload: transaction
});

export const editTransaction = (transaction) => ({
  type: EDIT_TRANSACTION,
  payload: transaction
});

export const deleteTransaction = (id) => ({
  type: DELETE_TRANSACTION,
  payload: id
});

export const setFilters = (filters) => ({
  type: SET_FILTERS,
  payload: filters
});

export const updateTransaction = (transaction) => ({
  type: UPDATE_TRANSACTION,
  payload: transaction
});
