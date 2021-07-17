<template>
  <div class="category-table-section" style="width: 80%">
    <v-data-table
      :headers="headers"
      :items="students"
      :items-per-page="10"
      class="elevation-1 mt-5"
      :loading="loading"
      loading-text="Loading... Please wait"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Students</v-toolbar-title>
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
                New Student
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Technician Registry</span>
              </v-card-title>

              <form>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          label="Student Name"
                          v-model="$v.editedItem.name.$model"
                          :error-messages="studentNameValidation"
                          required
                          @input="$v.editedItem.name.$touch()"
                          @blur="$v.editedItem.name.$touch()"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          label="Student Sur Name"
                          v-model="$v.editedItem.surName.$model"
                          :error-messages="studentSurNameValidation"
                          required
                          @input="$v.editedItem.surName.$touch()"
                          @blur="$v.editedItem.surName.$touch()"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          label="DOB"
                          v-model="$v.editedItem.dateOfBirth.$model"
                          :error-messages="studentdateOfBirthValidation"
                          required
                          @input="$v.editedItem.dateOfBirth.$touch()"
                          @blur="$v.editedItem.dateOfBirth.$touch()"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          label="Email"
                          v-model="$v.editedItem.email.$model"
                          :error-messages="studentemailValidation"
                          required
                          email
                          @input="$v.editedItem.email.$touch()"
                          @blur="$v.editedItem.email.$touch()"
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
    await this.$store.dispatch('getStudents');
    this.loading = false;
  },
  computed: {
    ...mapState(['students' ]),

    studentNameValidation() {
      const errors = []
      if (!this.$v.editedItem.name.$dirty) return errors
      !this.$v.editedItem.name.required &&
        errors.push('Student name is required.')
      return errors
    },
    studentSurNameValidation() {
      const errors = []
      if (!this.$v.editedItem.surName.$dirty) return errors
      !this.$v.editedItem.surName.required && errors.push('Student Sur name is required.')
      return errors
    },
    studentdateOfBirthValidation() {
      const errors = []
      if (!this.$v.editedItem.dateOfBirth.$dirty) return errors
      !this.$v.editedItem.dateOfBirth.required && errors.push('DOB is required.')
      return errors
    },
    studentemailValidation() {
      const errors = []
      if (!this.$v.editedItem.email.$dirty) return errors
      !this.$v.editedItem.email.required && errors.push('Email is required.')
      return errors
    },
  },
  data() {
    return {
      loading:true,
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: 'Name', align: 'center', value: 'name' },
        { text: 'Sur Name', align: 'center', value: 'surName' },
        { text: 'DOB', align: 'center', value: 'dateOfBirth' },
        { text: 'email', align: 'center', value: 'email' },
        { text: 'Actions', value: 'actions', align: 'center', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        id: '',
        name: '',
        surName: '',
        dateOfBirth: '',
        email: '',
      },
      defaultItem: {
        id: '',
        name: '',
        surName: '',
        dateOfBirth: '',
        email: '',
      },
    }
  },
  validations: {
    editedItem: {
      name: { required },
      surName: { required },
      dateOfBirth: { required },
      email: { required },
    },
  },
 
  methods: {
    newJob() {},
    editItem(item) {
      console.log('edit item', item)
      this.editedIndex = this.students.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.students.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.$store.dispatch('deleteStudent', this.editedItem.id)
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

    getStudentObject() {
      return {
        editStudent: {
          name : this.editedItem.name,
          surName: this.editedItem.surName,
          dateOfBirth: this.editedItem.dateOfBirth,
          email: this.editedItem.email
        },
        studentId: this.editedItem.id,
        editIndex: this.editedIndex,
      }
    },
    save() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        if (this.editedIndex > -1) {
          this.$store.dispatch('updateStudent', this.getStudentObject())
        } else {
          this.$store.dispatch('saveStudent', this.editedItem)
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
