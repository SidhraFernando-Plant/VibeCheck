//
// Service to send API requests for Reply table
//
import httpCommon from "../http-common";

// Make a new reply
// JSON data = {date, text (body of reply), postId (of post being replied), username (reply author)}
const newReply = (data) => {
    return httpCommon.post("/replies/new-reply" , data);
}

export default {
    newReply
}