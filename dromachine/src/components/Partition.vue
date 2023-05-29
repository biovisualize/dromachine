<script setup>
import {ref} from 'vue'
import Cell from './Cell.vue'

defineProps({
    msg: String,
})

const value = ref(0)
const nbrOfSound = ref(4);
const subdivision = 2

// setInterval(function () {
//     value.value += 1
//
//     if (value.value === (nbrOfSound ** subdivision)) {
//         value.value = 0
//     }
// }, 250);

</script>

<template>
    <div class="m-4">
        <input type="number" v-model="value" max="15" min="0"
               class="hidden shadow appearance-none border border-red-500 rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">

        <!--                <cell :nbrOfSound="nbrOfSound" :size="600" :subdivisions="subdivision" :value="value"></cell>-->

        <div>2 <sup>{{ 4 }}</sup></div>
        <div class="grid grid-cols-4 mb-4" style="width: 420px">
            <cell v-for="value in [...Array((2**4) ).keys()]" :nbrOfSound="4" :subdivisions="2" :value="value"
                  :key="value"></cell>
        </div>

        <div>3 <sup>{{ 3 }}</sup></div>
        <div class="grid grid-cols-9 mb-4">
            <cell v-for="value in [...Array((3**3) ).keys()]" :nbrOfSound="3" :subdivisions="3" :value="value"
                  :key="value"></cell>
        </div>

        <div>3 <sup>{{ 4 }}</sup></div>
        <div class="grid grid-cols-8">
            <cell v-for="value in [...Array((4**3) ).keys()]" :nbrOfSound="4" :subdivisions="3" :value="value"
                  :key="value"></cell>
        </div>

        <div v-for="partition in [...Array(7).keys()]" :key="'p'+ partition" class="mt-8">
            <div>2 <sup>{{ partition + 1 }}</sup></div>
            <div class="grid grid-cols-8">
                <cell v-for="value in [...Array(2** (partition + 1)).keys()]" :subdivisions="partition + 1"
                      :value="value" :key="value"></cell>
            </div>
        </div>
    </div>
</template>
