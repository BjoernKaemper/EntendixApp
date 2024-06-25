<template>
    <div>
        <v-card 
            style="border-radius: 20px; background-color: whitesmoke"
            variant="outlined" class="anlagen-card">
            <v-card-title align="center">Liegenschaft - Performance</v-card-title>
            <v-divider class="border-opacity-75 mx-4 mb-2" :thickness="2" color="success"></v-divider>
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