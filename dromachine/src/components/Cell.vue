<script>
export default {
    props: {
        nbrOfSound: {
            type: Number,
            default: 2,
        },
        subdivisions: {
            type: Number,
            default: 3,
        },
        value: {
            type: [Number, String],
            default: 0,
        },
        size: {
            type: Number,
            default: 100,
        },
        colors: {
            type: Array,
            default: () => [
                'transparent',
                'yellow',
                'red',
                'blue',
            ]
        }
    },
    data() {
        return {
            numberOfPoints: 4,
            width: this.size, // Width of the SVG canvas
            height: this.size, // Height of the SVG canvas
            centerX: this.size / 2, // X-coordinate of the center of the circle
            centerY: this.size / 2, // Y-coordinate of the center of the circle
            radius: this.size / 4, // Radius of the circle
            points: [],
            lines: [],
        }
    },

    computed: {
        textX() {
            return this.width / 2 - 5
        },
        matrix() {
            const convertedNumber = this.value.toString(this.nbrOfSound)
            return convertedNumber.padStart(this.subdivisions, '0').split('')
        }
    },

    watch: {
        value: {
            handler() {
                this.calculatePoints()
            }
        }
    },

    mounted() {
        this.calculatePoints()
    },

    methods: {
        calculatePoints() {
            this.points = []
            const angle = (2 * Math.PI) / this.subdivisions // Divide the circle into 3 equal parts
            for (let id = 0; id < this.subdivisions; id++) {
                const position = this.subdivisions - id - 1
                if (this.matrix[position] !== '0') {
                    const x = this.centerX + this.radius * Math.cos(id * angle)
                    const y = this.centerY + this.radius * Math.sin(id * angle)
                    this.points.push({
                        id,
                        x,
                        y,
                        fill: this.colors[this.matrix[position]]
                    })
                }
            }
        }
    }
}
</script>

<template>
    <div class="bg-gray-900">
        <div class="text-white">
            <div class="m-2 hidden">Nombre de son: {{ nbrOfSound }}</div>
            <div class="m-2 hidden">Subdivision: {{ subdivisions }}</div>
            <!--            <div class="m-2 text-center">{{ matrix }}</div>-->
            <!--            <div class="m-2 text-center">{{ value }}</div>-->
        </div>
        <div class="text-center">
            <svg :width="width" :height="height">
                <circle :cx="centerX" :cy="centerY" :r="radius" stroke="white" fill="transparent"/>
                <!--                <line v-for="point in points" :key="point.id" v-if="points.length > 1" :x1="point.x" :y1="point.y"-->
                <!--                      :x2="points[point.id].x" :y2="points[point.id].y" stroke="white"></line>-->
                <circle v-for="point in points" :key="point.id" :cx="point.x" :cy="point.y" :r="size / 15"
                        :fill="point.fill"/>

            </svg>
        </div>
    </div>
</template>
