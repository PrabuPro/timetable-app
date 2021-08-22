<template>
  <div class="category-table-section" style="width: 80%">
    <v-data-table
      :headers="headers"
      :items="teachers"
      :items-per-page="10"
      class="elevation-1 mt-5"
      :loading="loading"
      loading-text="Loading... Please wait"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Teachers</v-toolbar-title>
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
                New Teacher
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Teacher Registry</span>
              </v-card-title>

              <form>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          label="Teacher Name"
                          v-model="$v.editedItem.Name.$model"
                          :error-messages="teacherNameValidation"
                          required
                          @input="$v.editedItem.Name.$touch()"
                          @blur="$v.editedItem.Name.$touch()"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          label="Teacher Address"
                          v-model="$v.editedItem.Address.$model"
                          :error-messages="teacherAddressValidation"
                          required
                          @input="$v.editedItem.Address.$touch()"
                          @blur="$v.editedItem.Address.$touch()"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          label="Years of Experience"
                          v-model="$v.editedItem.YearsOfExperience.$model"
                          :error-messages="teacherYearsOfExperience"
                          required
                          @input="$v.editedItem.YearsOfExperience.$touch()"
                          @blur="$v.editedItem.YearsOfExperience.$touch()"
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
    await this.$store.dispatch('getItems', this.getMainObject())
    this.loading = false
  },
  computed: {
    ...mapState(['teachers']),

    teacherNameValidation() {
      const errors = []
      if (!this.$v.editedItem.Name.$dirty) return errors
      !this.$v.editedItem.Name.required &&
        errors.push('Teacher Name is required.')
      return errors
    },
    teacherAddressValidation() {
      const errors = []
      if (!this.$v.editedItem.Address.$dirty) return errors
      !this.$v.editedItem.Address.required &&
        errors.push('Teacher Address is required.')
      return errors
    },
    teacherYearsOfExperience() {
      const errors = []
      if (!this.$v.editedItem.YearsOfExperience.$dirty) return errors
      !this.$v.editedItem.YearsOfExperience.required &&
        errors.push('Years of experience is required.')
      return errors
    },
  },
  data() {
    return {
      loading: true,
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: 'Name', align: 'center', value: 'Name' },
        { text: 'Address', align: 'center', value: 'Address' },
        {
          text: 'Years of experience',
          align: 'center',
          value: 'YearsOfExperience',
        },
        { text: 'Actions', value: 'actions', align: 'center', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        TeacherId: '',
        Name: '',
        Address: '',
        YearsOfExperience: '',
      },
      defaultItem: {
        TeacherId: '',
        Name: '',
        Address: '',
        YearsOfExperience: '',
      },
    }
  },
  validations: {
    editedItem: {
      Name: { required },
      Address: { required },
      YearsOfExperience: { required },
    },
  },

  methods: {
    newJob() {},
    editItem(item) {
      console.log('edit item', item)
      this.editedIndex = this.teachers.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.teachers.indexOf(item)
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
          Name: this.editedItem.Name,
          Address: this.editedItem.Address,
          YearsOfExperience: this.editedItem.YearsOfExperience,
        },
        id: this.editedItem.TeacherId,
        editIndex: this.editedIndex,
        urlPath: '/api/Teachers/',
        resetItem: 'resetTeachers',
        setItem: 'setTeachers',
        addNewItem: 'addNewTeacher',
        updateItem: 'updateTeacher',
        deleteItem: 'deleteTeacher',
        messeges: {
          addItem: 'teacher Added',
          updateItem: 'teacher Updated',
          deleteItem: 'teacher Deleted',
        },
      }
    },
    save() {
      console.log('save')
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
