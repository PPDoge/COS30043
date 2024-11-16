const { createApp } = Vue;
const NameTest = {
  template: `
  <div class="container">
    <h1>String Test</h1>
    <div class="form-group">
     <label for="nameInput">Please enter your name:</label>
        <input
          class="form-control"
          v-model="Name"
          type="text"
          placeholder="Name..."
          required
        />
     <p v-if="Name.toUpperCase() == 'NGUYEN DUY ANH TU'">Awesome name!</p>
     <p v-else-if="Name == ''"></p>
     <p v-else>{{Name}} is not my name!</p>
    </div>
    </div>
      `,
  data() {
    return { Name: "" };
  },
};
const PostManagement = {
  template: `  
  <div class="container">
  <h1>Status</h1>
  <div class="form-group">
    <label for="strStatus" class="form-check-label"></label>
    <app-mypost></app-mypost>
  <div>
    <p>
      <b>Status:</b>&nbsp;<input v-model="strStatus" />&nbsp;
      <button v-on:click="add(strStatus)">Post</button>
    </p>
    <p v-for="(status, index) in statPosts" :key="index">
      {{ status }}
      <button v-on:click="remove(index)">Del</button>
    </p>
  </div>
`,
  data() {
    return {
      statPosts: [],
      strStatus: "",
    };
  },
  methods: {
    add: function (status) {

      this.statPosts.push(status);

      this.strStatus = "";
    },
    remove: function (index) {

      this.statPosts.splice(index, 1);
    },
  },
};
const StudentMarks = {
  template: `
  <div class="container">
     <div class="row">
        <div class="col-12">
          <h2>Student Marks</h2>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Mark</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="student in paginatedData" :key="student.name">
                <td>{{ student.name }}</td>
                <td>{{ student.mark }}</td>
              </tr>
            </tbody>
          </table>
          <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item" v-if="currentPage > 1">
                    <a class="page-link" href="#" aria-label="Previous" @click.prevent="Callback(currentPage - 1)">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li class="page-item" v-for="number in pageCount" :class="{ active: number === currentPage }" :key="number">
                    <a class="page-link" href="#" @click.prevent="Callback(number)">{{ number }}</a>
                </li>
                <li class="page-item" :class="{ disabled: currentPage >= pageCount }">
                    <a class="page-link" href="#" aria-label="Next" @click.prevent="Callback(currentPage + 1)">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
          <p class="mt-3">Current Page: {{ currentPage }}</p>
        </div>
      </div>
    </div>
    `,
  data() {
    return {
      perPage: 3,
      currentPage: 1,
      students: [
        { name: "Amy", mark: 59 },
        { name: "Bill", mark: 60 },
        { name: "Casey", mark: 53 },
        { name: "David", mark: 86 },
        { name: "Eva", mark: 92 },
        { name: "Frank", mark: 58 },
        { name: "Grace", mark: 94 },
        { name: "Henry", mark: 71 },
        { name: "Isabel", mark: 99 },
        { name: "John", mark: 70 },
        { name: "Kathy", mark: 86 },
        { name: "Liam", mark: 51 },
        { name: "Monica", mark: 70 },
        { name: "Nathan", mark: 77 },
        { name: "Olivia", mark: 79 },
        { name: "Peter", mark: 58 },
        { name: "Quincy", mark: 53 },
        { name: "Rachel", mark: 76 },
        { name: "Sam", mark: 55 },
        { name: "Tina", mark: 81 },
        { name: "Ursula", mark: 78 },
        { name: "Victor", mark: 57 },
        { name: "Wendy", mark: 99 },
        { name: "Xavier", mark: 78 },
        { name: "Yasmin", mark: 66 },
        { name: "Zack", mark: 60 },
      ],
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.students.length / this.perPage);
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.students.slice(start, end);
    },
  },
  methods: {
    Callback(pageNum) {
      this.currentPage = pageNum;
    },
  },
};
const routes = [
  { path: "/", component: NameTest },
  { path: "/post-management", component: PostManagement },
  { path: "/student-marks", component: StudentMarks },
];
const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});
const app = Vue.createApp({});
app.component("navbar", {
  template: `<div class="container">
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/">Name Test </router-link> |
        </li>
        <li class="nav-item">
          <router-link to="/post-management">Post Management</router-link>
          |
        </li>
        <li class="nav-item">
          <router-link to="/student-marks">Home</router-link>
        </li>
      </ul>
    </div>
  </nav>
</div>`,
});
app.use(router);
app.mount("#app");
