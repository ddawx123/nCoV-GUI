const routers = [
    {
        path: '/',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    },
    {
        path: '/screen',
        meta: {
            title: '2019新型冠状病毒实况监控表'
        },
        component: (resolve) => require(['./views/screen.vue'], resolve)
    },
    {
        path: '/event',
        meta: {
            title: '2019-nCoV事件跟踪'
        },
        component: (resolve) => require(['./views/event.vue'], resolve)
    },
    {
        path: '/cctv-live-video',
        meta: {
            title: '武汉此时此刻'
        },
        component: (resolve) => require(['./views/video-live.vue'], resolve)
    },
    {
        path: '/tg-channel',
        meta: {
            title: 'TG电报实时信息——nCoV2019'
        },
        component: (resolve) => require(['./views/telegram.vue'], resolve)
    },
    {
        path: '*',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/404.vue'], resolve)
    }
];
export default routers;
