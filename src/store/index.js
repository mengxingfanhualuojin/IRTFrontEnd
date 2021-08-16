/*
 * 配置Store和localStorage
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        username:localStorage.getItem('username')||null,
        userid:localStorage.getItem('userid') || null,

        questionNumber:localStorage.getItem('questionNumber')||null,

        number:localStorage.getItem('number')||null,
        userChoice:localStorage.getItem('userChoice')||null,
        correctChoice:localStorage.getItem('correctChoice')||null,

        goQuestionState:localStorage.getItem('goQuestionState')||"0",

        //跳转到详情页面时存储的问题内容
        question:localStorage.getItem('question')||null,

        //跳转到搜索结果页面时存储的搜索内容
        search:localStorage.getItem('search')||null,

        //主页面推荐和热榜之一，1为推荐，2为热榜，默认为推荐
        homePageActiveIndex:localStorage.getItem('homePageActiveIndex') || "1",

        //个人中心页面
        //1为浏览记录，2为搜索记录，3为我的提问，4为我的回答，5为个人信息
        //默认为浏览记录
        personalCenterActiveIndex:localStorage.getItem('personalCenterActiveIndex') || "1",

        //存储用户在登录或注册前访问的页面，登录成功自动为用户跳转
        //1为HomePage，2为SearchResult，3为Detail
        pageBeforeRegisterOrLogin:localStorage.getItem('pageBeforeRegisterOrLogin') || "1",

    },
    mutations: {
        //登陆成功，存储token、username和nickname
        storeUsername(state, username){
            localStorage.setItem("username",username)
            state.username=username

        },

        storeUserid(state, userid){
            localStorage.setItem("userid",userid)
            state.userid=userid

        },

        storeQuestionNumber(state,questionNumber){
            localStorage.setItem("questionNumber",questionNumber);
            state.questionNumber = questionNumber
        },
        //修改昵称
        changeNickname(state,nickname){
            localStorage.setItem("nickname",nickname);
            state.nickname = nickname
        },

        //存储问题内容
        storeQuestion(state,question){
            localStorage.setItem('question', question)
            state.question = question;
        },

        storeNumber(state,number){
            localStorage.setItem('number', number)
            state.number = number;
        },

        storeGoQuestionState(state,goQuestionState){
            localStorage.setItem('goQuestionState', goQuestionState)
            state.goQuestionState = goQuestionState;
        },

        storeUserChoice(state,userChoice){
            localStorage.setItem('userChoice', userChoice)
            state.userChoice = userChoice;
        },

        storeCorrectChoice(state,correctChoice){
            localStorage.setItem('correctChoice', correctChoice)
            state.correctChoice = correctChoice;
        },


        //存储搜索内容
        storeSearch(state,search){
            localStorage.setItem('search', search)
            state.search = search;
        },

        //存储homePageActiveIndex
        storeHomePageActiveIndex(state, homePageActiveIndex){
            localStorage.setItem('homePageActiveIndex',homePageActiveIndex);
            state.homePageActiveIndex = homePageActiveIndex
        },

        //存储personalCenterActiveIndex
        storePersonalCenterActiveIndex(state, personalCenterActiveIndex){
            localStorage.setItem('personalCenterActiveIndex',personalCenterActiveIndex);
            state.personalCenterActiveIndex = personalCenterActiveIndex
        },

        //存储用户在登录或注册前访问的页面
        storePageBeforeRegisterOrLogin(state,pageBeforeRegisterOrLogin){
            localStorage.setItem("pageBeforeRegisterOrLogin",pageBeforeRegisterOrLogin);
            state.pageBeforeRegisterOrLogin = pageBeforeRegisterOrLogin

        },

        //登出
        logout(state) {
            localStorage.removeItem('username');
            localStorage.removeItem('userid')

            state.username = null;
            state.userid = null;

        },

    },
    actions: {
    }
})
