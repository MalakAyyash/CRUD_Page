var courseName = document.getElementById("courseName");
var courseCategory = document.getElementById("courseCategory");
var coursePrice = document.getElementById("coursePrice");
var courseDescription = document.getElementById("courseDescription");
var courseCapacity = document.getElementById("courseCapacity");
var addButton = document.getElementById("click");
var data = document.getElementById("data");
var search = document.getElementById("search");
var courses;
var isNameValid = false;
var isCategoryValid = false;
var isPriceValid = false;
var isDescriptionValid = false;
var isCapacityValid = false;

if (JSON.parse(localStorage.getItem("courses")) == null) {
  courses = [];
} else {
  courses = JSON.parse(localStorage.getItem("courses"));
}
displayData();

function checkInputs() {
  if (isNameValid && isCategoryValid && isPriceValid && isDescriptionValid && isCapacityValid) {
    addButton.removeAttribute("disabled");
    console.log("hi" + isNameValid);
  } else {
    addButton.setAttribute("disabled", "");
  }
}
var currentindex = 0;
var update = document.getElementById("update");
update.style.display = "none";
addButton.onclick = function (e) {
  e.preventDefault();
  addcourse();
  resetInput();
  displayData();
};

function addcourse() {
  var course = {
    courseName: courseName.value,
    courseCategory: courseCategory.value,
    coursePrice: coursePrice.value,
    courseDescription: courseDescription.value,
    courseCapacity: courseCapacity.value,
  };
  courses.push(course);
  localStorage.setItem("courses", JSON.stringify(courses));
  Swal.fire("Good job!", "added succesfully!", "success");
}
function resetInput() {
  courseName.value = "";
  courseCategory.value = "";
  coursePrice.value = "";
  courseDescription.value = "";
  courseCapacity.value = "";
}

//read data

function displayData() {
  var result = ``;
  for (var i = 0; i < courses.length; i++) {
    result += `
        <tr>
            <td>${i + 1}</td>
            <td>${courses[i].courseName}</td>
            <td>${courses[i].courseCategory}</td>
            <td>${courses[i].coursePrice}</td>
            <td>${courses[i].courseDescription}</td>
            <td>${courses[i].courseCapacity}</td>
            <td><button class="btn btn-info" onclick="getcourse(${i})">update</td>
            <td><button class="btn btn-danger" onclick="deleteCourse(${i})">delete</td>



        </tr>
        
        `;
  }
  data.innerHTML = result;
}

document.getElementById("deleteBtn").onclick = function () {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      courses = [];
      data.innerHTML = "";
      localStorage.setItem("courses", JSON.stringify(courses));

      Swal.fire("Deleted!", "Your file has been deleted.", "success");
    }
  });
};

function deleteCourse(index) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      courses.splice(index, 1);
      localStorage.setItem("courses", JSON.stringify(courses));

      displayData();
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
    }
  });
}
search.onkeyup = function () {
  var result = ``;

  for (var i = 0; i < courses.length; i++) {
    if (
      courses[i].courseName.tolowerCase().includes(search.value.tolowerCase())
    ) {
      result += `
        <tr>
            <td>${i + 1}</td>
            <td>${courses[i].courseName}</td>
            <td>${courses[i].courseCategory}</td>
            <td>${courses[i].coursePrice}</td>
            <td>${courses[i].courseDescription}</td>
            <td>${courses[i].courseCapacity}</td>
            <td><button class="btn btn-info" onclick="getcourse(${i})">update</td>
            <td><button class="btn btn-danger" onclick="deleteCourse(${i})">delete</td>



        </tr>
        
        `;
    }
    data.innerHTML = result;
  }
};
//update

function getcourse(index) {
  console.log(index);
  currentindex = index;
  var course = courses[index];
  console.log(course);
  courseName.value = course.courseName;
  courseCategory.value = course.courseCategory;
  coursePrice.value = course.coursePrice;
  courseDescription.value = course.courseDescription;
  courseCapacity.value = course.courseCapacity;
  update.style.display = "inline";
  addButton.style.display = "none";
}
update.onclick = function (e) {
  e.preventDefault();
  updateCourse();

  displayData();
  update.style.display = "none";
  addButton.style.display = "inline";
  resetInput();
};
function updateCourse() {
  var course = {
    courseName: courseName.value,
    courseCategory: courseCategory.value,
    coursePrice: coursePrice.value,
    courseDescription: courseDescription.value,
    courseCapacity: courseCapacity.value,
  };
  var prevName = courses[currentindex].courseName;
  courses[currentindex].courseName = course.courseName;
  courses[currentindex].courseCategory = course.courseCategory;
  courses[currentindex].coursePrice = course.coursePrice;
  courses[currentindex].courseDescription = course.courseDescription;
  courses[currentindex].courseCapacity = course.courseCapacity;
  localStorage.setItem("courses", JSON.stringify(courses));

  Swal.fire("Good job!", "updated succesfully!", "success");
}

// name strat with capital later
//ما يكون اقل من 3 حروف واكبر من عشر حروف
//no numbers
//regex>>>>>>> puttern /^[A-Z][a-z]{2,10}$/
courseName.onkeyup = function () {
  var pattern = /^[A-Z][a-z]{2,10}$/;
  if (pattern.test(courseName.value)) {
    isNameValid = true;
    if (courseName.classList.contains("is-invalid")) {
      this.classList.replace("is-invalid", "is-valid");
    }

    courseName.classList.add("is-valid");
  } else {
    if (courseName.classList.contains("is-valid")) {
      this.classList.replace("is-valid", "is-invalid");
    }
    isNameValid = false;
    courseName.classList.add("is-invalid");
  }
  console.log("hello" + isNameValid);
  checkInputs();
};
var courseName = document.getElementById("courseName");
var courseCategory = document.getElementById("courseCategory");
var coursePrice = document.getElementById("coursePrice");
var courseDescription = document.getElementById("courseDescription");
var courseCapacity = document.getElementById("courseCapacity");
var addButton = document.getElementById("click");
var data = document.getElementById("data");
var search = document.getElementById("search");
var courses;
var isNameValid = false;
if (JSON.parse(localStorage.getItem("courses")) == null) {
  courses = [];
} else {
  courses = JSON.parse(localStorage.getItem("courses"));
}
displayData();

function checkInputs() {
  if (isNameValid) {
    addButton.removeAttribute("disabled");
    console.log("hi" + isNameValid);
  } else {
    addButton.setAttribute("disabled", "");
  }
}
var currentindex = 0;
var update = document.getElementById("update");
update.style.display = "none";
addButton.onclick = function (e) {
  e.preventDefault();
  addcourse();
  resetInput();
  displayData();
};

function addcourse() {
  var course = {
    courseName: courseName.value,
    courseCategory: courseCategory.value,
    coursePrice: coursePrice.value,
    courseDescription: courseDescription.value,
    courseCapacity: courseCapacity.value,
  };
  courses.push(course);
  localStorage.setItem("courses", JSON.stringify(courses));
  Swal.fire("Good job!", "added succesfully!", "success");
}
function resetInput() {
  courseName.value = "";
  courseCategory.value = "";
  coursePrice.value = "";
  courseDescription.value = "";
  courseCapacity.value = "";
}

//read data

function displayData() {
  var result = ``;
  for (var i = 0; i < courses.length; i++) {
    result += `
        <tr>
            <td>${i + 1}</td>
            <td>${courses[i].courseName}</td>
            <td>${courses[i].courseCategory}</td>
            <td>${courses[i].coursePrice}</td>
            <td>${courses[i].courseDescription}</td>
            <td>${courses[i].courseCapacity}</td>
            <td><button class="btn btn-info" onclick="getcourse(${i})">update</td>
            <td><button class="btn btn-danger" onclick="deleteCourse(${i})">delete</td>



        </tr>
        
        `;
  }
  data.innerHTML = result;
}

document.getElementById("deleteBtn").onclick = function () {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      courses = [];
      data.innerHTML = "";
      localStorage.setItem("courses", JSON.stringify(courses));

      Swal.fire("Deleted!", "Your file has been deleted.", "success");
    }
  });
};

function deleteCourse(index) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      courses.splice(index, 1);
      localStorage.setItem("courses", JSON.stringify(courses));

      displayData();
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
    }
  });
}
search.onkeyup = function () {
  var result = ``;

  for (var i = 0; i < courses.length; i++) {
    if (
      courses[i].courseName.tolowerCase().includes(search.value.tolowerCase())
    ) {
      result += `
        <tr>
            <td>${i + 1}</td>
            <td>${courses[i].courseName}</td>
            <td>${courses[i].courseCategory}</td>
            <td>${courses[i].coursePrice}</td>
            <td>${courses[i].courseDescription}</td>
            <td>${courses[i].courseCapacity}</td>
            <td><button class="btn btn-info" onclick="getcourse(${i})">update</td>
            <td><button class="btn btn-danger" onclick="deleteCourse(${i})">delete</td>



        </tr>
        
        `;
    }
    data.innerHTML = result;
  }
};
//update

function getcourse(index) {
  console.log(index);
  currentindex = index;
  var course = courses[index];
  console.log(course);
  courseName.value = course.courseName;
  courseCategory.value = course.courseCategory;
  coursePrice.value = course.coursePrice;
  courseDescription.value = course.courseDescription;
  courseCapacity.value = course.courseCapacity;
  update.style.display = "inline";
  addButton.style.display = "none";
}
update.onclick = function (e) {
  e.preventDefault();
  updateCourse();

  displayData();
  update.style.display = "none";
  addButton.style.display = "inline";
  resetInput();
};
function updateCourse() {
  var course = {
    courseName: courseName.value,
    courseCategory: courseCategory.value,
    coursePrice: coursePrice.value,
    courseDescription: courseDescription.value,
    courseCapacity: courseCapacity.value,
  };
  var prevName = courses[currentindex].courseName;
  courses[currentindex].courseName = course.courseName;
  courses[currentindex].courseCategory = course.courseCategory;
  courses[currentindex].coursePrice = course.coursePrice;
  courses[currentindex].courseDescription = course.courseDescription;
  courses[currentindex].courseCapacity = course.courseCapacity;
  localStorage.setItem("courses", JSON.stringify(courses));

  Swal.fire("Good job!", "updated succesfully!", "success");
}

// name strat with capital later
//ما يكون اقل من 3 حروف واكبر من عشر حروف
//no numbers
//regex>>>>>>> puttern /^[A-Z][a-z]{2,10}$/
document.getElementById('nameAlert').style.display='none'
courseName.onkeyup = function () {
  var pattern = /^[A-Z][a-z]{2,10}$/;
  if (pattern.test(courseName.value)) {
    isNameValid = true;
    document.getElementById('nameAlert').style.display='none'

    if (courseName.classList.contains("is-invalid")) {
      this.classList.replace("is-invalid", "is-valid");
    }

    courseName.classList.add("is-valid");
  } else {
    document.getElementById('nameAlert').style.display='block'

    if (courseName.classList.contains("is-valid")) {
      this.classList.replace("is-valid", "is-invalid");
    }
    isNameValid = false;
    courseName.classList.add("is-invalid");
  }
  console.log("hello" + isNameValid);
  checkInputs();
};


// category strat with capital later
//ما يكون اقل من 3 حروف واكبر من عشرين حروف
//no numbers
//regex>>>>>>> puttern /^[A-Z][a-z]{2,20}$/
courseCategory.onkeyup = function () {
  var pattern = /^[A-Z][a-z]{2,20}$/;
  if (pattern.test(courseCategory.value)) {
    isCategoryValid = true;
    if (courseCategory.classList.contains("is-invalid")) {
      this.classList.replace("is-invalid", "is-valid");
    }

    courseCategory.classList.add("is-valid");
  } else {
    if (courseCategory.classList.contains("is-valid")) {
      this.classList.replace("is-valid", "is-invalid");
    }
    isCategoryValid = false;
    courseCategory.classList.add("is-invalid");
  }
  console.log("hello" + isCategoryValid);
  checkInputs();
};

// price 
//[3-4]
//just numbers
//regex>>>>>>> puttern /^[0-9]{3,4}$/
coursePrice.onkeyup = function () {
  var pattern = /^[0-9]{3,4}$/;
  if (pattern.test(coursePrice.value) && coursePrice.value>=100) {
    isPriceValid = true;
    if (coursePrice.classList.contains("is-invalid")) {
      this.classList.replace("is-invalid", "is-valid");
    }

    coursePrice.classList.add("is-valid");
  } else {
    if (coursePrice.classList.contains("is-valid")) {
      this.classList.replace("is-valid", "is-invalid");
    }
    isPriceValid = false;
    coursePrice.classList.add("is-invalid");
  }
  console.log("hello" + isPriceValid);
  checkInputs();
};

// description
//ما يكون اقل من 3 حروف واكبر من ميه عشرين حروف
// numbers optional
//regex>>>>>>> puttern /^[A-Z][A-Za-z0-9\s]{2,120}$/
courseDescription.onkeyup = function () {
  var pattern = /^[A-Z][A-Za-z0-9\s]{2,120}$/;
  if (pattern.test(courseDescription.value)) {
    isDescriptionValid = true;
    if (courseDescription.classList.contains("is-invalid")) {
      this.classList.replace("is-invalid", "is-valid");
    }

    courseDescription.classList.add("is-valid");
  } else {
    if (courseDescription.classList.contains("is-valid")) {
      this.classList.replace("is-valid", "is-invalid");
    }
    isDescriptionValid = false;
    courseDescription.classList.add("is-invalid");
  }
  console.log("hello" +  isDescriptionValid);
  checkInputs();
};

// capacity
//2-3
//just numbers
//regex>>>>>>> puttern /^[0-9]{2,3}$/
courseCapacity.onkeyup = function () {
  var pattern = /^[0-9]{2,3}$/;
  if (pattern.test(courseCapacity.value)) {
    isCapacityValid = true;
    if (courseCapacity.classList.contains("is-invalid")) {
      this.classList.replace("is-invalid", "is-valid");
    }

    courseCapacity.classList.add("is-valid");
  } else {
    if (courseCapacity.classList.contains("is-valid")) {
      this.classList.replace("is-valid", "is-invalid");
    }
    isCapacityValid = false;
    courseCapacity.classList.add("is-invalid");
  }
  console.log("hello" +  isCapacityValid);
  checkInputs();
};
