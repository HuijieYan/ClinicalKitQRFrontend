class UserStatus{
    constructor(){
        this.name = "";
        this.level = -1;
    }

    setName(name){
        this.name = name;
    }

    setLevel(level){
        this.level = level;
    }

    getLevel(){
        return this.level;
    }

    getName(){
        return this.name;
    }
    
}
export default new UserStatus();