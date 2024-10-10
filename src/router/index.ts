import { createRouter, createWebHistory } from 'vue-router';
import HomeGeneral from '@/views/home/home_general.vue';
import DemoView from '@/views/demo/DemoView.vue';

// monitoring views
import Monitoring from '@/views/monitoring/MonitoringDefault.vue';
import Monitoring_Site from '@/views/monitoring/MonitoringSite.vue';
import Monitoring_Site_Building from '@/views/monitoring/MonitoringBuilding.vue';
import Monitoring_Site_Building_Subsection from '@/views/monitoring/MonitoringSubsection.vue';

// digital twins views
import DigitalTwinsSite from '@/views/digitaltwins/DigitalTwinsSite.vue';
import { useGeneralStore } from '@/store/general';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeGeneral,
    meta: {
      breadcrumb: () => [{ title: 'Home', to: '/' }],
    },
  },
  {
    path: '/digitaltwins/site/:siteparams',
    name: 'DigitalTwins',
    component: DigitalTwinsSite,
    meta: {
      breadcrumb: (route: any) => [
        { title: 'Digitaler Zwillinge', to: '/digitaltwins' },
        {
          title: `${JSON.parse(route.params.siteparams).siteName}`,
          to: `/monitoring/site/${encodeURIComponent(route.params.siteparams)}`,
        },
      ],
    },
    beforeEnter: (route: any) => {
      const generalStore = useGeneralStore();
      generalStore.loadSiteInformation(JSON.parse(route.params.siteparams as string).siteid);
    },

  },
  // {
  //   path: '/digitaltwins/site/:siteparams',
  //   name: 'DigitalTwins_Site',
  //   component: DigitalTwins_Site, // TODO: Doesn't exist right now
  //   meta: {
  //     breadcrumb: (route: any) => [
  //       { title: 'Digital Twins', to: '/digitaltwins' },
  //       {
  //         title: `${JSON.parse(route.params.siteparams).siteName}`,
  //         to: `/digitaltwins/site/${encodeURIComponent(route.params.siteparams)}`,
  //       },
  //     ],
  //   },
  // },
  // {
  //   path: '/digitaltwins/building/:buildingparams',
  //   name: 'DigitalTwins_Site_Building',
  //   component: DigitalTwins_Site_Building, // TODO: Doesn't exist right now
  //   meta: {
  //     breadcrumb: (route: any) => {
  //       const params = JSON.parse(route.params.buildingparams);
  //       const siteParams = JSON.stringify({
  //         siteid: encodeURIComponent(params.siteid),
  //         siteName: params.siteName,
  //       });
  //       return [
  //         { title: 'Digital Twins', to: '/digitaltwins' },
  //         {
  //           title: params.siteName,
  //           to: `/digitaltwins/site/${siteParams}`,
  //         },
  //         {
  //           title: `${params.buildingName}`,
  //           to: `/digitaltwins/building/${encodeURIComponent(route.params.buildingparams)}`,
  //         },
  //       ];
  //     },
  //   },
  // },

  // TODO: Remove when DemoView is not needed anymore
  {
    path: '/demo',
    name: 'DemoView',
    component: DemoView,
    meta: {
      breadcrumb: () => [{ title: 'Demo', to: '/demo' }],
    },
  },
  {
    path: '/monitoring',
    name: 'Monitoring',
    component: Monitoring,
    meta: {
      breadcrumb: () => [{ title: 'Monitoring', to: '/monitoring' }],
    },
    beforeEnter: () => {
      const generalStore = useGeneralStore();
      generalStore.loadBaseInformations();
    },
  },
  {
    path: '/monitoring/site/:siteparams',
    name: 'Monitoring_Site',
    component: Monitoring_Site,
    meta: {
      breadcrumb: (route: any) => [
        { title: 'Monitoring', to: '/monitoring' },
        {
          title: `${JSON.parse(route.params.siteparams).siteName}`,
          to: `/monitoring/site/${encodeURIComponent(route.params.siteparams)}`,
        },
      ],
    },
    beforeEnter: (route: any) => {
      const generalStore = useGeneralStore();
      generalStore.loadSiteInformation(JSON.parse(route.params.siteparams as string).siteid);
    },
  },
  {
    path: '/monitoring/building/:buildingparams',
    name: 'Monitoring_Site_Building',
    component: Monitoring_Site_Building,
    meta: {
      breadcrumb: (route: any) => {
        const params = JSON.parse(route.params.buildingparams);
        const siteParams = JSON.stringify({
          siteid: encodeURIComponent(params.siteid),
          siteName: params.siteName,
        });
        return [
          { title: 'Monitoring', to: '/monitoring' },
          {
            title: params.siteName,
            to: `/monitoring/site/${siteParams}`,
          },
          {
            title: `${params.buildingName}`,
            to: `/monitoring/building/${encodeURIComponent(route.params.buildingparams)}`,
          },
        ];
      },
    },
    beforeEnter: (route: any) => {
      const generalStore = useGeneralStore();
      generalStore.loadBuildingInformation(
        JSON.parse(route.params.buildingparams as string).buildingid,
      );
    },
  },
  {
    path: '/monitoring/building/subsection/demo',
    name: 'Monitoring_Site_Building_Subsection_Demo',
    component: Monitoring_Site_Building_Subsection,
    meta: {
      // @TODO add dynamic breadcrumb when data is available
      breadcrumb: () => [
        { title: 'Monitoring', to: '/monitoring' },
        { title: 'Building Demo', to: '/monitoring/building/subsection/demo' },
      ],
    },
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
