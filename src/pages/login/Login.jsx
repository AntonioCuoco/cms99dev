// import React from 'react';
import OtpInput from "otp-input-react";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
// import { auth } from "../../firebase/firebase.config";
import { RecaptchaVerifier,signInWithEmailAndPassword,signInWithPhoneNumber } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {Modal, Select} from "antd";
import { useDispatch,useSelector } from "react-redux";
import {switchIsLoggedIn,switchIsVerified} from "../../redux/slice/Login_slice"
import "react-phone-input-2/lib/style.css";
import pokemon from "../../assets/pokemon.png"
import pokemon2 from "../../assets/Mimikyu-Pokemon-PNG-Photo-Image.png"
import './Login.css';

const Login = () => {
// const [user,setUser] = useState("");
// const [password,setPassword] = useState("");
// const [confirmationResultState,setConfirmationResult] = useState([]);
// const [isModalOpen,setIsModalOpen] = useState(false);
// const [VerificationIdState,setVerificationId] = useState("");
// const [otp, setOtp] = useState("");
// const [ph, setPh] = useState("");
// const [showOTP, setShowOTP] = useState(false);
// const navigate = useNavigate();
// const dispatch = useDispatch();
// const isLoggedIn = useSelector(state => state.loginSlice.isLoggedIn);

// let recaptchaVerifier = null;

//   // use effect che controlla se si è loggati o no ogni tot o ogni volta che cambia il valore
//   // quando si fa la sign out si deve togliere il verified e cancellare il recaptcha con il clear 
//   // poi bisogna vdere come far riproporre il processo di autenticazione, 
//   // facendo auth.signout vedere se funziona

//   const getUser = async(e) => {
//     e.preventDefault();
//     try {
//       await signInWithEmailAndPassword(auth,user, password).catch((err) => console.log(err));
//       dispatch(switchIsLoggedIn());
//       setIsModalOpen(true);
//     }
//     catch(error) {
//       console.log(error);
//     }
//   }

//   // const sentOtp = async() => {
//   //     if(isLoggedIn) {
//   //       recaptchaVerifier = new RecaptchaVerifier(
//   //         auth,
//   //         "btn-sendCode",
//   //         { size: "invisible" },
//   //       );
//   //         if(ph === "+393318941139") {
//   //         signInWithPhoneNumber(auth, ph, recaptchaVerifier)
//   //         .then((confirmationResult) => {
//   //           console.log(confirmationResult);
//   //           setConfirmationResult(confirmationResult);
//   //           setVerificationId(confirmationResult.verificationId);
//   //           setShowOTP(true);
//   //         }).catch((error) => {
//   //           console.log(error);
//   //         });
//   //         }
//   //       }
//   //     }

//   //   const verifyOtp = async(e) => {
//   //     e.preventDefault();
//   //     try {
  
//   //       const user = auth.currentUser;

//   //       confirmationResultState.confirm(otp).then((result) => {
//   //         console.log(result);
//   //         dispatch(switchIsVerified());
//   //         navigate("/");
//   //       }).catch((error) => {
//   //         console.log(error);
//   //       });
//   //     } catch (err) {
//   //       console.log(err);
//   //     }
//   //   };
  
//   const onChangeEmail = (e) => {
//     setUser(e.target.value);
//   }

//   const onChangePass = (e) => {
//     setPassword(e.target.value);
//   }

//   // const onChangeOtp = (e) => {
//   //   setOtp(e);
//   // }

//   return (
//     <div className="login-container">
//       <div className="login-image">
//          <img src={pokemon} className='img-background'></img>
//       </div>
//       <div className="login-image">
//          <img src={pokemon2} className='img-background2'></img>
//       </div>
//       <div className="login-form">
//         <form>
//           <h2 style={{textAlign:'center',fontSize:"24px",color:"white"}}>Login</h2>
//           <div className="form-group">
//             <label htmlFor="username" className='label-username' >Username:</label>
//             <input type="text" id="username" name="username" onChange={(e) => onChangeEmail(e)}/>
//           </div>
//           <div className="form-group">
//             <label htmlFor="password" className='label-password' >Password:</label>
//             <input type="password" id="password" name="password" onChange={(e) => onChangePass(e)}/>
//           </div>
//           <Select placeholder="Scegli il servizio" options={[{ value: 'CmsProject', label: 'CmsProject' },{ value: 'ScritturaLibro', label: 'ScritturaLibro' }]} style={{marginBottom:"16px"}}/>
//           <button type="button" className='btn-login' onClick={(e) => getUser(e)}>Login</button>
//         </form>
//       </div>
//     {/* <Modal title="Basic Modal" open={isModalOpen} closeIcon={false} footer={null} centered={true}>
//     {showOTP ? (
//               <>
//               <div id="recaptcha-container"></div>
//                 <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
//                   <p>icona</p>
//                 </div>
//                 <label
//                   htmlFor="otp"
//                   className="font-bold text-xl text-white text-center"
//                 >
//                   Enter your OTP
//                 </label>
//                 <OtpInput
//                   value={otp}
//                   onChange={(e) => onChangeOtp(e)}
//                   OTPLength={6}
//                   otpType="number"
//                   disabled={false}
//                   autoFocus
//                   className="opt-container "
//                 />
//                 <button onClick={async(e) => await verifyOtp(e)}>
//                   <span>Verify OTP</span>
//                 </button>
//                 <button
//                   onClick={() => setIsModalOpen(isModalOpen => !isModalOpen)}
//                   style={{marginLeft:"12px"}}
//                 >
//                   <span>Close Modal</span>
//                 </button>
//               </>
//             ) : (
//               <>
//                 <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
//                   <p>icona</p>
//                 </div>
//                 <label
//                   htmlFor=""
//                   className="font-bold text-xl text-white text-center"
//                 >
//                   Verify your phone number
//                 </label>
//                 <PhoneInput country={"in"} value={ph} onChange={phone => setPh("+" + phone)}/>
//                 <button
//                   onClick={async() => await sentOtp()}
//                   id="btn-sendCode"
//                   style={{marginTop:"22px",backgroundColor: "#535bf2"}}
//                 >
//                   <span>Send code via SMS</span>
//                 </button>
//                 <button
//                   onClick={() => setIsModalOpen(isModalOpen => !isModalOpen)}
//                   style={{marginLeft: "12px",marginTop:"22px",backgroundColor:"#535bf2"}}
//                 >
//                   <span>Close Modal</span>
//                 </button>
//               </>
//             )}
//     </Modal> */}
//     </div>
//   );
};

export default Login;