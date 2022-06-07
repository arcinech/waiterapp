import {API_URL} from '../config.js';

export const getAllTables = ({tables}) => tables;
export const getTableById = ({tables}, id) => {
  console.log(tables, id);
  return tables.find(table => table.id === id)};


const createActionName = actionName => `app/tables/${actionName}`;
const UPDATE_TABLES = createActionName('UPDATE_TABLES');
const EDIT_TABLE = createActionName('EDIT_TABLE');

// action creators
export const updateTables = payload => ({ type: UPDATE_TABLES, payload});
export const fetchTables = ({setLoadingStatus}) => {
  return (dispatch) =>
  {
    fetch(`${API_URL}/tables`)
      .then(res => res.json())
      .then(tables => dispatch(updateTables(tables)))
      .then(()=> dispatch(setLoadingStatus(false)))
  }
};

export const editTable = payload => ({type:EDIT_TABLE, payload});
export const putTable = ({setLoadingStatus, ...updatedTable}) => {
  return (dispatch) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTable)
    };

    fetch(`${API_URL}/tables/${updatedTable.id}`, options)
      .then(res => res.json())
      .then(() => {
        dispatch(editTable(updatedTable));
        dispatch(setLoadingStatus(false));
      }
      )
  }
}

const tablesReducer = (statePart = [], action) => {
  switch (action.type) {
    case EDIT_TABLE:
      return statePart.map(table => (table.id === action.payload.id ? { ...table, ...action.payload } : table));
    case UPDATE_TABLES:
      return [...action.payload];
    default:
      return statePart;
  };
};

export default tablesReducer;