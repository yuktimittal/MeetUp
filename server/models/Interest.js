var interestSchema = mongoose.Schema({
    event : [Event.schema],
    user: [User.schema],
    created_on : {
        type: [Date],
        default: ''
    } 
})