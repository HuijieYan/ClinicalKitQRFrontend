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
        var hospitalId = -1;
        var trustId = -1;
        var hospitalName = "";
        var trustName = "";
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

            trustId = trust.trustId;
            trustName = trust.trustName;
            hospitalId = hospital.hospitalId;
            hospitalName = hospital.hospitalName;
            //set the hospital and trust pointer to current hospital
        }

        for (let i = 0;i<input.length;i++){
            var group = input[i];
            var hospital = group.hospitalId;
            var trust = hospital.trust;
            var displayStr = generateDisplayName(group);

            if (hospitalId !== hospital.hospitalId){
                hospitals.push({label:hospitalName,value:String(specialIndex),children:groups});
                groups=[];
                hospitalName = hospital.hospitalName;
                hospitalId = hospital.hospitalId;
                specialIndex--;

                if (trustId !== trust.trustId){
                    trusts.push({label:trustName,value:String(specialIndex),children:hospitals});
                    hospitals = [];
                    trustName = trust.trustName;
                    trustId = trust.trustId;
                    specialIndex--;
                }
            }

            groups.push({label:displayStr,value:String(i)});
        }
        

        hospitals.push({label:hospitalName,value:String(specialIndex),children:groups});
        specialIndex--;
        trusts.push({label:trustName,value:String(specialIndex),children:hospitals});
        //console.log(trusts);
        tree["children"] = trusts;
        //console.log(tree);
        return tree;
    }

    return ( 
        <SharingListItems data={data} generateNodes={generateNodes} />
     );
}
 
export default SharingUsergroupItem;