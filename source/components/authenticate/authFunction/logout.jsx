/**
 * Created by Jan on 23.8.2016.
 */
import Relay from 'react-relay';

import logoutMutation from '../../../mutations/logoutMutation.jsx';

export default function (loggedInID) {
    Relay.Store.commitUpdate(
      new logoutMutation({
          loggedIn: loggedInID
      }), {
          onFailure: (transaction) => {
              console.log(transaction.getError().source);
          },
          onSuccess: () => {
              localStorage.removeItem("token");
          }
      }
    );
}

