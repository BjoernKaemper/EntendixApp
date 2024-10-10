import { createRouter, createWebHistory } from 'vue-router';
import { useGeneralStore } from '@/store/general';
import HomeGeneral from '@/views/home/Home.vue';
import DemoView from '@/views/demo/DemoView.vue';

// monitoring views
import Monitoring_Site from '@/views/monitoring/MonitoringSite.vue';
import Monitoring_Site_Building from '@/views/monitoring/MonitoringBuilding.vue';
import Monitoring_Site_Building_Subsection from '@/views/monitoring/MonitoringSubsection.vue';
import Monitoring_Site_Building_Subsection_Plant from '@/views/monitoring/MonitoringPlant.vue';
// digital twins views
import DigitalTwins_Site from '@/views/digitaltwins/DigitalTwinsSite.vue';
import DigitalTwins_Site_Building from '@/views/digitaltwins/DigitalTwinBuilding.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeGeneral,
    meta: {
      breadcrumb: () => [{ title: 'Home', to: '/' }],
    },
    beforeEnter: () => {
      const generalStore = useGeneralStore();
      generalStore.loadBaseInformations();
    },
  },
  {
    path: '/digitaltwins/site/:siteparams',
    name: 'DigitalTwins_Site',
    component: DigitalTwins_Site,
    meta: {
      breadcrumb: (route: any) => [
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
    path: '/digitaltwins/building/:buildingparams',
    name: 'DigitalTwins_Site_Building',
    component: DigitalTwins_Site_Building,
    meta: {
      breadcrumb: (route: any) => {
        const params = JSON.parse(route.params.buildingparams);
        const siteParams = JSON.stringify({
          siteid: encodeURIComponent(params.siteid),
          siteName: params.siteName,
        });
        return [
          {
            title: params.siteName,
            to: `/digitaltwins/site/${siteParams}`,
          },
          {
            title: params.buildingName,
            to: `/digitaltwins/building/${encodeURIComponent(route.params.buildingparams)}`,
          },
        ];
      },
    },
    beforeEnter: (route: any) => {
      const generalStore = useGeneralStore();
      const params = JSON.parse(route.params.buildingparams as string);
      if (generalStore.siteState.site?.id !== params.siteid) {
        generalStore.loadSiteInformation(params.siteid);
      }
      generalStore.loadBuildingInformation(params.buildingid);
    },
  },

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
    path: '/monitoring/site/:siteparams',
    name: 'Monitoring_Site',
    component: Monitoring_Site,
    meta: {
      breadcrumb: (route: any) => [
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
      const params = JSON.parse(route.params.buildingparams as string);
      if (generalStore.siteState.site?.id !== params.siteid) {
        generalStore.loadSiteInformation(params.siteid);
      }
      generalStore.loadBuildingInformation(params.buildingid);
    },
  },
  {
    path: '/monitoring/subsection/:subsectionparams',
    name: 'Monitoring_Site_Building_Subsection',
    component: Monitoring_Site_Building_Subsection,
    meta: {
      breadcrumb: (route: any) => {
        const params = JSON.parse(route.params.subsectionparams);
        const siteParams = JSON.stringify({
          siteid: encodeURIComponent(params.siteid),
          siteName: params.siteName,
        });
        const buildingParams = JSON.stringify({
          siteid: encodeURIComponent(params.siteid),
          siteName: params.siteName,
          buildingid: encodeURIComponent(params.buildingid),
          buildingName: params.buildingName,
        });
        return [
          {
            title: params.siteName,
            to: `/monitoring/site/${siteParams}`,
          },
          {
            title: params.buildingName,
            to: `/monitoring/building/${buildingParams}`,
          },
          {
            title: params.subsectionName,
            to: `/monitoring/subsection/${encodeURIComponent(route.params.subsectionparams)}`,
          },
        ];
      },
    },
    beforeEnter: (route: any) => {
      const generalStore = useGeneralStore();
      const params = JSON.parse(route.params.subsectionparams as string);
      if (generalStore.siteState.site?.id !== params.siteid) {
        generalStore.loadSiteInformation(params.siteid);
      }
      if (generalStore.buildingState.building?.id !== params.buildingid) {
        generalStore.loadBuildingInformation(params.buildingid);
      }
      generalStore.loadSubsectionInformation(params.subsectionid);
    },
  },
  {
    path: '/monitoring/plant/:plantparams',
    name: 'Monitoring_Site_Building_Subsection_Plant',
    component: Monitoring_Site_Building_Subsection_Plant,
    meta: {
      breadcrumb: (route: any) => {
        const params = JSON.parse(route.params.plantparams);
        const siteParams = JSON.stringify({
          siteid: encodeURIComponent(params.siteid),
          siteName: params.siteName,
        });
        const buildingParams = JSON.stringify({
          siteid: encodeURIComponent(params.siteid),
          siteName: params.siteName,
          buildingid: encodeURIComponent(params.buildingid),
          buildingName: params.buildingName,
        });
        const subsectionParams = JSON.stringify({
          siteid: encodeURIComponent(params.siteid),
          siteName: params.siteName,
          buildingid: encodeURIComponent(params.buildingid),
          buildingName: params.buildingName,
          subsectionid: encodeURIComponent(params.subsectionid),
          subsectionName: params.subsectionName,
        });
        return [
          {
            title: params.siteName,
            to: `/monitoring/site/${siteParams}`,
          },
          {
            title: params.buildingName,
            to: `/monitoring/building/${buildingParams}`,
          },
          {
            title: params.subsectionName,
            to: `/monitoring/subsection/${subsectionParams}`,
          },
          {
            title: params.plantName,
            to: `/monitoring/subsection/${encodeURIComponent(route.params.plantparams)}`,
          },
        ];
      },
    },
    beforeEnter: (route: any) => {
      const generalStore = useGeneralStore();
      const params = JSON.parse(route.params.plantparams as string);
      if (generalStore.siteState.site?.id !== params.siteid) {
        generalStore.loadSiteInformation(params.siteid);
      }
      if (generalStore.buildingState.building?.id !== params.buildingid) {
        generalStore.loadBuildingInformation(params.buildingid);
      }
      if (generalStore.subsectionState.subsection?.id !== params.subsectionid) {
        generalStore.loadSubsectionInformation(params.subsectionid);
      }
      generalStore.loadPlantInformation(params.plantid);
    },
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
