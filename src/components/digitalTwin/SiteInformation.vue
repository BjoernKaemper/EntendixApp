<template>
    <div>
        <v-card 
            style="border-radius: 20px; background-color: whitesmoke"
            variant="outlined" class="anlagen-card">
            <v-card-title>Information Liegenschaft</v-card-title>
            <v-card-text>
                <v-container :style="{ width: '100%' }">
                    <v-table style="background-color: whitesmoke;">
                    <thead>
                        <tr>
                        <th class="text-left" id="title">
                            Name
                        </th>
                        <th class="text-left" id="title">
                            Wert
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                        v-for="key, value in siteInformation"
                        :key="key"
                        >
                        <td class="text-left">{{ value }}</td>
                        <td class="text-left">{{ key }}</td>
                        </tr>
                    </tbody>
                    </v-table>
                </v-container>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
export default {
    props: {
        site: Array
    },

    computed: {
        siteInformation () {
        const siteInformation = {}

        for (let element in this.site) {
            if (element === 'country') {
            siteInformation['Land'] = this.site[element]
            } else if (element === 'city') {
            siteInformation['Stadt'] =  this.site[element]
            } else if (element === 'zipcode') {
            siteInformation['PLZ'] = this.site[element]
            } else if (element === 'street') {
            siteInformation['Straße'] = this.site[element]
            } 
        }
        const desiredOrder = ['Land', 'Stadt', 'PLZ', 'Straße']
        const sortedSiteInformation = Object.fromEntries(
            Object.entries(siteInformation)
            .sort(([keyA], [keyB]) => desiredOrder.indexOf(keyA) - desiredOrder.indexOf(keyB))
        );

        //console.log(siteInformation)
        return sortedSiteInformation
        }
    }
}
</script>

<style scoped>
#title {
    font-weight: bold;
}
</style>