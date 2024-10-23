import { createRouter, createWebHistory } from 'vue-router';

import Base64Helper from '@/helpers/Base64Helper';

// Stores
import { useGeneralStore } from '@/store/general';
import { useBuildingStore } from '@/store/building';
import { useSiteStore } from '@/store/site';
import { useSubsectionStore } from '@/store/subsection';
import { usePlantStore } from '@/store/plant';
// Views
import HomeGeneral from '@/views/home/HomeView.vue';
import DemoView from '@/views/demo/DemoView.vue';
import Monitoring_Site from '@/views/monitoring/MonitoringSite.vue';
import Monitoring_Site_Building from '@/views/monitoring/MonitoringBuilding.vue';
import Monitoring_Site_Building_Subsection from '@/views/monitoring/MonitoringSubsection.vue';
import Monitoring_Site_Building_Subsection_Plant from '@/views/monitoring/MonitoringPlant.vue';
import DigitalTwinsSite from '@/views/digitaltwins/DigitalTwinsSite.vue';

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
    path: '/digitaltwins',
    name: 'DigitalTwins',
    component: DigitalTwinsSite, // TODO: Doesn't exist right now
    meta: {
      breadcrumb: () => [
        { title: 'TH Köln, Campus Deutz', to: '/digitaltwins/campus-deutz' },
        { title: 'IWZ', to: '/digitaltwins/campus-deutz' },
      ],
    },
  },
  // {
  //   path: '/digitaltwins/site/:siteparams',
  //   name: 'DigitalTwins_Site',
  //   component: DigitalTwins_Site, // TODO: Doesn't exist right now
  //   meta: {
  //     breadcrumb: (route: any) => [
  //       {
  //         title: `${JSON.parse(route.params.siteparams).siteName}`,
  //         to: `/digitaltwins/site/${Base64Helper.encode(route.params.siteparams)}`,
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
  //         siteid: Base64Helper.encode(params.siteid),
  //         siteName: params.siteName,
  //       });
  //       return [
  //         {
  //           title: params.siteName,
  //           to: `/digitaltwins/site/${siteParams}`,
  //         },
  //         {
  //           title: `${params.buildingName}`,
  //           to: `/digitaltwins/building/${Base64Helper.encode(route.params.buildingparams)}`,
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
    path: '/monitoring/site/:siteparams',
    name: 'Monitoring_Site',
    component: Monitoring_Site,
    meta: {
      breadcrumb: (route: any) => [
        {
          title: `${JSON.parse(route.params.siteparams).siteName}`,
          to: `/monitoring/site/${route.params.siteparams}`,
        },
      ],
    },
    beforeEnter: (route: any) => {
      const siteStore = useSiteStore();
      const siteId = Base64Helper.decode(JSON.parse(route.params.siteparams as string).siteid);
      if (siteStore.site?.id !== siteId) {
        siteStore.loadSiteInformation(siteId);
      }
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
          siteid: params.siteid,
          siteName: params.siteName,
        });
        return [
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
    beforeEnter: async (route: any) => {
      const buildingStore = useBuildingStore();
      const buildingid = Base64Helper
        .decode(JSON.parse(route.params.buildingparams as string).buildingid);
      if (buildingStore.building?.id !== buildingid) {
        buildingStore.loadBuildingInformation(buildingid);
      }
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
          siteid: params.siteid,
          siteName: params.siteName,
        });
        const buildingParams = JSON.stringify({
          siteid: params.siteid,
          siteName: params.siteName,
          buildingid: params.buildingid,
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
            to: `/monitoring/subsection/${route.params.subsectionparams}`,
          },
        ];
      },
    },
    beforeEnter: async (route: any) => {
      const subsectionStore = useSubsectionStore();
      const subsectionid = Base64Helper
        .decode(JSON.parse(route.params.subsectionparams as string).subsectionid);
      if (subsectionStore.subsection?.id !== subsectionid) {
        subsectionStore.loadSubsectionInformation(subsectionid);
      }
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
          siteid: params.siteid,
          siteName: params.siteName,
        });
        const buildingParams = JSON.stringify({
          siteid: params.siteid,
          siteName: params.siteName,
          buildingid: params.buildingid,
          buildingName: params.buildingName,
        });
        const subsectionParams = JSON.stringify({
          siteid: params.siteid,
          siteName: params.siteName,
          buildingid: params.buildingid,
          buildingName: params.buildingName,
          subsectionid: params.subsectionid,
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
            to: `/monitoring/plant/${route.params.plantparams}`,
          },
        ];
      },
    },
    beforeEnter: (route: any) => {
      const plantStore = usePlantStore();
      const plantId = Base64Helper.decode(JSON.parse(route.params.plantparams as string).plantid);
      if (plantStore.plant?.id !== plantId) {
        plantStore.loadPlantInformation(plantId);
      }
    },
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
