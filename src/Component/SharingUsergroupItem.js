import { getHospitalId, getUserName } from "../Functions/UserStatus";
import SharingListItems from "./SharingListItems";

const SharingUsergroupItem = ({data}) => {
    const generateNodes=(input)=>{
        function generateDisplayName(group){
            var displayStr = "";
            if(group.specialty===null){
              displayStr = group.name;
            }else{
              displayStr = group.name+"-"+group.specialty.specialty;
            }
            return displayStr;
          }

        //console.log(data);
        var ownHospitalId = Number(getHospitalId());
        var ownUsername = getUserName();
        var currentHospital=null;
        var currentTrust = null;
        var specialIndex = -1;
        var tree = {label:"All Trust",value:String(specialIndex)};
        var trusts = [];
        var hospitals = [];
        var groups = [];
        specialIndex--;

        if (input.length>0){
            var group = input[0];
            var hospital = group.hospitalId;
            var trust = hospital.trust;

            currentTrust = trust;
            currentHospital = hospital;
            //set the hospital and trust pointer to current hospital and trust
        }

        for (let i = 0;i<input.length;i++){
            var group = input[i];
            var hospital = group.hospitalId;
            var trust = hospital.trust;
            var displayStr = generateDisplayName(group);
            var id = String(hospital.hospitalId)+"\n"+group.username+"\n"+displayStr;

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
        //console.log(trusts);
        tree["children"] = trusts;
        //console.log(tree);
        return tree;
    }

    return ( 
        <SharingListItems data={data} generateNodes={generateNodes}/>
     );
}
 
export default SharingUsergroupItem;