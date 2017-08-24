export class MemberModel {
    
    constructor(id, pwd, role, tel, name) {
        this.userId = id;
        this.userPassword = pwd; 
        this.userMemberRole = role;
        this.userMemberTel = tel;
        this.userName = name;
    }
    
}