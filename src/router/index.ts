// Composables
import { createRouter, createWebHistory } from 'vue-router';
import HomeGeneral from '@/views/home/home_general.vue';
import Home_Site from '@/views/home/site/site_general.vue';
import Home_Site_Building from '@/views/home/site/building/building_general.vue';
import RegisterInfos from '@/views/RegisterInfos.vue';
import DigitalTwins from '@/views/digitaltwins/digitaltwins_general.vue';
import DigitalTwins_Site from '@/views/digitaltwins/site/site_general.vue';
import DigitalTwins_Site_Building from '@/views/digitaltwins/site/building/building_general.vue';
import DigitalTwins_Site_Building_Bacnet from '@/views/digitaltwins/site/building/building_bacnet.vue';
import DigitalTwins_Site_Building_Grundfunktion from '@/views/digitaltwins/site/building/GrundfunktionTga.vue';
import DemoView from '@/views/demo/DemoView.vue';
import Monitoring from '@/views/monitoring_v2/MonitoringDefault.vue';
import Monitoring_Site from '@/views/monitoring_v2/MonitoringSite.vue';
import Monitoring_Site_Building from '@/views/monitoring_v2/MonitoringBuilding.vue';
import Monitoring_Site_Building_Grundfunktion from '@/views/monitoring/site/building/monitoring_grundfunktion.vue';
import Monitoring_Site_Building_Grundfunktion_Anlage from '@/views/monitoring/site/building/monitoring_anlage.vue';

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
    path: '/:siteid',
    name: 'Home_Site',
    component: Home_Site,
    meta: {
      breadcrumb: (route: any) => [
        { title: 'Home', to: '/' },
        { title: `${route.params.siteid}`, to: `/${route.params.siteid}` },
      ],
    },
  },
  // Breadcrumb to do
  {
    path: '/:siteid/:buildingid',
    name: 'Home_Site_Building',
    component: Home_Site_Building,
    meta: {
      breadcrumb: (route: any) => [
        { title: '', to: '/' },
        { title: `${route.params.siteid}`, to: `/${route.params.siteid}` },
        {
          title: `${route.params.buildingid}`,
          to: `/${route.params.siteid}/${route.params.buildingid}`,
        },
      ],
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterInfos,
    meta: {
      breadcrumb: () => [{ title: '', to: '/register' }],
    },
  },

  {
    path: '/digitaltwins',
    name: 'DigitalTwins',
    component: DigitalTwins,
    meta: {
      breadcrumb: () => [{ title: 'Digital Twins', to: '/digitaltwins' }],
    },
  },
  {
    path: '/digitaltwins/:siteid',
    name: 'DigitalTwins_Site',
    component: DigitalTwins_Site,
    meta: {
      breadcrumb: (route: any) => [
        { title: 'Digital Twins', to: '/digitaltwins' },
        { title: `${route.params.siteid}`, to: `/digitaltwins/${route.params.siteid}` },
      ],
    },
  },
  // Verlinkung muss in der DigitalTwinOverview noch angepasst werden
  {
    path: '/digitaltwins/:siteid/:buildingid/:buildingaasid',
    name: 'DigitalTwins_Site_Building',
    component: DigitalTwins_Site_Building,
    meta: {
      breadcrumb: (route: any) => {
        const encodedBuildingaasid = encodeURIComponent(route.params.buildingaasid);
        return [
          { title: 'Digital Twins', to: '/digitaltwins' },
          { title: `${route.params.siteid}`, to: `/digitaltwins/${route.params.siteid}` },
          {
            title: `${route.params.buildingid}`,
            to: `/digitaltwins/${route.params.siteid}/${route.params.buildingid}/${encodedBuildingaasid}`,
          },
        ];
      },
    },
  },
  {
    path: '/digitaltwins/:siteid/:buildingid/:buildingaasid/:grundfunktion',
    name: 'DigitalTwins_Site_Building_Grundfunktion',
    component: DigitalTwins_Site_Building_Grundfunktion,
    meta: {
      breadcrumb: (route: any) => {
        const encodedBuildingaasid = encodeURIComponent(route.params.buildingaasid);
        return [
          { title: 'Digital Twins', to: '/digitaltwins' },
          { title: `${route.params.siteid}`, to: `/digitaltwins/${route.params.siteid}` },
          {
            title: `${route.params.buildingid}`,
            to: `/digitaltwins/${route.params.siteid}/${route.params.buildingid}/${encodedBuildingaasid}`,
          },
          {
            title: `${route.params.grundfunktion}`,
            to: `/digitaltwins/${route.params.siteid}/${route.params.buildingid}/${encodedBuildingaasid}/${route.params.grundfunktion}`,
          },
        ];
      },
    },
  },
  {
    path: '/digitaltwins/:siteid/:buildingid/:buildingaasid/bacnet',
    name: 'DigitalTwins_Site_Building_Bacnet',
    component: DigitalTwins_Site_Building_Bacnet,
    meta: {
      breadcrumb: (route: any) => {
        const encodedBuildingaasid = encodeURIComponent(route.params.buildingaasid);
        return [
          { title: 'Digital Twins', to: '/digitaltwins' },
          { title: `${route.params.siteid}`, to: `/digitaltwins/${route.params.siteid}` },
          {
            title: `${route.params.buildingid}`,
            to: `/digitaltwins/${route.params.siteid}/${route.params.buildingid}/${encodedBuildingaasid}`,
          },
          {
            title: 'BACnet',
            to: `/digitaltwins/${route.params.siteid}/${route.params.buildingid}/${encodedBuildingaasid}/bacnet`,
          },
        ];
      },
    },
  },

  {
    path: '/monitoring',
    name: 'Monitoring',
    component: Monitoring,
    meta: {
      breadcrumb: () => [{ title: 'Monitoring', to: '/monitoring' }],
    },
  },
  // add demo view for monitoring
  {
    path: '/demo',
    name: 'DemoView',
    component: DemoView,
    meta: {
      breadcrumb: () => [{ title: 'Demo', to: '/demo' }],
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
          to: `/monitoring/site/${route.params.siteparams}`,
        },
      ],
    },
  },
  {
    path: '/monitoring/building/:buildingparams',
    name: 'Monitoring_Site_Building',
    component: Monitoring_Site_Building,
    meta: {
      breadcrumb: (route: any) => {
        const params = JSON.parse(route.params.buildingparams);
        const siteParams = JSON.stringify({ siteid: params.siteid, siteName: params.siteName });
        return [
          { title: 'Monitoring', to: '/monitoring' },
          {
            title: params.siteName,
            to: `/monitoring/site/${siteParams}`,
          },
          {
            title: `${params.buildingName}`,
            to: `/monitoring/building/${route.params.buildingparams}`,
          },
        ];
      },
    },
  },
  {
    path: '/monitoring/:siteid/:buildingid/:buildingaasid/:grundfunktion',
    name: 'Monitoring_Site_Building_Grundfunktion',
    component: Monitoring_Site_Building_Grundfunktion,
    meta: {
      breadcrumb: (route: any) => {
        const encodedBuildingaasid = encodeURIComponent(route.params.buildingaasid);
        return [
          { title: 'Monitoring', to: '/monitoring' },
          { title: `${route.params.siteid}`, to: `/monitoring/${route.params.siteid}` },
          {
            title: `${route.params.buildingid}`,
            to: `/monitoring/${route.params.siteid}/${route.params.buildingid}/${encodedBuildingaasid}`,
          },
          {
            title: `${route.params.grundfunktion}`,
            to: `/monitoring/${route.params.siteid}/${route.params.buildingid}/${encodedBuildingaasid}/${route.params.grundfunktion}`,
          },
        ];
      },
    },
  },
  {
    path: '/monitoring/:siteid/:buildingid/:buildingaasid/:grundfunktion/:anlage',
    name: 'Monitoring_Site_Building_Grundfunktion_Anlage',
    component: Monitoring_Site_Building_Grundfunktion_Anlage,
    meta: {
      breadcrumb: (route: any) => {
        const encodedBuildingaasid = encodeURIComponent(route.params.buildingaasid);
        return [
          { title: 'Monitoring', to: '/monitoring' },
          { title: `${route.params.siteid}`, to: `/monitoring/${route.params.siteid}` },
          {
            title: `${route.params.buildingid}`,
            to: `/monitoring/${route.params.siteid}/${route.params.buildingid}/${encodedBuildingaasid}`,
          },
          {
            title: `${route.params.grundfunktion}`,
            to: `/monitoring/${route.params.siteid}/${route.params.buildingid}/${encodedBuildingaasid}/${route.params.grundfunktion}`,
          },
          {
            title: `${route.params.anlage}`,
            to: `/monitoring/${route.params.siteid}/${route.params.buildingid}/${encodedBuildingaasid}/${route.params.grundfunktion}/${route.params.anlage}`,
          },
        ];
      },
    },
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
