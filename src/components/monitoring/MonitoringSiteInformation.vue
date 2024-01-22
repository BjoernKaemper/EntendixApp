<template>
    <div>
        <v-card 
            style="border-radius: 20px; background-color: whitesmoke"
            variant="outlined" class="anlagen-card">
            <v-card-title>Liegenschaft - Performance</v-card-title>
            <v-card-text>
                <KPIsSite />
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import KPIsSite from "@/components/monitoring/KPIsSite.vue"

export default {
    components: {
        KPIsSite
    }
}
</script>