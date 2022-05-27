import produce from "immer";

export const initState = {
  userList: [],
  me: null,
  friends: [],
  feeds: [],
  login: [],
  mateFeed: [],

  st_testCallLoading: false,
  st_testCallDone: false,
  st_testCallError: null,

  st_userCallLoading: false,
  st_userCallDone: false,
  st_userCallError: null,

  st_getLoginUserLoading: false,
  st_getLoginUserDone: false,
  st_getLoginUserError: null,

  st_getFriendsLoading: false,
  st_getFriendsDone: false,
  st_getFriendsError: null,

  st_getFeedLoading: false,
  st_getFeedDone: false,
  st_getFeedError: null,

  st_loginLoading: false,
  st_loginDone: false,
  st_loginError: null,

  st_loginMateFeedLoading: false,
  st_loginMateFeedDone: false,
  st_loginMateFeedError: null,
};

export const TESTCALL_REQUEST = "TESTCALL_REQUEST";
export const TESTCALL_SUCCESS = "TESTCALL_SUCCESS";
export const TESTCALL_FAILURE = "TESTCALL_FAILURE";

export const USERCALL_REQUEST = "USERCALL_REQUEST";
export const USERCALL_SUCCESS = "USERCALL_SUCCESS";
export const USERCALL_FAILURE = "USERCALL_FAILURE";

export const LOGINUSER_REQUEST = "LOGINUSER_REQUEST";
export const LOGINUSER_SUCCESS = "LOGINUSER_SUCCESS";
export const LOGINUSER_FAILURE = "LOGINUSER_FAILURE";

export const GET_FRIENDS_REQUEST = "GET_FRIENDS_REQUEST";
export const GET_FRIENDS_SUCCESS = "GET_FRIENDS_SUCCESS";
export const GET_FRIENDS_FAILURE = "GET_FRIENDS_FAILURE";

export const GET_FEED_REQUEST = "GET_FEED_REQUEST";
export const GET_FEED_SUCCESS = "GET_FEED_SUCCESS";
export const GET_FEED_FAILURE = "GET_FEED_FAILURE";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const GET_MATE_FEED_REQUEST = "GET_MATE_FEED_REQUEST";
export const GET_MATE_FEED_SUCCESS = "GET_MATE_FEED_SUCCESS";
export const GET_MATE_FEED_FAILURE = "GET_MATE_FEED_FAILURE";

const reducer = (state = initState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case TESTCALL_REQUEST:
        draft.st_testCallLoading = true;
        draft.st_testCallDone = false;
        draft.st_testCallError = null;
        break;

      case TESTCALL_SUCCESS:
        draft.st_testCallLoading = false;
        draft.st_testCallDone = true;
        draft.st_testCallError = null;
        break;

      case TESTCALL_FAILURE:
        draft.st_testCallLoading = false;
        draft.st_testCallDone = false;
        draft.st_testCallError = "에러 저장";
        break;

      //

      case USERCALL_REQUEST:
        draft.st_userCallLoading = true;
        draft.st_userCallDone = false;
        draft.st_userCallError = null;
        break;

      case USERCALL_SUCCESS:
        draft.st_userCallLoading = false;
        draft.st_userCallDone = true;
        draft.st_userCallError = null;
        draft.userList = action.data;
        break;

      case USERCALL_FAILURE:
        draft.st_userCallLoading = false;
        draft.st_userCallDone = false;
        draft.st_userCallError = action.error;
        break;

      //

      case LOGINUSER_REQUEST:
        draft.st_getLoginUserLoading = true;
        draft.st_getLoginUserDone = false;
        draft.st_getLoginUserError = null;
        break;

      case LOGINUSER_SUCCESS:
        draft.st_getLoginUserLoading = false;
        draft.st_getLoginUserDone = true;
        draft.st_getLoginUserError = null;
        draft.me = action.data;

        break;

      case LOGINUSER_FAILURE:
        draft.st_getLoginUserLoading = false;
        draft.st_getLoginUserDone = false;
        draft.st_getLoginUserError = action.error;
        break;

      //

      case GET_FRIENDS_REQUEST:
        draft.st_getFriendsLoading = true;
        draft.st_getFriendsDone = false;
        draft.st_getFriendsError = null;
        break;

      case GET_FRIENDS_SUCCESS:
        draft.st_getFriendsLoading = false;
        draft.st_getFriendsDone = true;
        draft.st_getFriendsError = null;
        draft.friends = action.data;
        break;

      case GET_FRIENDS_FAILURE:
        draft.st_getFriendsLoading = false;
        draft.st_getFriendsDone = false;
        draft.st_getFriendsError = action.error;
        break;

      //

      case GET_FEED_REQUEST:
        draft.st_getFeedLoading = true;
        draft.st_getFeedDone = false;
        draft.st_getFeedError = null;
        break;

      case GET_FEED_SUCCESS:
        draft.st_getFeedLoading = false;
        draft.st_getFeedDone = true;
        draft.st_getFeedError = null;
        draft.feeds = action.data;
        break;

      case GET_FEED_FAILURE:
        draft.st_getFeedLoading = false;
        draft.st_getFeedDone = false;
        draft.st_getFeedError = action.error;
        break;

      //

      case LOGIN_REQUEST:
        draft.st_loginLoading = true;
        draft.st_loginDone = false;
        draft.st_loginError = null;
        break;

      case LOGIN_SUCCESS:
        draft.st_loginLoading = false;
        draft.st_loginDone = true;
        draft.st_loginError = null;
        draft.login = action.data;
        break;

      case LOGIN_FAILURE:
        draft.st_loginLoading = false;
        draft.st_loginDone = false;
        draft.st_loginError = action.error;
        break;

      //

      case GET_MATE_FEED_REQUEST:
        draft.st_loginMateFeedLoading = true;
        draft.st_loginMateFeedDone = false;
        draft.st_loginMateFeedError = null;
        break;

      case GET_MATE_FEED_SUCCESS:
        draft.st_loginMateFeedLoading = false;
        draft.st_loginMateFeedDone = true;
        draft.st_loginMateFeedError = null;
        draft.mateFeed = action.data;
        break;

      case GET_MATE_FEED_FAILURE:
        draft.st_loginMateFeedLoading = false;
        draft.st_loginMateFeedDone = false;
        draft.st_loginMateFeedError = action.error;
        break;

      default:
        break;
    }
  });

export default reducer;
