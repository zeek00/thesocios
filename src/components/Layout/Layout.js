// import React, { useState } from 'react';
// import classes from './Layout.module.css';
// import Header from '../Navigation/Header/Header.jsx';
// import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
// import Footer from '../Navigation/Footer/Footer';
// import { useDispatch, useSelector } from 'react-redux';
// import * as actions from "../../store/actions";

// const Layout = (props) => {
//   // State hook to manage the SideDrawer visibility
//   const [showSideDrawer, setShowSideDrawer] = useState(false);

//   // Accessing redux state
//   const loading = useSelector((state) => state.auth.loading);
//   const isAuth = useSelector((state) => state.auth.token !== null);
//   const isVerify = useSelector((state) => state.auth.setOTP);
//   const userData = useSelector((state) => state.auth.userData || {});

//   // Redux dispatch hook
//   const dispatch = useDispatch();
  
//   // Dispatch action to log out
//   const logOut = () => dispatch(actions.logout());

//   // Handlers for opening and closing SideDrawer
//   const closeSideDrawerHandler = () => setShowSideDrawer(false);
//   const openSideDrawerHandler = () => setShowSideDrawer(true);

//   return (
//     <React.Fragment>
//       <div className="header">
//         <Header
//           logout={logOut}
//           username={userData.fullname ? userData.fullname : ''}
//           isVerify={isVerify}
//           isAuth={isAuth}
//           openDrawer={openSideDrawerHandler}
//         />
//       </div>

//       <div className="content">
//         <SideDrawer
//           logout={logOut}
//           username={userData.fullname}
//           isVerify={isVerify}
//           isAuth={isAuth}
//           open={showSideDrawer}
//           closeDrawer={closeSideDrawerHandler}
//         />
//         <main className={classes.main}>
//           {props.children}
//         </main>
//       </div>

//       <div className="footer">
//         <Footer />
//       </div>
//     </React.Fragment>
//   );
// };

// export default Layout;
