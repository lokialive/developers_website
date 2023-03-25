// import React, {useEffect} from "react";

// import SavedItem from "./SavedItem";

// import savedItems from "./SavedInfo.json"

// import {useDispatch, useSelector} from "react-redux";
// import {findSavedItems} from "./savedItem-service";
// import {findSavedItemsThunk} from "./savedItem-thunks";

// const SavedList = () => {

//     //const {positions, loading} = useSelector(state => state.positionData)

//     const dispatch = useDispatch();

//     useEffect(() => {
//         dispatch(findSavedItemsThunk)}, [])

//     return(

//         <ul className="list-group">

//             {

//                 savedItems.map(saveItem => <SavedItem key={saveItem._id} saved={saveItem}/> )
//             }
//         </ul>
//     );
// };
// export default SavedList;
