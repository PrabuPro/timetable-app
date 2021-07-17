const Cookie = process.client ? require('js-cookie') : undefined
const cookieparser = process.server ? require('cookieparser') : undefined;

const studentUrlPath = "/api/Students/";

export const state = () => {
  return {
    auth: null,
    students: [],
  }
}
export const mutations = {
  // auth mutations
  setAuth (state, auth) {
    state.auth = auth
  },
  unSetAuth(state, auth) {
    state.auth = null;
  },

  
  //Student Mutations
  resetStudents(state, studentList){
    state.students = studentList;
  },
  setStudents(state, studentList) {
    state.students.push(studentList);
  },
  addNewStudent(state, newStudent){
    state.students.push(newStudent)
  },
  updateStudent(state, editStudent){
    let editIndex = state.students.findIndex(item => item.id == editStudent.id)
    Object.assign(state.students[editIndex], editStudent)
  },
  deleteStudent(state, studentId){
    let editIndex = state.students.findIndex(item => item.id == studentId)
    state.students.splice(editIndex, 1)
  },

}
export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    let auth = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        auth = JSON.parse(parsed.auth)
      } catch (err) {
        // No valid cookie found
      }
    }
    commit('setAuth', auth)
  },

  async logout({state, commit}){
    Cookie.remove('auth');
    commit('unSetAuth', null);
    this.$toast.error('Loggin Out').goAway(1500);
  },
  async showError({state, commit}, error){
    const errorMessage = error.data.error != null ? (typeof error.data.error[0] == 'string' ? error.data.error[0] :'Something went wrong' ) : 'Something went wrong';
    this.$toast.error(errorMessage).goAway(1500);
  },
  async connectionError({state, commit}, error){
    this.$toast.error(error).goAway(1500);
  },

  //Students Actions
  async getStudents({state,commit}){
        await this.$axios.$get(studentUrlPath)
          .then(res => {
              console.log("students", res);
              const studentRes = res != null ? res : [];
              if(studentRes.length > 0){
                commit('resetStudents', []);
                studentRes.forEach(item => {
                  commit('setStudents', item);
                })
              }
          })
    },

  async saveStudent({commit}, newStudent){
  await this.$axios.$post(studentUrlPath, {
          ...newStudent
        })
        .then(res => {
            const studentRes = res != null ? res : [];
            if(studentRes != null){
              commit('addNewStudent', studentRes);
              this.$toast.success('student Added').goAway(1500); 
            }
        })
  },
  async updateStudent({commit}, editStudent,){
    const editStudentObject = editStudent.editStudent;
    await this.$axios.$put(studentUrlPath + editStudent.studentId, {
            ...editStudentObject
          })
          .then(res => {
              const studentRes = res != null ? res : [];
              if(studentRes != null){
                commit('updateStudent', studentRes);
                this.$toast.success('Student Updated').goAway(1500);
              }
          })
  },
  async deleteStudent({commit}, studentId){
    await this.$axios.$delete(studentUrlPath + studentId, {})
          .then(res => {
              const studentRes = res != null ? res : [];
              if(studentRes != null){
                commit('deleteStudent', studentId);
                this.$toast.success('student Deleted').goAway(1500);
              }
          })
  },


}
