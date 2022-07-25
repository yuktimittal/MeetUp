var groupSchema = mongoose.Schema({
    name: String,
    about: String,
    picture: String,
    events : [Event.schema],
    users: [User.schema],
    created_on : {
        type: [Date],
        default: ''
    } 
})