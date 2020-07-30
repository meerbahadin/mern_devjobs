import { useReducer, useEffect } from 'react';
import axios from 'axios';

const ACTION_TYPE = {
  CALL_API: 'CALL_API',
  GET_DATA: 'GET_DATA',
  ERROR: 'ERROR',
  TOGGLE_NEXT: 'TOGGLE_NEXT',
};

const URL = '/api/jobs';

function reducer(state, action) {
  switch (action.type) {
    case ACTION_TYPE.CALL_API:
      return {
        loading: true,
        jobs: [],
      };
    case ACTION_TYPE.GET_DATA:
      return {
        ...state,
        loading: false,
        jobs: action.payload.jobs,
      };
    case ACTION_TYPE.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        jobs: [],
      };
    case ACTION_TYPE.TOGGLE_NEXT:
      return { ...state, hasNextPage: action.payload.hasNextPage };
    default:
      return state;
  }
}

export default function useFetchJobs(params, page) {
  const [state, dispatch] = useReducer(reducer, { jobs: [], loading: false });
  useEffect(() => {
    const cancelToken1 = axios.CancelToken.source();


    dispatch({
      type: ACTION_TYPE.CALL_API,
    });
    axios
      .get(URL, {
        cancelToken: cancelToken1.token,
        params: {page: page, ...params },
      })
      .then((res) => {
        dispatch({
          type: ACTION_TYPE.GET_DATA,
          payload: { jobs: res.data },
        });
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        dispatch({
          type: ACTION_TYPE.ERROR,
          payload: { error: err },
        });
      });

    //chek to see of we have a next page

    const cancelToken2 = axios.CancelToken.source();

    axios
      .get(URL, {
        params: { page: page + 1, ...params },
      })
      .then((res) => {
        dispatch({
          hasNextPage: cancelToken2.token,
          type: ACTION_TYPE.TOGGLE_NEXT,
          payload: { hasNextPage: res.data.length !== 0 },
        });
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        dispatch({
          type: ACTION_TYPE.ERROR,
          payload: { error: err },
        });
      });

    return () => {
      cancelToken1.cancel();
      cancelToken2.cancel();
    };
  }, [params, page]);

  return state;
}
