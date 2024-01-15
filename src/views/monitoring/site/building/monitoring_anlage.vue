<template>
    <div>
        <v-container>
            <!--
            <h2 style="color: #3B5249;">Monitoring - Gebäude {{ $route.params.buildingid  }}</h2>
            <h3 style="color: #3B5249;">{{ $route.params.grundfunktion }} - {{ monitoringStore.aasAnlage.idShort }}</h3>-->
            <!--
            <v-img class="mx-auto" max-width="400" href="#" contain src="@/assets/heizkreis.svg">
            </v-img>

        --> 
            <WärmeSpeicherMonitoring v-if='monitoringStore.aasAnlage.komponentenAas[0].semanticId == "https://th-koeln.de/gart/ComponentTankAAS/1/0"' :anlage="monitoringStore.aasAnlage.komponentenAas"/>
            <FernwärmeMonitoring v-else-if='monitoringStore.aasAnlage.semanticId == "https://th-koeln.de/gart/PlantDistrictHeatingAAS/1/0"' :anlage="monitoringStore.aasAnlage.komponentenAas"/>
            <HeizkreisMonitoring v-else-if='monitoringStore.aasAnlage.semanticId == "https://th-koeln.de/gart/PlantDistributionCircuitAAS/1/0"' :anlage="monitoringStore.aasAnlage.komponentenAas"/>
            <ErzeugerMonitoring v-else-if='monitoringStore.aasAnlage.semanticId == "https://th-koeln.de/gart/PlantGeneratorAAS/1/0"' :anlage="monitoringStore.aasAnlage.komponentenAas"/>
            <RLTAnlageMonitoring v-else-if='monitoringStore.aasAnlage.semanticId == "https://th-koeln.de/gart/PlantVentilationSystemAAS/1/0"' :anlage="monitoringStore.aasAnlage.komponentenAas"/>
            <MedienBereitstellenMonitoring v-else-if='monitoringStore.aasAnlage.semanticId == "https://th-koeln.de/gart/PlantMediaSupplyAAS/1/0"' :anlage="monitoringStore.aasAnlage.komponentenAas"/>
            <MedienEntsorgenMonitoring v-else-if='monitoringStore.aasAnlage.semanticId == "https://th-koeln.de/gart/PlantMediaDisposeAAS/1/0"' :anlage="monitoringStore.aasAnlage.komponentenAas"/>
            <MedienSpeichernMonitoring v-else-if='monitoringStore.aasAnlage.semanticId == "https://th-koeln.de/gart/PlantMediaStoreAAS/1/0"' :anlage="monitoringStore.aasAnlage.komponentenAas"/>
            <MedienVerteilenMonitoring v-else-if='monitoringStore.aasAnlage.semanticId == "https://th-koeln.de/gart/PlantMediaDistributionAAS/1/0"' :anlage="monitoringStore.aasAnlage.komponentenAas"/>
            <LuftVerteilenMonitoring v-else-if='monitoringStore.aasAnlage.semanticId == "https://th-koeln.de/gart/PlantVentilationLineAAS/1/0"' :anlage="monitoringStore.aasAnlage.komponentenAas"/>
        </v-container>
    </div>
</template>

<script>
import { useMonitoringStore } from "@/store/monitoring"
import HeizkreisMonitoring from "@/components/monitoring/HeizkreisMonitoring.vue"
import RLTAnlageMonitoring from "@/components/monitoring/RLTAnlageMonitoring.vue"
import ErzeugerMonitoring from "@/components/monitoring/ErzeugerMonitoring.vue"
import MedienBereitstellenMonitoring from "@/components/monitoring/MedienBereitstellenMonitoring.vue"
import LuftVerteilenMonitoring from "@/components/monitoring/LuftVerteilenMonitoring.vue"
import WärmeSpeicherMonitoring from "@/components/monitoring/WärmeSpeicherMonitoring.vue"
import FernwärmeMonitoring from "@/components/monitoring/FernwärmeMonitoring.vue"
import MedienEntsorgenMonitoring from "@/components/monitoring/MedienEntsorgenMonitoring.vue"
import MedienSpeichernMonitoring from "@/components/monitoring/MedienSpeichernMonitoring.vue"
import MedienVerteilenMonitoring from "@/components/monitoring/MedienVerteilenMonitoring.vue"

export default {
    components: {
    HeizkreisMonitoring, RLTAnlageMonitoring, ErzeugerMonitoring, MedienBereitstellenMonitoring,
    LuftVerteilenMonitoring, WärmeSpeicherMonitoring, FernwärmeMonitoring, MedienEntsorgenMonitoring,
    MedienSpeichernMonitoring, MedienVerteilenMonitoring
},
    computed: {
        monitoringStore () {
            return useMonitoringStore()
        },
        anlage () {
            console.log(this.monitoringStore.aasAnlage)
            return this.monitoringStore.aasAnlage
        }
    },
}
</script>