const SHEET_ID = '1KxRRn3TMj2tfU7A2oNvFu5ypc7Xx1-ZnaVyK1uwbxgA';

var app = new Vue({
  el: '#app',
  data () {
    return {
      riddles: null,
      categories: null,
      selectedCategories: null,
      componentKey: 0
    }
  },
  methods: {
    getData: function() {
      return drive(SHEET_ID).then(function(db) {
        return db
      }).catch(function(error) {
       this.error = error 
     });
    }
  },
  async created() {
    let allRiddles = await this.getData();
    this.riddles = allRiddles.filter(riddle => (riddle.status == 'published')).map(obj => ({ ...obj, seen: false, category: obj.category ? obj.category : 'ללא קטגוריה' }));
    this.categories = [...new Set(this.riddles.map(obj => (obj.category)))].map(obj => ({ title: obj, selected: true }));
    this.selectedCategories = this.categories.map(category => (category.title));
  },
  computed: {
    filteredRiddles() {
      if (!this.riddles) return
      self = this
      return this.riddles.filter(function(riddle) {
        return self.selectedCategories.includes(riddle.category)
      });
    }
  }
});