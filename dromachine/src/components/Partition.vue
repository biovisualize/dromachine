<script setup>
import {computed, ref} from 'vue'

const props = defineProps({
    values: {
        type: Array,
        required: true
    },
    nbrOfSound: {
        type: Number,
        default: 2,
    },
    subdivision: {
        type: Number,
        default: 4,
    },
    cellSize: {
        type: Number,
        default: 40,
    },
    actualValue: {
        type: Number,
        required: true,
    },
    colors: {
        type: Array,
        default: () => [
            'black',
            'yellow',
            'red',
            'blue',
            'green',
        ]
    }
})

const cells = computed(() => {
    return props.values.map((value) => {
        return value
    })
})

const matrix = computed(() => {
    return cells.value.map((value) => {
        const convertedNumber = value.toString(props.nbrOfSound)
        return convertedNumber.padStart(props.subdivision, '0').split('')
    })
})
</script>

<template>
    <div class="mt-4">
<!--        <span class="text-gray-50">-->
<!--            [{{ nbrOfSound }}]-->
<!--        </span>-->
        <svg :width="cellSize * subdivision + (cellSize * 2)" :height="cellSize * (nbrOfSound ** subdivision)">
            <circle :cx="cellSize" :cy="(cellSize * actualValue) + (cellSize / 2)" :r="cellSize / 3" fill="white"/>
            <g v-for="(row, index) in matrix" :key="index">
                <rect v-for="(cell, index2) in row" :key="index + '-' + index2"
                      :width="cellSize"
                      :height="cellSize"
                      stroke="#eee"
                      :x="cellSize * index2 + (cellSize * 2)"
                      :y="cellSize * index"
                      :fill="this.colors[cell]"
                />
            </g>
        </svg>
    </div>
</template>
