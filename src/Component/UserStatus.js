class UserStatus{
    constructor(){
        this.name = "";
        this.level = -1;
        this.trustID = -1;
        this.hospitalID = -1;
    }

    setName(name){
        this.name = name;
    }

    setLevel(level){
        this.level = level;
    }

    setTrustID(id){
        this.trustID = id;
    }

    setHospitalID(id){
        this.hospitalID = id;
    }

    getLevel(){
        return this.level;
    }

    getName(){
        return this.name;
    }
    
    getTrustId(){
        return this.trustID;
    }

    getHospitalId(){
        return this.hospitalID;
    }
}
export default new UserStatus();