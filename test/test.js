var assert = require('assert');
var AppolodoroFb = require('../dist').default
var appId = '123456'
var uid = '12345678'

describe('Test Appoolodoro-fb', function() {
    shareFb = new AppolodoroFb(appId, uid, null)
    
    it('Testing contructor', function() {
        assert.equal(shareFb.appId, appId)
    });  
    
});
