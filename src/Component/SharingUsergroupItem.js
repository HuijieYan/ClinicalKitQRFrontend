import { getHospitalId, getUserName } from "../Functions/UserStatus";
import SharingListItems from "./SharingListItems";

const SharingUsergroupItem = ({data}) => {
    const generateNodes=(input)=>{
        let trust;
        let hospital;
        let group;
        const ownHospitalId = Number(getHospitalId());
        const ownUsername = getUserName();
        let currentHospital = null;
        let currentTrust = null;
        let specialIndex = -1;
        const tree = {label: "All Trust", value: String(specialIndex)};
        const trusts = [];
        let hospitals = [];
        let groups = [];
        specialIndex--;

        function generateDisplayName(group){
            let displayStr = "";
            if(group.specialty===""){
              displayStr = group.name;
            }else{
              displayStr = group.name+"-"+group.specialty;
            }
            return displayStr;
          }

        if (input.length>0){
            group = input[0];
            hospital = group.hospitalId;
            trust = hospital.trust;

            currentTrust = trust;
            currentHospital = hospital;
            //set the hospital and trust pointer to current hospital and trust
        }

        for (let i = 0;i<input.length;i++){
            group = input[i];
            hospital = group.hospitalId;
            trust = hospital.trust;
            const displayStr = generateDisplayName(group);
            const id = String(hospital.hospitalId) + "\n" + group.username + "\n" + displayStr;

            if (currentHospital.hospitalId !== hospital.hospitalId){
                if (groups.length>0){
                    hospitals.push({label:currentHospital.hospitalName,value:String(specialIndex),children:groups});
                }
                groups=[];
                currentHospital = hospital;
                specialIndex--;

                if (currentTrust.trustId !== trust.trustId){
                    if (hospitals.length>0){
                        trusts.push({label:currentTrust.trustName,value:String(specialIndex),children:hospitals});
                    }
                    hospitals = [];
                    currentTrust = trust;
                    specialIndex--;
                }
            }
            if (group.username!==ownUsername||hospital.hospitalId!==ownHospitalId){
                groups.push({label:displayStr,value:id});
            }
            
        }
        
        hospitals.push({label:currentHospital.hospitalName,value:String(specialIndex),children:groups});
        specialIndex--;
        trusts.push({label:currentTrust.trustName,value:String(specialIndex),children:hospitals});
        tree["children"] = trusts;
        return tree;
    }

    return (<SharingListItems data={data} generateNodes={generateNodes}/>);
}
 
export default SharingUsergroupItem;