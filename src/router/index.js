import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  } else {
    const position = {}
    if (to.hash) {
      position.selector = to.hash
    }
    if (to.matched.some(m => m.meta.scrollToTop)) {
      // cords will be used if no selector is provided,
      // or if the selector didn't match any element.
      position.x = 0
      position.y = 0
    }
    return position
  }
}



export default new Router({
  mode: 'history',
  // base: __dirname,
  scrollBehavior,

  routes: [
    // { path: '/', redirect: '/index' },
    {
      path: '/',
      name: 'index',
      component:resolve => require(['@/pages/index'], resolve),
      meta: {
          scrollToTop: true,
          title: '【非幕制片】剧组制片云管理平台、一键生成统筹表通告单',
          index: 0,
        keywords:'制片统筹,电子通告单,电影统筹表,制片软件,影视统筹,统筹表格,剧组通告单,拍摄计划,服化道管理'
      },
    },

      //首页同级介绍页
      {
          path: '/activity',
          name: 'activity',
          component: resolve => require(['@/pages/index/activity'], resolve),
          meta: {
              scrollToTop: true,
              title: '【制片表格】统筹表，预算表，通告单模板快速领取，助您高效制片'
          },
      },
      {
          path: '/recharge',
          name: 'recharge',
          component: resolve => require(['@/pages/index/recharge'], resolve),
          meta: {
              scrollToTop: true,
              title: '【制片软件价格】剧组制片云管理平台、一键生成统筹表通告单'
          },
      },
      {
          path: '/service',
          name: 'service',
          component: resolve => require(['@/pages/index/serviceIndex'], resolve),
          meta: {
              scrollToTop: true,
              title: '【安全】影视企业私有化部署服务'
          },
      },
      {
          path: '/toolIntroduce',
          name: 'toolIntroduce',
          component: resolve => require(['@/pages/index/toolIntroduce'], resolve),
          meta: {
              scrollToTop: true,
              title: '【安全】影视企业私有化部署服务'
          },
      },
      {
          path: '/financeIntroduce',
          name: 'financeIntroduce',
          component: resolve => require(['@/pages/index/financeIntroduce'], resolve),
          meta: {
              scrollToTop: true,
              title: '【影视财务】如何快速制作电影预算表',
              keywords:'标准化影视财务范本，快速制作影视预算表，与电影电视剧项目支出同步对比，并提供财务报表，实时查看项目财务信息，帮助投资方，制片人了解项目支出与进度。'
          },
      },
      {
          path: '/noticeIntroduce',
          name: 'noticeIntroduce',
          component: resolve => require(['@/pages/index/noticeIntroduce'], resolve),
          meta: {
              scrollToTop: true,
              title: '【通告单】如何快速制作通告单',
              keywords:'标准化影视通告单模板（call sheet），适合于电影，电视剧项目使用，详细记录每日拍摄任务，可以导出PDF版纸质通告单，可将电子通告单发布至微信小程序进行查看。'
          },
      },
      {
          path: '/downLoad',
          name: 'downLoad',
          component: resolve => require(['@/pages/downLoad/downLoad'], resolve),
          meta: {
              scrollToTop: true,
          },
      },
      {
          path: '/downLoad/buy',
          name: 'buy',
          component: resolve => require(['@/pages/downLoad/buy'], resolve),
          meta: {
              scrollToTop: true,
          },
      },
      {
          path: '/downLoad/done',
          name: 'done',
          component: resolve => require(['@/pages/downLoad/done'], resolve),
          meta: {
              scrollToTop: true,
          },
      },


    {
      path: '/lead',
      name: 'lead',
      component: resolve => require(['@/pages/lead/lead'], resolve),
      redirect:'/lead/newBuild',
      meta: {
          title: '非幕制片-新手引导',
          description:'什么是非幕制片？非幕制片新手引导为新用户提供了解服务，从而快速上传剧本、一键生成影视统筹表、制定拍摄计划等,实现剧组高效统筹。',
        keywords:'制片统筹,电子通告单,电影统筹表,制片软件,影视统筹,统筹表格,剧组通告单,拍摄计划,服化道管理'
      },
      children:[
          {
              path: '/lead/newBuild',
              component: resolve => require(['@/pages/lead/leadBuild'], resolve)
          },
          {
              path: '/lead/tagging',
              component: resolve => require(['@/pages/lead/leadTagging'], resolve)
          },
          {
              path: '/lead/performer',
              component: resolve => require(['@/pages/lead/leadPerformer'], resolve)
          },
          {
              path: '/lead/table',
              component: resolve => require(['@/pages/lead/leadTable'], resolve)
          },
          {
              path: '/lead/group',
              component: resolve => require(['@/pages/lead/leadGroup'], resolve)
          },
          {
              path: '/lead/announcement',
              component: resolve => require(['@/pages/lead/leadAnnouncement'], resolve)
          },
      ]
    },
      {
          path: '/about',
          name: 'about',
          component: resolve => require(['@/pages/about/about'], resolve),
          redirect:'/know',
          meta: {
              title: '非幕制片-新手引导',
              description:'什么是非幕制片？非幕制片新手引导为新用户提供了解服务，从而快速上传剧本、一键生成影视统筹表、制定拍摄计划等,实现剧组高效统筹。',
            keywords:'制片统筹,电子通告单,电影统筹表,制片软件,影视统筹,统筹表格,剧组通告单,拍摄计划,服化道管理'
          },
          children:[
              {
                  path: '/know',
                  name: 'know',
                  component: resolve => require(['@/pages/about/know'], resolve),
                  meta: {
                      scrollToTop: true,
                      title: '非幕制片-了解和使用',
                    keywords:'制片统筹,电子通告单,电影统筹表,制片软件,影视统筹,统筹表格,剧组通告单,拍摄计划,服化道管理',
                      description:'内容包括总场景表和分场景表的概念、如何调整场景表、如何制定拍摄计划、影视剧的关键安排要素'
                  }
              },
              {
                  path: '/agreement',
                  name: 'agreement',
                  component: resolve => require(['@/pages/about/agreement'], resolve),
                  meta: {
                      scrollToTop: true,
                      title: '非幕制片-用户协议'
                  }
              },
              {
                  path: '/contact',
                  name: 'contact',
                  component: resolve => require(['@/pages/about/contact'], resolve),
                  meta: {
                      scrollToTop: true,
                      title: '非幕制片-联系我们',
                    keywords:'制片统筹,电子通告单,电影统筹表,制片软件,影视统筹,统筹表格,剧组通告单,拍摄计划,服化道管理',
                      description:'非幕制片接受多方面的合作与咨询,包括电影剧组合作、电视剧剧组合作、拍摄场地合作、统筹软件售后服务、投诉建议等。'
                  }
              },
              {
                  path: '/feedback',
                  name: 'feedback',
                  meta: {
                      scrollToTop: true,
                      title: '非幕制片-用户反馈',
                    keywords:'制片统筹,电子通告单,电影统筹表,制片软件,影视统筹,统筹表格,剧组通告单,拍摄计划,服化道管理',
                      description:'非幕致力服务于每一位制片统筹。非幕制片问题反馈系统为用户提供反馈平台,包括影视统筹表建议,拍摄通告单建议等。'
                  },
                  component: resolve => require(['@/pages/about/feedback'], resolve)
              },
              {
                  path: '/privacyProtocol',
                  name: 'privacyProtocol',
                  meta: {
                      scrollToTop: true,
                      title: '非幕制片-隐私协议',
                    keywords:'制片统筹,电子通告单,电影统筹表,制片软件,影视统筹,统筹表格,剧组通告单,拍摄计划,服化道管理',
                      description:'非幕致力服务于每一位制片统筹。非幕制片问题反馈系统为用户提供反馈平台,包括影视统筹表建议,拍摄通告单建议等。'
                  },
                  component: resolve => require(['@/pages/about/privacyProtocol'], resolve)
              },
          ]
      },
    {
      path: '/control',
      name: 'control',
      component: resolve => require(['@/pages/control'], resolve),
      redirect:'/control/list',
      meta: {
        scrollToTop: true,
        title: '【非幕制片】剧组制片云管理平台、一键生成统筹表通告单'
      },
      children: [
        {
          path: '/control/list',
          component: resolve => require(['@/pages/control/list'], resolve),
          meta: {
              title: '【非幕制片】剧组制片云管理平台、一键生成统筹表通告单',
              index: 6
          },
        },
        { path: '/control/newbuildKind',
          component: resolve => require(['@/pages/control/newbuildKind'], resolve),
          meta: {
            title: '【非幕制片】剧组制片云管理平台、一键生成统筹表通告单',
            index: 7
          },
        },
        {
          path: '/control/newbuild',
          component: resolve => require(['@/pages/control/newbuild'], resolve),
          meta: {
              title: '【非幕制片】剧组制片云管理平台、一键生成统筹表通告单',
              index: 8
          },
        },
        {
          path: '/control/newbuild2',
          component: resolve => require(['@/pages/control/newbuild2'], resolve),
          meta: {
              title: '【非幕制片】剧组制片云管理平台、一键生成统筹表通告单',
              index: 8
          },
        },
        {
          path: '/control/reward',
          name: 'reward',
          component: resolve => require(['@/pages/index/reward'], resolve),
          meta: {
              scrollToTop: true,
              title: '【通告单】剧组通告单一键生成，手机通告单实时沟通'
          },
        },
        {
          path: '/control/inviteRules',//活动规则
          name: 'inviteRules',
          component: resolve => require(['@/pages/index/inviteRules'], resolve),
          meta: {
              scrollToTop: true,
              title: '【通告单】剧组通告单一键生成，手机通告单实时沟通'
          },
        },
          {
              path: '/control/tipsFormat',//剧本格式
              name: 'tipsFormat',
              component: resolve => require(['@/pages/index/tipsFormat'], resolve),
              meta: {
                  scrollToTop: true,
                  title: '【通告单】剧组通告单一键生成，手机通告单实时沟通'
              },
          },
          {
              path: '/control/tipsChoice',//如何选择格式
              name: 'tipsChoice',
              component: resolve => require(['@/pages/index/tipsChoice'], resolve),
              meta: {
                  scrollToTop: true,
                  title: '【通告单】剧组通告单一键生成，手机通告单实时沟通'
              },
          },
      ]
    },


    {
      path: '/mine',
      name: 'mine',
      component: resolve => require(['@/pages/mine'], resolve),
      meta: {
        title: '【非幕制片】剧组制片云管理平台、一键生成统筹表通告单'
      },
      children: [
        { path: '/mine/setting',
          component: resolve => require(['@/pages/mine/setting'], resolve),
          meta: {
            title: '【非幕制片】剧组制片云管理平台、一键生成统筹表通告单'
          },
        },
        {
          path: '/mine/pwd',
          component: resolve => require(['@/pages/mine/pwd'], resolve),
          meta: {
            title: '【非幕制片】剧组制片云管理平台、一键生成统筹表通告单'
          },
        },
        {
          path: '/news',
          name: 'news',
          meta: {
            title: '【非幕制片】剧组制片云管理平台、一键生成统筹表通告单'
          },
          component: resolve => require(['@/pages/mine/news'], resolve)
        },
        {
          path: '/tradingCenter',
          name: 'tradingCenter',
          meta: {
            title: '【非幕制片】剧组制片云管理平台、一键生成统筹表通告单'
          },
          component: resolve => require(['@/pages/mine/tradingCenter'], resolve)
        },
        {
          path: '/mine/invoice',
          name: 'invoice',
          meta: {
            title: '【非幕制片】剧组制片云管理平台、一键生成统筹表通告单'
          },
          component: resolve => require(['@/pages/mine/invoice'], resolve)
        },
        {
          path: '/mine/coupon',
          name: 'coupon',
          meta: {
              scrollToTop: true,
              title: '【非幕制片】剧组制片云管理平台、一键生成统筹表通告单'
          },
          component: resolve => require(['@/pages/mine/coupon'], resolve)
        },
      ]
    },
    {
      path: '/details',
      name: 'detail',
      component: resolve => require(['@/pages/control/details'], resolve),
      redirect:'/details/scene',
      meta: {
          scrollToTop: true,
          title: '【非幕制片】剧组制片云管理平台、一键生成统筹表通告单',
          index: 9
      },
      children: [
            {
              path: '/details/scene',
              component: resolve => require(['@/pages/control/scene'], resolve),
              meta: {index: 10},
            },
            {
              path: '/details/s_scene',
              component: resolve => require(['@/pages/control/s_scene'], resolve),
            },

            {
              path: '/details/count',
              component: resolve => require(['@/pages/control/count'], resolve),
            },

            {
              path: '/preview',
              name: 'preview',
              component: resolve => require(['@/pages/control/preview'], resolve)
            },
            {
              path: '/details/performer',
              name: 'performer',
              component: resolve => require(['@/pages/control/performer'], resolve)
            },
            {
              path: '/details/group',
              name: 'group',
              component: resolve => require(['@/pages/control/group'], resolve)
            },
            {
              path: '/details/budget',//预算
              name: 'budget',
              redirect:'/details/budget/general',
              component: resolve => require(['@/pages/budget/budget'], resolve),
              children:[
                {
                    path: '/details/budget/general',
                    component: resolve => require(['@/pages/budget/general'], resolve)//总预算
                },
                {
                    path: '/details/budget/num',
                    component: resolve => require(['@/pages/budget/other'], resolve)//其他（按数量）
                },
                  {
                      path: '/details/budget/scale',
                      component: resolve => require(['@/pages/budget/scale'], resolve)//其他（按比例）
                  }
              ]
            },
            {
              path: '/details/income',//收入
              name: 'income',
              component: resolve => require(['@/pages/control/income'], resolve)
            },
            {
              path: '/details/reportForm',//报表
              name: 'reportForm',
              component: resolve => require(['@/pages/control/reportForm'], resolve)
            },
            {
              path: '/details/announcement',
              name: 'announcement',
              component: resolve => require(['@/pages/announcement/announcement'], resolve)
            },//通告单首页
            // {
            //   path: '/details/announcement',
            //   name: 'announcement',
            //   component: resolve => require(['@/pages/control/announcement'], resolve)
            // },//通告单首页
            {
              path: '/details/noticeForm',
              name: 'noticeForm',
              component: resolve => require(['@/pages/announcement/frame'], resolve)
            },//通告单首页
            {
                path: '/details/location',//拍摄地管理
                name: 'location',
                redirect:'/details/location/info',
                component: resolve => require(['@/pages/location/location'], resolve),
                children:[
                    {
                        path: '/details/location/info',
                        component: resolve => require(['@/pages/location/info'], resolve)//拍摄地信息
                    },
                    {
                        path: '/details/location/survey',
                        component: resolve => require(['@/pages/location/survey'], resolve)//堪景信息
                    },
                    {
                        path: '/details/location/photo',
                        component: resolve => require(['@/pages/location/photo'], resolve)//现场照片
                    }
                ]
            },
            {
              path: '/details/art',//美术管理
              name: 'art',
              component: resolve => require(['@/pages/control/art'], resolve)
            },
            {
              path: '/details/tools',//道具管理
              name: 'tools',
              component: resolve => require(['@/pages/control/tools'], resolve)
            },
            {
              path: '/details/clothing',//服化管理
              name: 'clothing',
              redirect:'/details/clothing/info',
              component: resolve => require(['@/pages/clothing/clothing'], resolve),
              children:[
                {
                  path: '/details/clothing/info',
                  component: resolve => require(['@/pages/clothing/info'], resolve)//服化管理演员信息
                },
                {
                  path: '/details/clothing/makeup',
                  component: resolve => require(['@/pages/clothing/makeup'], resolve)//化妆信息
                },
                {
                  path: '/details/clothing/dress',
                  component: resolve => require(['@/pages/clothing/dress'], resolve)//服装信息
                }
              ]
            },
      ]
    },
    {
        path: '/find',
        name: 'newfind',
        component: resolve => require(['@/pages/find/newfind'], resolve),
        redirect:'/find/find',
        meta: {
            title: '【非幕制片】剧组制片云管理平台、一键生成统筹表通告单'
        },
        children: [
            {
              path: '/find/find',
              component: resolve => require(['@/pages/find/find'], resolve),
              meta: {
                  title: '【非幕制片】剧组制片云管理平台、一键生成统筹表通告单'
              },
            },
            {
              path: '/newfind/phone',
              component: resolve => require(['@/pages/find/phoneFind'], resolve),
              meta: {
                  title: '【非幕制片】剧组制片云管理平台、一键生成统筹表通告单'
              },
            },
            {
              path: '/newfind/email1',
              component: resolve => require(['@/pages/find/emailFind1'], resolve),
              meta: {
                  title: '【非幕制片】剧组制片云管理平台、一键生成统筹表通告单'
              },
            }
        ]
    },
    {
      path: '/register',
      name: 'register',
      component: resolve => require(['@/pages/register/register'], resolve),
      meta: {
          title: '【非幕制片】剧组制片云管理平台、一键生成统筹表通告单'
      },
      children: [
        {
          path: '/login',
          component: resolve => require(['@/pages/register/login'], resolve),
          meta: {
            title: '【非幕制片】剧组制片云管理平台、一键生成统筹表通告单'
          },
        },
        // {
        //   path: '/register/email_1',
        //   name:'email_1',
        //   component: resolve => require(['@/pages/register/email_1'], resolve),
        //   meta: {
        //       title: '【非幕制片】剧组制片云管理平台、一键生成统筹表通告单'
        //   },
        // },
        {
          path: '/register/email_2',
          component: resolve => require(['@/pages/register/email_2'], resolve),
          meta: {
              title: '【非幕制片】剧组制片云管理平台、一键生成统筹表通告单'
          },
        },
        {
          path: '/register/phone_1',
          component: resolve => require(['@/pages/register/phone_1'], resolve),
          meta: {
              title: '【非幕制片】剧组制片云管理平台、一键生成统筹表通告单'
          },
        }
      ]
    },
    // {
    //   path: '/find',
    //   name: 'find',
    //   component: resolve => require(['@/pages/find'], resolve)
    // },

    // {
    //   path: '/preview',
    //   name: 'preview',
    //   meta: {
    //       title: '【非幕制片】剧组制片云管理平台、一键生成统筹表通告单'
    //   },
    //   component: resolve => require(['@/pages/control/preview'], resolve)
    // },
      {
          path: '/loading',
          name: 'loading',
          component: resolve => require(['@/pages/loading'], resolve)
      },
      {
          path: '/complete',
          name: 'complete',
          component: resolve => require(['@/pages/complete'], resolve),
          meta:{index:3},
      },
      {
          path: '/enterpriseApply',
          name: 'enterpriseApply',
          meta: {
              scrollToTop: true
          },
          component: resolve => require(['@/pages/enterprise'], resolve)
      },
      // {
      //     path: '/test',
      //     name: 'test',
      //     component: resolve => require(['@/pages/test'], resolve)
      // },

  ]

})

