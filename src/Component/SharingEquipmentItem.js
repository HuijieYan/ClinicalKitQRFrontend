import SharingListItems from "./SharingListItems";

const SharingEquipmentItem = ({data}) => {
    const generateNodes=(input)=>{
        let hospital;
        let equipment;
        let currentHospital = null;
        let equipments = [];
        const hospitals = [];
        let specialIndex = -1;
        const tree = {label: "All Hospitals", value: String(specialIndex)};
        specialIndex--;

        if (input.length>0){
            equipment = input[0];
            hospital = equipment.hospitalId;

            currentHospital = hospital;
            //set the hospital and trust pointer to current hospital
        }

         for (let i = 0;i<input.length;i++){
             equipment = input[i];
             hospital = equipment.hospitalId;
             const id = String(equipment.equipmentId) + "\n" + equipment.name;

             if (currentHospital.hospitalId !== hospital.hospitalId){
              hospitals.push({label:currentHospital.hospitalName,value:String(specialIndex),children:equipments});
              equipments=[];
              currentHospital = hospital;
              specialIndex--;
            }

            equipments.push({label:equipment.name,value:id});
        }
        
        hospitals.push({label:currentHospital.hospitalName,value:String(specialIndex),children:equipments});
        tree["children"] = hospitals;
        return tree;
    }

    return (  
        <SharingListItems data={data} generateNodes={generateNodes}/>
    );
}
 
export default SharingEquipmentItem;