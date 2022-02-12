import SharingListItems from "./SharingListItems";

const SharingEquipmentItem = ({data}) => {
    const generateNodes=(input)=>{
        var currentHospital = null;
        var equipments = [];
        var hospitals = [];
        var specialIndex = -1;
        var tree = {label:"All Hospitals",value:String(specialIndex)};
        specialIndex--;

        if (input.length>0){
            var equipment = input[0];
            var hospital = equipment.hospitalId;

            currentHospital = hospital;
            //set the hospital and trust pointer to current hospital
        }

         for (let i = 0;i<input.length;i++){
            var equipment = input[i];
            var hospital = equipment.hospitalId;
    
            if (currentHospital.hospitalId !== hospital.hospitalId){
              hospitals.push({label:currentHospital.hospitalName,value:String(specialIndex),children:equipments});
              equipments=[];
              currentHospital = hospital;
              specialIndex--;
            }

            equipments.push({label:equipment.name,value:String(equipment.equipmentId)});
        }
        
        hospitals.push({label:currentHospital.hospitalName,value:String(specialIndex),children:equipments});
        tree["children"] = hospitals;
        console.log("IH");
        console.log(tree);
        return tree;
    }

    return (  
        <SharingListItems data={data} generateNodes={generateNodes}/>
    );
}
 
export default SharingEquipmentItem;