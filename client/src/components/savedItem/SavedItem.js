// import React from "react";
// import position from "../../img/position.png"
// import {useDispatch} from "react-redux";

// //import {deletePositionThunk} from "./Position-thunks";

// const SavedItem = (
//     {
//         saved= {
//             "_id": 123,
//             "name": "Northeastern University",
//             "category": "Higher Education",
//             "location":"Boston,MA",
//         }
//     }
// ) => {

//     const dispatch = useDispatch();

//     return(
//         <li className="list-group-item pt-2">
//             <div className="row ">
//                 <div className="col-2">
//                     <img width={20} className="float pt-2 pb-2 rounded " alt={"position"} src={position}/>
//                 </div>
//                 <div className="col-10 pt-1 pb-1 pe-0">

//                     <div className="ps-3 h4">
//                         {saved.name}
//                     </div>
//                     <div className="col-10 ps-3 text-secondary">
//                         <i className="bi bi-tags"></i> {saved.category}
//                     </div>
//                     <div className="col-10 ps-3 text-secondary">
//                         <i className="bi bi-geo"></i> {saved.location}
//                     </div>
//                 </div>
//             </div>
//         </li>
//     );
// };

// export default SavedItem;
