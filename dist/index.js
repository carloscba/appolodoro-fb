'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var basePath = 'https://graph.facebook.com/v2.9/';

var AppolodoroFb = function () {
    /**
     * 
     * @param {app of facebook app} appId 
     * @param {user id of current user} uid
     * @param {access token provided for firebase available in store} accessToken
     */
    function AppolodoroFb(appId, uid) {
        var accessToken = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

        _classCallCheck(this, AppolodoroFb);

        if (!appId) {
            throw new Error('You need an appId');
        }

        this.appId = appId;
        this.uid = uid;
        this.accessToken = accessToken;
    }

    _createClass(AppolodoroFb, [{
        key: 'shareMobile',
        value: function shareMobile(href, redirect_uri) {
            var url = 'https://www.facebook.com/dialog/share?app_id=' + this.appId + '&href=' + href + '&redirect_uri=' + redirect_uri + '&display=page';
            try {
                window.location.assign(url);
                return url;
            } catch (error) {
                console.log(error);
            }
        }
    }, {
        key: 'shareDesktop',
        value: function shareDesktop(href) {
            window.FB.ui({
                method: 'share',
                href: href
            }, function (response) {});
        }
        /** 
         * @param {*} href url to share 
         * @param {*} redirect_uri url to redirect post mobile share
         * @param {*} method auto|desktop|mobile
         */

    }, {
        key: 'share',
        value: function share(href) {
            var redirect_uri = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'auto';


            redirect_uri = redirect_uri ? redirect_uri : href;

            switch (method) {
                case 'mobile':
                    return this.shareMobile(href, redirect_uri);
                    break;
                case 'desktop':
                    return this.shareDesktop(href);
                    break;
                default:
                    try {
                        if (window.innerWidth < 990) {
                            return this.shareMobile(href);
                        } else {
                            return this.shareDesktop(href);
                        }
                    } catch (error) {}
                    break;
            }
        }
    }, {
        key: 'getShareUrl',
        value: function getShareUrl(href, redirect_uri) {
            var url = 'https://www.facebook.com/dialog/share?app_id=' + this.appId + '&href=' + href + '&redirect_uri=' + redirect_uri + '&display=page';
            return url;
        }

        /**
         * 
         * @param {*} videoData 
         */

    }, {
        key: 'postVideo',
        value: function postVideo(videoData) {
            var url = 'https://graph-video.facebook.com/' + this.uid + '/videos?access_token=' + this.accessToken;

            var data = new FormData();
            data.append('file_url', videoData.file_url);
            data.append('title', videoData.title);
            data.append('description', videoData.description);

            return _axios2.default.post(url, data);
        }
    }, {
        key: 'postImage',
        value: function postImage(imageData) {
            var url = 'https://graph.facebook.com/v2.4/me/photos';

            var data = new FormData();
            data.append('url', imageData.url);
            data.append('caption', imageData.caption);
            data.append('access_token', this.accessToken);

            return _axios2.default.post(url, data);
        }
    }]);

    return AppolodoroFb;
}();

exports.default = AppolodoroFb;