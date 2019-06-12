class userDto {
    constructor(userModel){
        this._id = userModel._id;
        this.fullName = userModel.fullName;
        this.username = userModel.username;
        this.email = userModel.email;
        this.topics = userModel.topics;
    }
};

module.exports = userDto;