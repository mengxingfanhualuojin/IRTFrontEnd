/*
 * 配置路由
 */
import Vue from 'vue'
import Router from 'vue-router'
import HomePage from "../src/components/HomePage";
import Login from "../src/components/Login";
import Register from "../src/components/Register";
import Graph from "../src/components/Graph";
import ItemResponses from "../src/components/ItemResponses";
import Question from "../src/components/Question";
import QuestionDetail from "../src/components/QuestionDetail";
import TableDemo from "../src/components/TableDemo";
import AnswerDemo from "../src/components/AnswerDemo";
import Demo from "../src/components/Demo";
import PersonalCenter from "../src/components/PersonalCenter";
import Test from "../src/components/Test";
import TestResult from "../src/components/TestResult";
import NeovisDemo from "../src/components/NeovisDemo";
import UploadDemo from "../src/components/UploadDemo";

Vue.use(Router);

export const router = new Router({
    routes:[
        {
            path:'/Login',
            name:'Login',
            component:Login,
        },
        {
            path:'/Register',
            name:'Register',
            component:Register
        },
        {
            path:'/',
            name:'HomePage',
            component:HomePage
        },
        {
            path:'/Graph',
            name:'Graph',
            component:Graph
        },
        {
            path:'/ItemResponses',
            name:'ItemResponses',
            component:ItemResponses
        },
        {
            path:'/Question',
            name:'Question',
            component:Question
        },
        {
            path:'/QuestionDetail',
            name:'QuestionDetail',
            component:QuestionDetail
        },
        {
            path:'/TableDemo',
            name:'TableDemo',
            component:TableDemo
        },
        {
            path:'/AnswerDemo',
            name:'AnswerDemo',
            component:AnswerDemo
        },
        {
            path:'/Demo',
            name:'Demo',
            component:Demo
        },
        {
            path:'/PersonalCenter',
            name:'PersonalCenter',
            component:PersonalCenter
        },
        {
            path:'/Test',
            name:'Test',
            component:Test
        },
        {
            path:'/TestResult',
            name:'TestResult',
            component:TestResult
        },
        {
            path:'/NeovisDemo',
            name:'NeovisDemo',
            component:NeovisDemo
        },
        {
            path:'/UploadDemo',
            name:'UploadDemo',
            component:UploadDemo
        },
    ]

});

