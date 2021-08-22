<template>
  <v-row>
    <v-col>
      <v-btn
        color="primary"
        dark
        class="mb-2"
        v-if="auth.accessToken == 'Admin'"
        @click="generateTimetable()"
      >
        Generate Time Table
      </v-btn>
      <v-sheet height="800">
        <v-calendar
          ref="calendar"
          :now="today"
          :value="today"
          :events="events"
          color="primary"
          type="week"
        ></v-calendar>
      </v-sheet>
      <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
  export default {
    middleware: 'authenticated',

    computed: {
      ...mapState(['auth']),
    },
 
    data() {
      return {
          today: '2021-03-01',
          events: [],
          overlay: false
        }
      },
    mounted () {
      this.getTimetable();
    },
    methods: {
      async getTimetable(){
          await this.$axios.$get("/api/TimeTable/Get")
            .then(res => {
                const itemRes = res != null ? res : [];
                if(itemRes.length > 0){
                  itemRes.forEach(item => {
                    let tableItem = {
                      name: item.Place + " " + item.Course  + " " + item.Students ,
                      start: "2021-03-0"+ item.Day + " " +item.Start,
                      end: "2021-03-0"+ item.Day + " " + item.End,
                    }
                    this.events.push(tableItem);
                  })
                }
            })
        },
      async generateTimetable(){
          this.overlay = true;
          await this.$axios.$post("/api/TimeTable/UpdateTimeTable", {})
            .then(res => {
              this.events = [];
              this.getTimetable();
              this.overlay = false;
            })
        },
      

  
    },
  }
</script>