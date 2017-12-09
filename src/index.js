import axios from 'axios'

const basePath = 'https://graph.facebook.com/v2.9/'

class AppolodoroFb{
    /**
     * 
     * @param {app of facebook app} appId 
     * @param {user id of current user} uid
     * @param {access token provided for firebase available in store} accessToken
     */
    constructor	(appId, uid, accessToken = null ){
        if(!appId){
            throw new Error('You need an appId')
        }        

        this.appId = appId;
        this.uid = uid;
        this.accessToken = accessToken;
    }
    
    shareMobile(href, redirect_uri){
        const url = `https://www.facebook.com/dialog/share?app_id=${this.appId}&href=${href}&redirect_uri=${redirect_uri}&display=page`;
        try{
            window.location.assign(url)
            return url;
        }catch(error){
            console.log(error)
        }        
        
    }
    shareDesktop(href){
        window.FB.ui({
            method: 'share',
            href: href,
        }, function(response){});
    }
    /** 
     * @param {*} href url to share 
     * @param {*} redirect_uri url to redirect post mobile share
     * @param {*} method auto|desktop|mobile
     */
    share(href, redirect_uri = null, method = 'auto'){
        
        redirect_uri = (redirect_uri) ? redirect_uri : href;

        switch(method){
            case 'mobile' :
                return this.shareMobile(href, redirect_uri);
            break;
            case 'desktop':
                return this.shareDesktop(href);
            break;
            default:
                try{
                    if(window.innerWidth < 990){
                        return this.shareMobile(href);
                    }else{
                        return this.shareDesktop(href);
                    }                    
                }catch(error){

                }
            break
        }        
    }

    getShareUrl(href, redirect_uri){
        const url = `https://www.facebook.com/dialog/share?app_id=${this.appId}&href=${href}&redirect_uri=${redirect_uri}&display=page`;
        return url;
    }

    /**
     * 
     * @param {*} videoData 
     */
    postVideo(videoData){
        const url = 'https://graph-video.facebook.com/'+this.uid+'/videos?access_token='+this.accessToken;
        
        const data = new FormData();
        data.append('file_url', videoData.file_url);
        data.append('title', videoData.title);
        data.append('description', videoData.description);

        return axios.post(url, data);
    }

    postImage(imageData){
        const url = 'https://graph.facebook.com/v2.4/me/photos';
        
        const data = new FormData();
        data.append('url', imageData.url);
        data.append('caption', imageData.caption);
        data.append('access_token', this.accessToken);

        return axios.post(url, data);

    }    
}

export default AppolodoroFb;