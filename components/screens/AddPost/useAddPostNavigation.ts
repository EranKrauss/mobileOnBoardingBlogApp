import * as navi from '../../../navigation/navigation'
import {useEffect} from "react";

const useAddPostNavigation = (componentId : string) => {

    const options = {
        topBar: {
            rightButtons: [{
                id: "saveBtn",
                text: "Save",
                enabled: false,
            }],
            leftButtons: [{
                id: "cancelBtn",
                text: "cancel",
            }],
        },
    }

    useEffect(() => {
        navi.mergeOptions({componentId, options})
    }, [])



};

export default useAddPostNavigation;
