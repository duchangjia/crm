import { STUDENT_INFO} from '@/store/mutations';
export default {
  state:{
      studentInfo:'',//学员信息
    },
  mutations:{
      [STUDENT_INFO]: (state, studentInfo) => {
        state.studentInfo = studentInfo
      },
    }
}
