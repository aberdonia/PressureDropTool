import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const pipeline = [
  {
    "description": "3/8\" topsides tubing",
    "horizontal_change": 110,
    "vertical_change": 0,
    "inner_diamter": 5.17,
    "roughness": 0.015,
    "cores": 1
  },
  {
    "description": "Umbilical Riser",
    "horizontal_change": 817,
    "vertical_change": 600,
    "inner_diamter": 19.1,
    "roughness": 0.002,
    "cores": 1
  },
  {
    "description": "SDU Piping",
    "horizontal_change": 7,
    "vertical_change": 0,
    "inner_diamter": 11.6,
    "roughness": 0.015,
    "cores": 1
  },
  {
    "description": "SDU Piping",
    "horizontal_change": 31,
    "vertical_change": 0,
    "inner_diamter": 14.23,
    "roughness": 0.015,
    "cores": 1
  },
  {
    "description": "From SDU to FPSO towhead",
    "horizontal_change": 240,
    "vertical_change": 235,
    "inner_diamter": 19.1,
    "roughness": 0.002,
    "cores": 1
  },
  {
    "description": "FPSO towhead piping",
    "horizontal_change": 20,
    "vertical_change": 0,
    "inner_diamter": 14.23,
    "roughness": 0.015,
    "cores": 1
  },
  {
    "description": "Bundle",
    "horizontal_change": 2000,
    "vertical_change": 100,
    "inner_diamter": 19.1,
    "roughness": 0.015,
    "cores": 1
  },
  {
    "description": "Template towhead piping",
    "horizontal_change": 2000,
    "vertical_change": -100,
    "inner_diamter": 14.23,
    "roughness": 0.015,
    "cores": 1
  },
  {
    "description": "Template towhead to manifold",
    "horizontal_change": 200,
    "vertical_change": 100,
    "inner_diamter": 19.1,
    "roughness": 0.002,
    "cores": 1
  },
  {
    "description": "Manifold Piping",
    "horizontal_change": 10,
    "vertical_change": 0,
    "inner_diamter": 11.66,
    "roughness": 0.015,
    "cores": 1
  },
  {
    "description": "Tree piping",
    "horizontal_change": 10,
    "vertical_change": 0,
    "inner_diamter": 6.23,
    "roughness": 0.015,
    "cores": 1
  },
  {
    "description": "Downhole tubing",
    "horizontal_change": 300,
    "vertical_change": 300,
    "inner_diamter": 6.23,
    "roughness": 0.015,
    "cores": 1
  }
];

// function replaceAll(str, find, replace) {
//   return str.replace(new RegExp(find, 'g'), replace);
// }

//This would be performed on the server in a real app. Just stubbing in.
// const generateId = (course) => {
//   return replaceAll(course.title, ' ', '-');
// };

class PipeApi {
  static getAllPipes() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], pipeline));
      }, delay);
    });
  }

  static savePipe(pipe) {
    pipe = Object.assign({}, pipe); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minPipeTitleLength = 3;
        if (pipe.description.length < minCourseTitleLength) {
          reject(`Description must be at least ${minCourseTitleLength} characters.`);
        }

        // if (pipe.id) {
        //   const existingCourseIndex = courses.findIndex(a => a.id == course.id);
        //   courses.splice(existingCourseIndex, 1, course);
        // }
        // else {
        //   //Just simulating creation here.
        //   //The server would generate ids and watchHref's for new courses in a real app.
        //   //Cloning so copy returned is passed by value rather than by reference.
        //   course.id = generateId(course);
        //   course.watchHref = `http://www.pluralsight.com/courses/${course.id}`;
        //   courses.push(course);
        // }

        resolve(pipe);
      }, delay);
    });
  }

  static deleteCourse(courseId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfCourseToDelete = courses.findIndex(course => {
          course.id == courseId;
        });
        courses.splice(indexOfCourseToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default PipeApi;
