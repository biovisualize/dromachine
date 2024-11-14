<script setup>
import {computed, onMounted, ref} from "vue";
import {range} from 'lodash'
import Cell from '../components/Cell.vue'
import Partition from "../components/Partition.vue";
import * as Tone from 'tone'
//
// const value = ref(0)
// const nbrOfSound = ref(2);
// const subdivision = ref(4)
// const timer = ref(0)
// const speed = ref(1000)
// const isPlayMetronome = ref(false)
// const isPlaySound = ref(false)
//
// const startOrStop = () => {
//     if (timer.value === 0) {
//         timer.value = setInterval(() => {
//             value.value += 1
//
//             if (value.value >= nbrOfSound.value ** subdivision.value) {
//                 value.value = 0
//             }
//         }, speed.value);
//     } else {
//         clearInterval(timer.value)
//         timer.value = 0
//     }
// }
//
// const reset = () => {
//     value.value = 0
//     clearInterval(timer.value)
//     timer.value = 0
// }
//
// const randomNumbers = computed(() => {
//     const possibilities = nbrOfSound.value ** subdivision.value
//     return Array.from({length: nbrOfSound.value}, () => Math.floor(Math.random() * possibilities));
//     // return Math.floor(Math.random() * possibilities);
// })

Tone.Transport.bpm.value = 220;

const loop = new Tone.Loop((time) => {
    // triggered every eighth note.
    console.log(Tone.Transport);
}, "16n").start(0);

const toggleTone = () => {
    console.log(Tone.getTransport().bpm)
    if (Tone.getTransport().state === 'started') {
        Tone.getTransport().stop();
    } else {
        Tone.Transport.start();
        Tone.start()
    }
}

</script>

<template>
    <div class="m-auto">
        <button @click="toggleTone"
                class="ml-8 mt-8 text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Démarrer
        </button>

    </div>
</template>
