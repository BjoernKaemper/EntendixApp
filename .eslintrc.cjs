/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: ['plugin:vue/vue3-essential', '@vue/eslint-config-airbnb-with-typescript'],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-useless-constructor': 'off',
    'import/prefer-default-export': 'off',
    'max-classes-per-file': 'off',
    'no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/camelcase': 'off',
    'prefer-destructuring': ['error', { object: true, array: false }],
    camelcase: 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'no-use-before-define': 'off',
    curly: ['error', 'all'],
    'brace-style': ['error', '1tbs', { allowSingleLine: false }],
    '@typescript-eslint/no-duplicate-enum-values': 'off',
  },
  ignorePatterns: [
    // Components
    'src/components/digitalTwin',
    'src/components/Nlp',
    'src/components/general/charts',
    // components/general -> Singlet ignores
    'src/components/general/AddBuilding.vue',
    'src/components/general/AddOrgaInformation.vue',
    'src/components/general/AddSites.vue',
    'src/components/general/AmCharts.vue',
    'src/components/general/BigNumber.vue',
    'src/components/general/BuildingItems.vue',
    'src/components/general/EditOrganizationInformation.vue',
    'src/components/general/GeneralFooter.vue',
    'src/components/general/GoogleMapsCard.vue',
    'src/components/general/GoogleMapsCardHome.vue',
    'src/components/general/GoogleMapsCardHomeSite.vue',
    'src/components/general/HomeCard.vue',
    'src/components/general/HomeCardSite.vue',
    'src/components/general/InformationFromBuildings.vue',
    'src/components/general/InformationFromSites.vue',
    'src/components/general/NavigationDrawer.vue',
    'src/components/general/ShowBuildingInformation.vue',
    'src/components/general/ShowOrgaInformation.vue',
    'src/components/general/ShowSiteInformation.vue',
    'src/components/general/SiteBuildings.vue',
    'src/components/general/TrafficLightIndicator.vue',
    // components/monitoring -> Singlet ignores
    'src/components/monitoring/AnlagenMonitoringCard.vue',
    'src/components/monitoring/ErzeugerMonitoring.vue',
    'src/components/monitoring/FernwärmeMonitoring.vue',
    'src/components/monitoring/HeizkreisMonitoring.vue',
    'src/components/monitoring/KPIsSite.vue',
    'src/components/monitoring/KälteErzeugenMonitoring.vue',
    'src/components/monitoring/KälteSpeichernMonitoring.vue',
    'src/components/monitoring/KälteVerteilenMonitoring.vue',
    'src/components/monitoring/KpisMonitoringAnlage.vue',
    'src/components/monitoring/LineChartAll.vue',
    'src/components/monitoring/LuftVerteilenMonitoring.vue',
    'src/components/monitoring/MedienBereitstellenMonitoring.vue',
    'src/components/monitoring/MedienEntsorgenMonitoring.vue',
    'src/components/monitoring/MedienSpeichernMonitoring.vue',
    'src/components/monitoring/MedienVerteilenMonitoring.vue',
    'src/components/monitoring/MonitoringOverview.vue',
    'src/components/monitoring/MonitoringSiteInformation.vue',
    'src/components/monitoring/RLTAnlageMonitoring.vue',
    'src/components/monitoring/ShowChart.vue',
    'src/components/monitoring/SichernMonitoring.vue',
    'src/components/monitoring/WärmeSpeicherMonitoring.vue',
    // Plugins
    'src/plugins/vuetify.ts',
    'src/plugins/webfontloader.ts',
    // Store
    'src/store/digitaltwins.ts',
    'src/store/general.ts',
    'src/store/monitoring.ts',
    // Views
    'src/views/digitaltwins',
    'src/views/monitoring',
  ],
};
