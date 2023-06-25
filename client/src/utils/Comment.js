export const formatComments = (comments) => comments.map((comment) => ({
    user: {
        fullName: comment?.user?.fullName,
        profilePic: comment?.user?.profilePic,
    },
    text: comment?.text,
}));
