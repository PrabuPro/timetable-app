<template>
  <div class="category-table-section" style="width: 80%">
    <v-data-table
      :headers="headers"
      :items="places"
      :items-per-page="10"
      class="elevation-1 mt-5"
      :loading="loading"
      loading-text="Loading... Please wait"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Places</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
         
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
                @click="newJob()"
              >
                New Place
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Place Registry</span>
              </v-card-title>

              <form>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          label="Place"
                          v-model="$v.editedItem.name.$model"
                          :error-messages="placeNameValidation"
                          required
                          @input="$v.editedItem.name.$touch()"
                          @blur="$v.editedItem.name.$touch()"
                        ></v-text-field>
                      </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="6"
                    >

                        <v-checkbox
                        label="AC"
                        v-model="$v.editedItem.isAC.$model"
                        @input="$v.editedItem.isAC.$touch()"
                        @blur="$v.editedItem.isAC.$touch()"
                        ></v-checkbox>
                        
                    </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          label="Capacity"
                          v-model="$v.editedItem.capacity.$model"
                          :error-messages="capacityValidation"
                          required
                          @input="$v.editedItem.capacity.$touch()"
                          @blur="$v.editedItem.capacity.$touch()"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
                </v-card-actions>
              </form>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  middleware: 'authenticated',
  async created() {
    await this.$store.dispatch('getItems', this.getMainObject());
    this.loading = false;
  },
  computed: {
    ...mapState(['places' ]),

    placeNameValidation() {
      const errors = []
      if (!this.$v.editedItem.name.$dirty) return errors
      !this.$v.editedItem.name.required &&
        errors.push('Place name is required.')
      return errors
    },
    capacityValidation() {
      const errors = []
      if (!this.$v.editedItem.capacity.$dirty) return errors
      !this.$v.editedItem.capacity.required && errors.push('Capacity is required.')
      return errors
    }
  },
  data() {
    return {
      loading:true,
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: 'Name', align: 'center', value: 'name' },
        { text: 'AC', align: 'center', value: 'isAC' },
        { text: 'Capacity', align: 'center', value: 'capacity' },
        { text: 'Actions', value: 'actions', align: 'center', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        id: '',
        name: '',
        isAC: '',
        capacity: '',
      },
      defaultItem: {
        id: '',
        name: '',
        isAC: false,
        capacity: '',
      },
    }
  },
  validations: {
    editedItem: {
      name: { required },
      isAC: { required },
      capacity: { required },
    },
  },
 
  methods: {
    newJob() {},
    editItem(item) {
      console.log('edit item', item)
      this.editedIndex = this.places.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.places.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.$store.dispatch('deleteItem', this.getMainObject())
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    getMainObject() {
      return {
        object: {
          name : this.editedItem.name,
          isAC: this.editedItem.isAC,
          capacity: this.editedItem.capacity,
        },
        id: this.editedItem.id,
        editIndex: this.editedIndex,
        urlPath: "/api/Places/",
        resetItem: "resetPlaces", 
        setItem: "setPlaces",
        addNewItem: "addNewPlace",
        updateItem: "updatePlace",
        deleteItem: "deletePlace",
        messeges: {
          addItem: "place Added",
          updateItem: "place Updated",
          deleteItem: "place Deleted"
        }
      }
    },
    save() {
      console.log("save");
      this.$v.$touch()
      if (!this.$v.$invalid) {
        if (this.editedIndex > -1) {
          this.$store.dispatch('updateItem', this.getMainObject())
        } else {
          this.$store.dispatch('saveItem', this.getMainObject())
        }
        this.addMood = false
        this.close()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.category-table-section {
  width: 100%;
}
</style>
