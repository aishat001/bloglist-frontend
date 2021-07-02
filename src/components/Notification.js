import { useEffect } from "react";

const Notification = ({errorMessage, info, setInfo, setErrorMessage}) => {
useEffect(() => {
    if (errorMessage || info) {
        const timer = setTimeout(() => {
         setErrorMessage(null);
         setInfo(null);
        }, 5000);
        return () => clearTimeout(timer)
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [errorMessage, info]);
    
    return ( 
       <div>
       { errorMessage ? 
        
            <div className="error">{errorMessage}</div>
        : info ?
        <div className="info">{info}</div>
        :
        null}
</div>
)
       }
 
export default Notification