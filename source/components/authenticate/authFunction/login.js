/**
 * Created by Jan on 15.9.2016.
 */
import Relay from 'react-relay';

import loginMutation from '../../../mutations/loginMutation';

export default function (loggedInID, username, password) {
  Relay.Store.commitUpdate(
    new loginMutation({
      loggedIn: loggedInID,
      username: username,
      password: password
    }), {
      onFailure: (transaction) => {
        console.log(transaction.getError().source);
      },
      onSuccess: (response) => {
        localStorage.setItem("token", response.loginUser.token);
      }
    }
  );
}