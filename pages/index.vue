<template>
<div>
    <v-card
    class="spacing-playground pa-5"
      elevation="5"
    >
      <div class="d-flex flex-column justify-content-center align-items-center">
        <div class="d-flex">
          <v-col
            cols="12"
            sm="6"
            md="4"
          >
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="dates"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="dateRangeText"
                  label="Date Range"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="dates"
                no-title
                scrollable
                range
              >
              <v-spacer></v-spacer>
              <v-btn
                text
                color="primary"
                @click="menu = false"
              >
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menu.save(dates)"
              >
                OK
              </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="4"
          >
          <v-text-field
            v-model="search"
            label="Search"
          ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="4"
            class="d-flex justify-end align-center"
          >
          <v-btn class="mr-4" @click="clear"> Clear </v-btn>
           <v-btn
              depressed
              @click="searchGrid"
              color="primary"
            >
              Search
            </v-btn>
          </v-col>
        </div>
      </div>
    </v-card>
  
    <JobGrid :upcomming="true" :startDate="dates[0]" :endDate="dates[1]" :upcommingSearch="search"  />
  </div>
</template>
<script>

import { mapState } from 'vuex';



export default {
  middleware: 'authenticated',
  // Watch for $route.query.page to call Component methods (asyncData, fetch, validate, layout, etc.)
  watchQuery: ['page'],
  // Key for <NuxtChild> (transitions)
  key: to => to.fullPath,
  // Called to know which transition to apply
  transition (to, from) {
    if (!from) { return 'slide-left' }
    return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
  },
  computed: {
      dateRangeText () {
        return this.dates.join(' ~ ')
      },

      dateRangeReturn(){
        return this.dates;
      }
  },

  data () {
      return {
        menu: false,
        dates: [new Date().toISOString().substr(0, 10)],
        date: "",
        timer: '',
        search: '',
      }
    },
  components: {
  },
  methods: {
    searchGrid(){},
    clear(){
      this.search = '',
      this.dates = []
    }

  }
}
</script>
