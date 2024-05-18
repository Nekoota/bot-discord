module.exports = {
    validateYouTubeUrl(url) {
        // Regular expression to match YouTube video URLs
        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([\w\-]{11})$/;
        
        // Check if the URL matches the regular expression
        return youtubeRegex.test(url);
    }
};
