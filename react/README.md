# VibeCheck - s3873756

##Login credentials
username: Alex123
password: abc123!

##Data initialisation
If no user key are found in localStorage, one user and two posts will be loaded into local storage upon visiting the landing page. This feature was added to give the app a more complete look when running it, though I was not sure if it was what was required so this data can be cleared from local storage if necessary. This initialisation function can be found in src>data>userRepository.js. 

The initialised user does not come with a profile picture due to the difficulty of storing the base64 url in the Javascript file, so it just has the default profile picture. A profile picture can be uploaded on the my profile page. Due to the file size limitation of the uploads (outlined below), I have included two sample images that can be uploaded as profile pictures - note that when testing this feature you can use any image less than 1MB, I have just included these ones for convenience as they already meet the size requirement. Feel free to use any image though, as the uploaded image does not need to be in the project directory.

Some posts/replies are by users that does not exist because the data is primarily for visualisation purposes, but this can be removed from local storage if it is an issue.

If you are removing the initialised data please do not remove the data with key 'postId' as this is essential to creating posts.

##Image uploads limitations
Image uploads use base 64 blob url stored in local storage. As local storage has limited space, this is not a scalable solution and has problems if large images are uploaded. A file size limit has been imposed due to this, but the local storage would still inevitably run out. If an image uploaded is too large, it will cause errors due to the limitations of local storage.

##Security limitations
Note that passwords are still stored in plain text at this stage. This will be updated in future improvements.

##Features implemented
All features outlined in the spec have been implemented, with the exception of image uploads in posts for the HD section of the assignment (however image uploads for avatars are implemented).

Please contact s3873756@student.rmit.edu.au if you have any issues or queries.
