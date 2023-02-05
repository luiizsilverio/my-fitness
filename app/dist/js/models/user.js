export class User {
    constructor(id, name, username, email, password, type_user_id) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.type_user_id = type_user_id;
    }
    static criar(id, name, username, email, password, type_user_id) {
        return new User(id, name, username, email, password, type_user_id);
    }
}
//# sourceMappingURL=user.js.map