import { Checkbox } from "@mui/material";

const InboxEquipmentCheckbox = ({selected,id}) => {
    return (  
        <Checkbox
            checked={selected.indexOf(id) !== -1}
            edge="start"
            tabIndex={-1}
            disableRipple
        />
    );
}
 
export default InboxEquipmentCheckbox;