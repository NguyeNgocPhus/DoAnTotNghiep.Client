import { Log, UserManager } from 'oidc-client';
const AuthService = (function () {
    var userManager
    function init(oidcClient) {
        const settings = {
            authority: oidcClient.stsAuthority, //https://localhost:5001
            client_id: oidcClient.clientId, // mvc
            redirect_uri: `${oidcClient.clientRoot}signin-callback.html`, // http://localhost:3000
            silent_redirect_uri: `${oidcClient.clientRoot}silent-renew.html`, // http://localhost:3000
            post_logout_redirect_uri: `${oidcClient.clientLogoutURL}`, // http://localhost:3000/login
            response_type: 'code',
            scope: oidcClient.clientScope, // openid profile
            loadUserInfo: true,
            automaticSilentRenew: true,
            filterProtocolClaims: true,
            monitorSession: true,
            accessTokenExpiringNotificationTime: 180
        }
        userManager = new UserManager(settings)
    }
    Log.logger = console
    Log.level = Log.INFO


    function getUser() {
        var user = userManager.getUser()
        if (!user) {
            return userManager.signinRedirectCallback()
        }
        return user
    }
    function login() {
        return userManager.signinRedirect()
    }
    function renewToken() {
        return userManager.signinSilent()
    }
    function logout() {
        let paramLogout = {
            // id_token_hint: localStorage.getItem(KEY_ID_TOKEN)
        }
        return userManager.signoutRedirect(paramLogout)
    }
    function checkSession() {
        return userManager.querySessionStatus()
    }
    function eventSignOut(event) {
        return userManager.events.addUserSignedOut(() => {
            console.log('LOGOUT SSO')
            event()
        })
    }
    function eventAddAccessTokenExpiring() {
        return userManager.events.addAccessTokenExpiring(() => {
            console.log('AT expiring event success')
        })
    }


    function eventAddAccessTokenExpired() {
        return userManager.events.addAccessTokenExpired(() => {
            console.log('AT expired event success')
            setTimeout(() => {
                userManager.signinSilent()
            }, 1000)
        })
    }


    function eventAddSilentRenewError() {
        return userManager.events.addSilentRenewError(() => {
            console.log('Silent renew error')
            setTimeout(() => {
                userManager.signinSilent()
            }, 1000)
        })
    }


    function eventAddUserLoaded() {
        
        return userManager.events.addUserLoaded(() => {
            console.log("listen event");
            userManager.getUser().then((user) => {
                console.log("user_oidc", user);
                window.localStorage.setItem("TOKEN", user.access_token)
                window.localStorage.setItem("ID_TOKEN", user.id_token)
                window.localStorage.setItem("USER", JSON.stringify(user))
            })
        })
    }


    return {
        getUser: getUser,
        login: login,
        renewToken: renewToken,
        logout: logout,
        checkSession: checkSession,
        eventSignOut: eventSignOut,
        eventAddAccessTokenExpiring: eventAddAccessTokenExpiring,
        eventAddAccessTokenExpired: eventAddAccessTokenExpired,
        eventAddUserLoaded: eventAddUserLoaded,
        eventAddSilentRenewError: eventAddSilentRenewError,
        init: init
    }
})()


export default AuthService