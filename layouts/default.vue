<template>
  <v-app dark>
    <!-- <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <div v-for="(item, i) in items">
          <v-list-item
            v-if="!item.subLinks"
            :key="i"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
           <v-list-group
            v-else
            :key="item.title"
            no-action
        >
            <template v-slot:activator>
               <v-list-tile>
                 <v-list-tile-content>
                   <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                 </v-list-tile-content>
               </v-list-tile>
             </template>

            <v-list-tile
                v-for="sublink in item.subLinks"
                :to="sublink.to"
                :key="sublink.title"
            >
                <v-list-tile-title v-text="sublink.title" />
            </v-list-tile>

           </v-list-group>

        </div>
      </v-list>
      
    </v-navigation-drawer> -->
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      >
      <!-- -->
      

      <v-list nav dense>
        <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Timetable
          </v-list-item-title>
          <v-list-item-subtitle>
            Generate your timetable
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
       <div v-for="(link, i) in items" :key="i">

        <v-list-item
            v-if="!link.subLinks"
            :to="link.to"
            class="v-list-item"
        >
            <v-list-item-icon>
                <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-title v-text="link.title" />
        </v-list-item>

        <v-list-group
            v-else
            :key="link.title"
            no-action
            :prepend-icon="link.icon"
            :value="false"
        >
            <template v-slot:activator>
              <v-list-item-title>{{ link.title }}</v-list-item-title>
             </template>

            <v-list-item
                v-for="sublink in link.subLinks"
                :to="sublink.to"
                :key="sublink.title"
            >
                <v-list-item-icon>
                  <v-icon>{{ sublink.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title>{{ sublink.title }}</v-list-item-title>

            </v-list-item>

        </v-list-group>

    </div>

      </v-list>

    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn @click="signOut">
        <v-icon >mdi-export</v-icon> 
        Logout
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined;
export default {
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: true,
      items: [
        {
          icon: 'mdi-book',
          title: 'Cources',
          to: '/cource',
        },
        {
          icon: 'mdi-face',
          title: 'Students',
          to: '/student',
        },
        {
          icon: 'mdi-account',
          title: 'Teachers',
          to: '/teacher',
        },
        {
          icon: 'mdi-home-city',
          title: 'Places',
          to: '/place',
        },
        {
          icon: 'mdi-timetable',
          title: 'Timetable',
          to: '/timetable',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,

    }
  },
  methods: {
    signOut(){
      this.$store.dispatch('logout');
      this.$router.push('/login');
    }
  }
}
</script>

