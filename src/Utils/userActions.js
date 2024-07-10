import { createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "../../redux/slicers/userSlicer";
import { auth } from "../../firebaseConfig";

const handleSignup = async (values) => {
  const dispatch = useDispatch();
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      values["email"],
      values["password"]
    );
    //console.log(userCredential);
    dispatch(setUser(userCredential));
  } catch (error) {
    console.error("Error logging in: ", error);
  }
};

const handleLogout = () => {
  const dispatch = useDispatch();
  auth
    .signOut()
    .then(() => {
      dispatch(clearUser());
    })
    .catch((error) => {
      console.error("Error logging out: ", error);
    });
};

export { handleSignup, handleLogout };
