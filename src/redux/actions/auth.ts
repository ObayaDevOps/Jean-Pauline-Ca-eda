import { App, Credentials } from "realm-web";
import { setAuthState, setUser } from "@/src/redux/slices/authSlice";
import { APP_ID } from "@/src/config";

const app = new App({ id: APP_ID });

export const loadUser = () => {
  return async (dispatch) => {
    if (!app.currentUser) return false;
      try {
        await app.currentUser.refreshCustomData();
        // Now if we have a user we are setting it to our user context
        // so that we can use it in our app across different components.
        dispatch(setUser(app.currentUser));
      } catch (error) {
        throw error;
      }
  };
};

export const emailAndPasswordSignUp = (email: string, password: string) => {
  return async (dispatch) => {
      try {
      await app.emailPasswordAuth.registerUser({ email, password });
      const credentials = Credentials.emailPassword(email, password);
      const authedUser = await app.logIn(credentials);
    
      if (authedUser) {
      console.log("authedUser", authedUser)
        dispatch(setAuthState(true));
        dispatch(setUser(authedUser));
        //router.back();
      }
      
    } catch (error) {
      alert("Something went wrong!");
      throw error;
    }
  }
}

export const emailAndPasswordLogin = (email: string, password: string) => {
  return async (dispatch) => {
    try {

      const credentials = Credentials.emailPassword(email, password);
      const authedUser = await app.logIn(credentials);
    
      if (authedUser) {
        dispatch(setAuthState(true));
        dispatch(setUser(authedUser));
        //router.back();
      }
    } catch (error) {
      alert("Something went wrong!");
      console.log(error);
    }
  }
}

 export const logOutUser = () => {
    return async (dispatch) => {
      if (!app.currentUser) return false;
      try {
        await app.currentUser.logOut();
        // Setting the user to null once loggedOut.
        dispatch(setUser(null));
        window.location.reload();
      } catch (error) {
        throw error;
      }
    }
  };