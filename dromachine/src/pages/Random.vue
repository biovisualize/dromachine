<script setup>
import {computed, ref} from "vue";
import {range} from 'lodash'
import Cell from '../components/Cell.vue'
import Partition from "../components/Partition.vue";
import * as Tone from 'tone'

const value = ref(0)
const nbrOfSound = ref(2);
const subdivision = ref(4)
const timer = ref(0)
const speed = ref(1000)
const isPlayMetronome = ref(false)
const isPlaySound = ref(false)

const startOrStop = () => {
    if (timer.value === 0) {
        timer.value = setInterval(() => {
            value.value += 1

            if (value.value >= nbrOfSound.value ** subdivision.value) {
                value.value = 0
            }
        }, speed.value);
    } else {
        clearInterval(timer.value)
        timer.value = 0
    }
}

const reset = () => {
    value.value = 0
    clearInterval(timer.value)
    timer.value = 0
}

const randomNumbers = computed(() => {
    const possibilities = nbrOfSound.value ** subdivision.value
    return Array.from({length: nbrOfSound.value}, () => Math.floor(Math.random() * possibilities));
    // return Math.floor(Math.random() * possibilities);
})

</script>

<template>
    <div class="m-auto">
<!--        <pre>{{ randomNumbers }}</pre>-->
        <div class="flex items-center">
            <label class="m-4">Vitesse</label>
            <input type="number" v-model="speed" step="100"
                   class="m-4 shadow appearance-none border border-gray-500 rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <div class="flex items-center">
            <label class="m-4">Nombre de son</label>
            <input type="number" v-model="nbrOfSound" max="15" min="0"
                   class="m-4 shadow appearance-none border border-gray-500 rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <div class="flex items-center">
            <label class="m-4">Subdivision</label>

            <input type="number" v-model="subdivision" max="15" min="0"
                   class="m-4 shadow appearance-none border border-gray-500 rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <button @click="startOrStop"
                class="ml-8 mt-8 text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {{ timer === 0 ? 'Démarrer' : 'Arrêter' }}
        </button>
        <button @click="reset"
                class="ml-8 mt-8 text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Réinitialiser
        </button>
        <div class="grid grid-cols-2 w-2/3 bg-gray-900">
            <div>
                <cell :speed="speed"
                      :isPlayMetronome="isPlayMetronome"
                      :isPlaySound="isPlaySound"
                      :display-value="true"
                      :nbrOfSound="nbrOfSound"
                      :subdivision="subdivision"
                      :size="500"
                      :value="value">
                </cell>
            </div>
            <Partition
                    :values="randomNumbers"
                    :nbrOfSound="nbrOfSound"
                    :cellSize="25"
                    :actualValue="value"
                    :subdivision="subdivision">
            </Partition>

        </div>
    </div>
</template>
