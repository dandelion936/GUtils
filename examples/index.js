var vm = new Vue({
  el: '#app',
  data: {

  },
  methods: {
    getIp () {
      Gutils.Device.getIP().then((value) => {
        console.log(value[0])
      })
    }
  }
})
