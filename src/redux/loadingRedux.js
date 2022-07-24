export const loadingStatus = ({loading}) => loading;

const createActionName = actionName => `app/loading/${actionName}`;
const LOADING_STATUS = createActionName('LOADING_STATUS');

export const setLoadingStatus = payload => ({ type: LOADING_STATUS, payload});

const loadingReducer = (statePart = false, action) => {
  switch (action.type) {
    case LOADING_STATUS:
      return action.payload;
    default:
      return statePart;
  };
};

export default loadingReducer;