<script>

export default {
    props: {
        isPlayMetronome: {
            type: Boolean,
            default: false,
        },
        isPlaySound: {
            type: Boolean,
            default: false,
        },

        speed: {
            type: Number,
            default: 1000,
        },
        nbrOfSound: {
            type: Number,
            default: 2,
        },
        subdivision: {
            type: Number,
            default: 3,
        },
        value: {
            type: [Number, String],
            default: 0,
        },
        audios: {
            type: Array,
        },
        metronomes: {
            type: Array,
        },
        size: {
            type: Number,
            default: 100,
        },
        displayValue: {
            type: Boolean,
            default: false,
        },
        displayInfos: {
            type: Boolean,
            default: true,
        },
        displayMatrix: {
            type: Boolean,
            default: true,
        },
        colors: {
            type: Array,
            default: () => [
                'transparent',
                'yellow',
                'red',
                'blue',
                'green',
            ]
        }
    },

    data() {
        return {
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
            return this.width / 2
        },
        textY() {
            return this.height / 2
        },
        matrix() {
            const convertedNumber = this.value.toString(this.nbrOfSound)
            return convertedNumber.padStart(this.subdivision, '0').split('')
        },
        fontSize() {
            return this.width / 10 + 'px'
        },
        possibilities() {
            return this.nbrOfSound ** this.subdivision
        },
        squares() {
            return this.matrix.reverse().map((note, index) => {
                const position = this.subdivision - index - 1
                const height = parseInt(this.size / 11.5)
                const width = parseInt(this.size / 11.5)
                const fullWidth = this.matrix.length * width
                const startingFrom = (this.width - fullWidth) / 2
                return {
                    index,
                    y: (this.height - width) ,
                    x: (index * width) + startingFrom,
                    fill: this.colors[this.matrix[position]],
                    height,
                    width,
                    fullWidth,
                    startingFrom,
                }
            })
        }
    },

    mounted: function() {
        this.calculatePoints()
    },

    watch: {
        value: {
            handler() {
                if (this.isPlayMetronome) {
                    this.playMetronome()
                }
                this.calculatePoints()
            }
        }
    },

    methods: {
        play(sound, index) {
            if (this.isPlaySound) {
                this.audios[sound - 1][index].play();
            }
        },
        playMetronome() {
            this.metronomes[this.value % 2].play();
        },
        playPartition() {
            this.matrix.map((note, index) => {
                const timeout = index * (this.speed / this.subdivision)
                setTimeout(() => {
                    if (note !== '0') {
                        this.play(note, index % this.subdivision)
                    }
                }, timeout);
            })
        },
        calculatePoints() {
            this.points = []
            const angle = (2 * Math.PI) / this.subdivision // Divide the circle into 3 equal parts

            for (let id = 0; id < this.subdivision; id++) {
                const position = this.subdivision - id - 1
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

            this.playPartition();
        }
    }

}
</script>

<template>
    <div class="bg-gray-900 p-8 m-8">
        <div class="text-white" v-if="displayInfos">
            <div class="m-2 text-center mb-4">Nbr de sons: {{ nbrOfSound }}</div>
            <div class="m-2 text-center mb-4">Subdivision: {{ subdivision }}</div>
            <div class="m-2 text-center mb-8">Nbr de possibilités: {{ possibilities }}</div>
            <div class="m-2 text-center mb-8">Vitesse: {{ speed }}</div>
            <div class="m-2 hidden">Nombre de son: {{ nbrOfSound }}</div>
            <div class="m-2 hidden">Subdivision: {{ subdivision }}</div>
        </div>
        <div class="text-white">
            <svg :width="width" :height="height" class="rounded-lg">
                <text fill="white" v-if="displayValue" :x="textX" :y="textY" :font-size="fontSize"
                      dominant-baseline="middle"
                      text-anchor="middle"
                      font-family="monospace">
                    {{ value }}
                </text>
                <circle :cx="centerX" :cy="centerY" :r="radius" stroke="white" fill="transparent"/>
                <circle v-for="point in points" :key="point.id" :cx="point.x" :cy="point.y" :r="size / 15"
                        :fill="point.fill"/>

                <rect  v-for="square in squares" stroke="#555" :key="square.index" :x="square.x" :y="square.y"
                      :height="size / 15" :width="size / 15"
                      :fill="square.fill"/>
            </svg>
        </div>
        <div v-if="displayMatrix" class="m-2 text-center text-white" style="font-family: monospace; font-size: 18px;">
            {{ matrix.reverse().join(' ') }}
        </div>
    </div>
</template>
