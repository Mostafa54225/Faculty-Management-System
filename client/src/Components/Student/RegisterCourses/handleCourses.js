// data is the whole courses from api

const handleCourses = (data, level, semesterType, passedCourses, failedCourses) => {
  if(level === 1) return handleCoursesLevel1(data, semesterType, passedCourses)

  else if (level === 2) return handleCoursesLevel2(data, semesterType, passedCourses, failedCourses)
}




const handleCoursesLevel1 = (data, semesterType, passedCourses) => {
  
  if(parseInt(semesterType) === 1) return data.filter(data => data.level === 1 && data.term === semesterType)
  else if(parseInt(semesterType) === 2) {
    let courses = data.filter(data => data.level === 1 && data.term === 2)
    

    // Check Prerequisite for the current courses
    checkPrerequisite(courses, passedCourses)
    
    return courses
  }
}

const handleCoursesLevel2 = (data, semesterType, passedCourses, failedCourses) => {

  // failedCourses paramter is just a code for the courses the student fail
  // failedCoursesByTerm is an object that contains all the information (from api) about the course.
  // coursesLevel2 is an object that contains all courses can student register (with constraints prerequisite)

  let coursesLevel2 = []
  let failedCoursesByTerm = []

  // Compulsory Courses the student didn't take in his last level.
  let compulsoryCoursesPastLevels = []
  
  coursesLevel2 = data.filter(data => data.level === 2 && data.term === semesterType)
  
  
  // Check for  Compulsory Courses that the student didn't take in his last level.
  compulsoryCoursesPastLevels = checkNoChosenCourses(data, semesterType, passedCourses)

  // Failed Courses in the same term
  failedCoursesByTerm = checkFailedCourses(data, failedCourses, semesterType)

  // Check Prerequisite for the current courses
  // checkPrerequisite(coursesLevel2, passedCourses)

  

  console.log(coursesLevel2)
  console.log(failedCoursesByTerm)

  let openedCourses = [...coursesLevel2, ...failedCoursesByTerm, ...compulsoryCoursesPastLevels]
  checkPrerequisite(openedCourses, passedCourses)

  // Make the array unique (Remove Duplicates)
  openedCourses = openedCourses.filter((item, index) => openedCourses.indexOf(item) === index)
  return openedCourses
}












const checkNoChosenCourses = (data, semesterType, passedCourses) => {
  let compulsoryCoursesPastLevels = []
  let compulsoryCourses = data.filter(data => data.level === 1 && data.term === semesterType)
  console.log(compulsoryCourses)
  
  for(let i = 0; i < compulsoryCourses.length; i++) {
    if(passedCourses.indexOf(compulsoryCourses[i].code) === -1) {
      compulsoryCoursesPastLevels.push(compulsoryCourses[i])
    }
  }

  console.log(compulsoryCoursesPastLevels)
  return compulsoryCoursesPastLevels
}


const checkFailedCourses = (courses, failedCourses, semesterType) => {
  let fCourses = []
  let failedCoursesTerm = []
  for(let i = 0; i < failedCourses.length; i++) {
    fCourses.push(courses.find(data => data.code === failedCourses[i]))
    if(fCourses[i].term === semesterType) {
      failedCoursesTerm.push(fCourses[i])
    }
  }
  return failedCoursesTerm
}


const checkPrerequisite = (courses, passedCourses) => {
  
  for(let i = 0; i < courses.length; i++) {
    if(courses[i].prerequisite.length !== 0) {
      for(let j = 0; j < courses[i].prerequisite.length; j++) {
        if(!passedCourses.includes(courses[i].prerequisite[j])) {
          courses.splice(i, 1)
          i--
          break
        }
      }
    }
  }
  return courses
}


export {handleCourses}